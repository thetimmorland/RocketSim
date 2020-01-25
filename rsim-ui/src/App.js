import React from 'react';
import './App.css';

import InputFactors from "./InputFactors";

const inputsStructure_incomplete_manual = [
  {
    header: "body",
    inputs: [
      {
        name: "diameter",
        min: undefined,
        step: undefined,
        max: undefined,
      },
      {
        name: "length",
      },
      {
        name: "mass",
      },
    ],
  },
];

const fromReadMe = {
  "body": {
    "diameter": 0.04,
    "length": 0.4,
    "mass": 0.01
  },
  "fins": {
    "sweep": 39.8,
    "count": 3,
    "height": 0.03,
    "mass": 0.02,
    "sweep": 0.025
  },
  "variableMass": {
    "distanceFromTip": 0.2,
    "mass": 0.01
  },
  "motor": {
    "impulse": 15,
    "mass": 0.09
  },
  "noseCone": {
    "length": 0.06,
    "mass": 0.012
  }
};
/*
const transformToPrefferedFormat = structure => {
  result = [];
  for(const header in structure) {
    const names = structure[header];
    const inputs = [];
    for(const name in names) {
      inputs.push({
        name,
        min: undefined,
        step: undefined,
        max: undefined,
        defaultValue: names[name],
      })
    }
    result.push({
      header,
      inputs, 
    })
  }
}
*/
/*
{
	'body': {
		'length',
		'diameter',
		'mass',
	},

	'fins': {
		// modeling fins as trapazoids for now
		'count',
		'cant,
		'height',
		'sweep',
		'mass',
	},

	'noseCone': {
		// modeling nose cone as triangular cone
		'length',
		'mass',
	},

	'motor': {
		'impulse',
		'mass',
	}

	massVariable':{
		'msss',
		'distanceFromTip',
	}
}
*/
function App() {
  return (
    <div className="App">
      {inputsStructure_incomplete_manual.map(structure => <InputFactors key={structure.header} {...structure}/>)}\
    </div>
  );
}

export default App;
