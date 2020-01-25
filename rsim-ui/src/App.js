import React from 'react';
import './App.css';

import InputFactors from "./InputFactors";
import { Button } from '@material-ui/core';

const inputsStructure_manual = [
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
      {
        name: "material",
      },
    ],
  },
  {
    header: "fins",
    inputs: [
      {
        name: "cant",
      },
      {
        name: "count",
      },
      {
        name: "height",
      },
      {
        name: "mass",
      },
      {
        name: "material",
      },
      {
        name: "sweep",
      },
    ],
  },
  {
    header: "variableMass",
    inputs: [
      {
        name: "distanceFromTip",
      },
      {
        name: "mass",
      },
    ],
  },
  {
    header: "motor",
    inputs: [
      {
        name: "impulse",
      },
      {
        name: "mass",
      },
      {
        name: "burnTime",
      },
    ],
  },
  {
    header: "noseCone",
    inputs: [
      {
        name: "length",
      },
      {
        name: "mass",
      },
      {
        name: "material",
      },
    ],
  },
  
];

/*
const fromReadMe = {
  'body': {
        'diameter': positiveFloat,
        'length': positiveFloat,
        'mass': positiveFloat,
        'material': validMaterial,
  }, 'fins': {
        'cant': positiveFloat,
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
};
*/

const simulate = (state, setResults) => {
  // error checking:
  if(false) {
    alert("Uh oh!\nThere seems to be a problem with your input data!");
  }

  // build object to send to server:
  const inputData = {};
  for(const factor of state) {
    const inputs = {};
    for(const input of factor.inputs) {
      inputs[input.name] = input.value;
    }
    inputData[factor.header] = inputs;
  }

  // send to server to simulate
  fetch("http://localhost:5000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputData),
  })
  .then(res => res.json())
  .then(res => {
    console.log(res);
    setResults(res);
  });
};

export default function App() {
  const [state, setState] = React.useState(inputsStructure_manual);
  const setInputFactor = factor => {
    const newState = [
      ...state,
    ];
    for(const factI in newState) {
      if(newState[factI].header === factor.header) {
        newState[factI] = factor;
      }
    }
    setState(newState);
  };
  console.log("state:");
  console.log(state);

  const [results, setResults] = React.useState(undefined);

  return (
    <div className="App">
      {state.map(structure =>
        <InputFactors key={structure.header} className={structure.header} {...structure}
          setInputFactor={setInputFactor}/>)}
      <Button onClick={() => simulate(state, setResults)}>Simulate!</Button>
    </div>
  );
};
