from flask import Flask, request, jsonify
from schema import Schema, And, Use
import math
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
            'cant': positiveFloat, # angle in degrees
            'count': positiveFloat,
            'height': positiveFloat,
            'mass': positiveFloat,
            'material': validMaterial,
            'sweep': positiveFloat,
      }, 'variableMass': {
            'distanceFromTip': positiveFloat,
            'mass': positiveFloat,
      }, 'motor' : {
            'impulse': positiveFloat,
            'mass': positiveFloat,
      }, 'noseCone': {
            'length': positiveFloat,
            'mass': positiveFloat,
            'material': validMaterial,
      },
})


@app.route('/', methods = ['POST'])
def rocket_sim():
      rocket = rocketSchema.validate(request.json)

      # bodyDrag = rocket.body.diameter * rocket.body.length * \
      #       dragCoeffiecients[rocket.body.material]
      # finDrag = 2 * rocket.fin.count * rocket.fin.height**2 * \
      #      math.sin


      return jsonify(rocket)


if __name__ == '__main__':
      app.run(debug=os.getenv("FLASK_DEBUG") or True)

