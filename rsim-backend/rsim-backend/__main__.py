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
      'bodyDiameter': positiveFloat,
      'bodyLength': positiveFloat,
      'bodyMass': positiveFloat,
      'bodyMaterial': validMaterial,
      'finCount': positiveInt,
      'finHeight': positiveFloat,
      'finMass': positiveFloat,
      'finMaterial': validMaterial,
      'finSweep': positiveFloat,
      'motorBurnTime': positiveFloat,
      'motorImpulse': positiveFloat,
      'motorMass': positiveFloat,
      'noseDiameter': positiveFloat,
      'noseLength': positiveFloat,
      'noseMass': positiveFloat,
      'noseMaterial': validMaterial,
}, ignore_extra_keys=True)

@app.route('/', methods = ['POST'])
def rocket_sim():

      try:
            rocket = rocketSchema.validate(request.json)
      except:
            return 400

      def model(t, v):
            dvdt = exaustVelocity(rocket) \
                  * math.log(initalNetMass(rocket) / finalNetMass(rocket)) \
                  - STD_GRAVITY - (AIR_DENSITY * v**2 * dragCoefficient(rocket))

            return dvdt

      t = np.linspace(0, 100, num=100*100)
      v = odeint(model, 0, t).flatten()

      altitude = cumtrapz(v, x=t)
      altitude = [ a for a in altitude if a > 0 ]
      return jsonify(list(zip(t.tolist(), altitude)))

def exaustVelocity(rocket: dict) -> float:
      return STD_GRAVITY * rocket['motorImpulse']

def initalNetMass(rocket: dict) -> float:
      return sum([rocket['bodyMass'],
                  rocket['finMass'],
                  rocket['motorMass'],
                  rocket['noseMass']])

def finalNetMass(rocket: dict) -> float:
      return initalNetMass(rocket) - rocket['motorMass']

def dragCoefficient(rocket: dict) -> float:
      dragCoefficients = {}

      dragCoefficients['body'] = rocket['bodyDiameter'] * rocket['bodyLength'] \
            * DRAG_COEFFICIENTS[rocket['bodyMaterial']]

      dragCoefficients['fins'] = 2 * rocket['finCount'] * rocket['finHeight']**2 \
            * math.sin(rocket['finSweep']) * DRAG_COEFFICIENTS[rocket['finMaterial']]

      noseRadius = rocket['noseDiameter'] / 2
      dragCoefficients['nose'] = math.pi * noseRadius \
            * math.sqrt(rocket['noseLength']**2 + noseRadius**2) \
            * DRAG_COEFFICIENTS[rocket['noseMaterial']]

      return AIR_DENSITY * sum(dragCoefficients.values()) / 2

if __name__ == '__main__':
      app.run(debug=os.getenv("FLASK_DEBUG") or True)

