from flask import Flask, request, jsonify
from schema import Schema, And, Use
from scipy.integrate import odeint
import math
import numpy as np
import os

app = Flask(__name__)

dragCoefficients = {
      'abs': 0.25,
      'aluminum': 1.4,
      'cardboard': 0.072,
      'wood': 0.4,
}

positiveFloat = And(Use(float), lambda n: n > 0)
validMaterial = And(Use(str), lambda s:
                    s in dragCoefficients.keys())

rocketSchema = Schema({
      'body': {
            'diameter': positiveFloat,
            'length': positiveFloat,
            'mass': positiveFloat,
            'material': validMaterial,
      }, 'fins': {
            'count': positiveFloat,
            'height': positiveFloat,
            'mass': positiveFloat,
            'material': validMaterial,
            'sweep': positiveFloat,
      }, 'motor' : {
            'burnTime': positiveFloat,
            'impulse': positiveFloat,
            'mass': positiveFloat,
      }, 'noseCone': {
            'length': positiveFloat,
            'mass': positiveFloat,
            'material': validMaterial,
      },
}, ignore_extra_keys=True)

def bodyDragCoefficient(body):
      return body.diameter * body.length * dragCoefficients[body.material]

def finsDragCoefficient(fins):
      return 2 * fins.count * fins.height**2 * math.sin(fins.sweep) * dragCoefficients[fins.material]

def noseConeDragCoefficient(radius, height, material):
      return math.pi * radius * math.sqrt(height**2 + r**2) * dragCoefficients[material]


def netDrag(rocket, velocity):
      airDensity = 1.225
      netDragCoeffecient = sum([
            bodyDragCoefficient(rocket['body']),
            finsDragCoeffecient(rocket['fins']),
            noseConeDragCoefficient(
                  rocket['body']['diameter'] / 2,
                  rocket['noseCone']['length'],
                  rocket['noseCone']['material'],
            )
      ])

      return airDensity * velocity**2 * netDragCoefficient / 2

def initalNetMass(rocket):
      return sum([rocket['body']['mass'],
                  rocket['fins']['mass'],
                  rocket['motor']['mass'],
                  rocket['noseCone']['mass']])

def netMass(rocket, time):
      return initalNetMass(rocket) - rocket['motor']['mass'] - time / rocket['motor']['burnTime']




@app.route('/', methods = ['POST'])
def rocket_sim():
      rocket = rocketSchema.validate(request.json)

      def burnModel(v, t):
            standardGravity = 9.81

            dvdt = rocket['motor']['impulse'] * standardGravity * \
                  math.log(initalNetMass(rocket) / netMass(rocket, t))

            return dvdt

      t = np.linspace(0, 20)
      v = odeint(burnModel, 0, t)

      t = t.tolist()
      v = v.tolist()

      return jsonify(list(zip(t, v)))


if __name__ == '__main__':
      app.run(debug=os.getenv("FLASK_DEBUG") or True)

