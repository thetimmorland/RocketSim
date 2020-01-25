from flask import Flask, request, jsonify
from schema import Schema, And, Use
from math import log
import os

app = Flask(__name__)

materials = [
      'aluminum',
      'wood',
      'cardboard',
      'abs',
]

rocketSchema = Schema({
      'body': {
            'diameter': int,
            'length': int,
            'mass': int,
            'material': And(Use(str), lambda m: m in materials)
      }, 'fins': {
            'sweep': int,
            'count': int,
            'height': int,
            'mass': int,
            'cant': int,
            'material': And(Use(str), lambda m: m in materials)
      }, 'variableMass': {
            'distanceFromTip': int,
            'mass': int,
      }, 'motor' : {
            'impulse': int,
            'mass': int,
      }, 'noseCone': {
            'length': int,
            'mass': int,
            'material': And(Use(str), lambda m: m in materials)
      },
})


@app.route('/', methods = ['POST'])
def rocket_sim():
      rocket = rocketSchema.validate(request.json)
      return jsonify(output)


if __name__ == '__main__':
      app.run(debug=os.getenv("FLASK_DEBUG") or True)

