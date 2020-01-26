from flask import Flask, request, jsonify
from schema import Schema, And, Use
from scipy.integrate import odeint, cumtrapz
import math
import numpy as np
import os

app = Flask(__name__)

DRAG_COEFFICIENTS = {
      'abs': 0.25,
      'aluminum': 1.4,
      'cardboard': 0.072,
      'wood': 0.4,
}

STD_GRAVITY = 9.80665

AIR_DENSITY = 1.225


positiveInt = And(int, lambda n: n > 0)
positiveFloat = And(Use(float), lambda n: n > 0)
validMaterial = And(Use(str), lambda s:
                    s in DRAG_COEFFICIENTS.keys())

rocketSchema = Schema({
      'body': {
            'diameter': positiveFloat,
            'length': positiveFloat,
            'mass': positiveFloat,
            'material': validMaterial,
      }, 'fins': {
            'count': positiveInt,
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


@app.route('/', methods = ['POST'])
def rocket_sim():
      rocket = rocketSchema.validate(request.json)

      def model(t, v):
            return exaustVelocity(rocket) \
                  * math.log(initalNetMass(rocket) / finalNetMass(rocket)) \
                  - STD_GRAVITY - (AIR_DENSITY * v**2 * dragCoefficient(rocket))

      t = np.linspace(0, 100, num=100*100)
      v = odeint(model, 0, t).flatten()

      altitude = cumtrapz(v, x=t)
      altitude = [ a for a in altitude if a > 0 ]
      return jsonify(list(zip(t.tolist(), altitude)))


def exaustVelocity(rocket):
      return STD_GRAVITY * rocket['motor']['impulse']

def initalNetMass(rocket):
      return sum([rocket['body']['mass'],
                  rocket['fins']['mass'],
                  rocket['motor']['mass'],
                  rocket['noseCone']['mass']])

def finalNetMass(rocket):
      return initalNetMass(rocket) - rocket['motor']['mass']

def dragCoefficient(rocket):
      bodyDragCoefficient = rocket['body']['diameter'] * rocket['body']['length'] \
            * DRAG_COEFFICIENTS[rocket['body']['material']]

      finDragCoefficient = 2 * rocket['fins']['count'] * rocket['fins']['height']**2 \
            * math.sin(rocket['fins']['sweep']) * DRAG_COEFFICIENTS[rocket['fins']['material']]

      noseConeRadius = rocket['body']['diameter'] / 2
      noseDragCoefficient = math.pi * noseConeRadius \
            * math.sqrt(rocket['noseCone']['length']**2 + noseConeRadius**2) \
            * DRAG_COEFFICIENTS[rocket['noseCone']['material']]

      return sum([
            bodyDragCoefficient,
            finDragCoefficient,
            noseDragCoefficient,
      ])

      return airDensity * velocity**2 * netDragCoefficient / 2

if __name__ == '__main__':
      app.run(debug=os.getenv("FLASK_DEBUG") or True)

