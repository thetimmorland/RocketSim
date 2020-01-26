import React from 'react';
import './App.css';

import InputFactors from "./InputFactors";
import { Button } from '@material-ui/core';
import GridLayout from 'react-grid-layout';
import '../node_modules/react-vis/dist/style.css';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import CSVReader from "react-csv-reader";
import Graph from "./Graph";

const inputsStructure_manual = [
  {
    header: "body",
    title: "Body",
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
    title: "Fins",
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
    title: "Variable Mass",
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
    title: "Motor",
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
    title: "Nose Cone",
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

const inputsStructure_preFilled = [{"className":"body","header":"body","inputs":[{"name":"diameter","value":34},{"name":"length","value":46},{"name":"mass","value":59},{"name":"material","value":"cardboard"}]},{"className":"fins","header":"fins","inputs":[{"name":"cant","value":15},{"name":"count","value":7},{"name":"height","value":29},{"name":"mass","value":52},{"name":"material","value":"aluminum"},{"name":"sweep","value":14}]},{"className":"variableMass","header":"variableMass","inputs":[{"name":"distanceFromTip","value":18},{"name":"mass","value":10}]},{"className":"motor","header":"motor","inputs":[{"name":"impulse","value":53},{"name":"mass","value":72},{"name":"burnTime","value":86}]},{"className":"noseCone","header":"noseCone","inputs":[{"name":"length","value":33},{"name":"mass","value":26},{"name":"material","value":"abs"}]}];

const reformatRes = res => res.map(dataPoint => ({
  x: dataPoint[0],
  y: dataPoint[1],
}));

const simulate = (state, setResults) => {
  // error checking:
  // if(false) {
  //   alert("Uh oh!\nThere seems to be a problem with your input data!");
  // }

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
    setResults(reformatRes(res));
  })
  .catch(err => {
    alert("Uh oh!\nIt looks like you are missing an input!");
  });
  console.log("\n\n\n\n\n\n");
  console.log(JSON.state);
};

export default function App() {
  const layout = [
    {i: 'body',         x: 0, y: 0, w: 1, h: 1, static: true},
    {i: 'fins',         x: 1, y: 0, w: 1, h: 2, static: true},
    {i: 'variableMass', x: 2, y: 0, w: 1, h: 1, static: true},
    {i: 'motor',        x: 0, y: 1, w: 1, h: 1, static: true},
    {i: 'noseCone',     x: 2, y: 0, w: 1, h: 1, static: true}
  ];
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
  const [results2, setResults2] = React.useState(undefined);

  return (
    <div className="App">
      <br/>
      <h1>R-Sim</h1>
      <GridLayout className="layout" layout={layout} cols={4} rowHeight={325} width={window.innerWidth} height={window.innerHeight}>
        {state.map(structure =>
          <div key={structure.header} className="inputElement">
          <InputFactors className={structure.header} {...structure}
            setInputFactor={setInputFactor}/>
          </div>)}
      </GridLayout>
      <Button onClick={() => simulate(state, setResults)}>Simulate!</Button>
      <CSVReader onFileLoaded={data => setResults2(data.map(row => ({
        x: row[0],
        y: row[1],
      })))}/>
      <Graph data={results} data2={results2}/>
    </div>
  );
};
