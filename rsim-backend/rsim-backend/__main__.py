from flask import Flask, request, jsonify
from schema import Schema, And, Use
import os

app = Flask(__name__)

rocketSchema = Schema({
      'body': {
            'diameter': int,
            'length': int,
            'mass': int,
      }, 'fins': {
            'sweep': int,
            'count': int,
            'height': int,
            'mass': int,
            'cant': int,
      }, 'variableMass': {
            'distanceFromTip': int,
            'mass': int,
      }, 'motor' : {
            'impulse': int,
            'mass': int,
      }, 'noseCone': {
            'length': int,
            'mass': int,
      },
})

@app.route('/', methods = ['GET'])
def rocketSim():
      rocket = rocketSchema.validate(request.json)
      return jsonify(content)


if __name__ == '__main__':
      app.run(debug=os.getenv("FLASK_DEBUG") or True)

