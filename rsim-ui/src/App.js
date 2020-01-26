import React from 'react';
import './App.css';

import InputFactors from "./InputFactors";
import { Button } from '@material-ui/core';
import GridLayout from 'react-grid-layout';
import '../node_modules/react-vis/dist/style.css';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import {XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, LineSeries} from 'react-vis';
import CSVReader from "react-csv-reader";
import Derivative from './Derivative';

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

const Results = props =>  {
  const layout = [
    {i: 'a', x: 0, y: 0, w: 2, h: 1, static: true},
    {i: 'b', x: 1, y: 0, w: 1, h: 1, minW: 2, maxW: 4},
    {i: 'c', x: 4, y: 0, w: 1, h: 2}
  ];

  const d1 = props.data;
  const d2 = props.data2;
  const d1_ = Derivative(d1);
  const d2_ = Derivative(d2);
  const d1__ = Derivative(d1_);
  const d2__ = Derivative(d2_);

  return (
    <GridLayout className="layout" layout={layout} cols={3} rowHeight={300} width={window.innerWidth} height={window.innerHeight}>
      <div key="a" className="Results">
        <XYPlot className="plot" height={(layout[0]["h"] * 300) - 40} width={(window.innerWidth/3) * layout[0]["w"] - 30}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title="Time (s)"/>
          <YAxis title="Altitude"/>
          <LineSeries data={d1} />
          <LineSeries data={d2} />
        </XYPlot>
      </div>
      <div key="b" className="Results">
        <XYPlot className="plot" height={(layout[0]["h"] * 300) - 40} width={(window.innerWidth/3) * layout[0]["w"] - 30}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title="Time (s)"/>
          <YAxis title="Velocity"/>
          <LineSeries data={d1_} />
          <LineSeries data={d2_} />
        </XYPlot>
      </div>
      <div key="c" className="Results">
        <XYPlot className="plot" height={(layout[0]["h"] * 300) - 40} width={(window.innerWidth/3) * layout[0]["w"] - 30}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title="Time (s)"/>
          <YAxis title="Acceleration"/>
          <LineSeries data={d1__} />
          <LineSeries data={d2__} />
        </XYPlot>
      </div>
    </GridLayout>
  )
};

const reformatRes = res => res.map(dataPoint => ({
  x: dataPoint[0],
  y: dataPoint[1][0],
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
    {i: 'motor',        x: 0, y: 0, w: 1, h: 1, static: true},
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
    <GridLayout className="layout" layout={layout} cols={3} rowHeight={350} width={window.innerWidth} height={window.innerHeight}>
      {state.map(structure =>
        <div key={structure.header} className="inputElement">
        <InputFactors className={structure.header} {...structure}
          setInputFactor={setInputFactor}/>        </div>)}
    </GridLayout>
      <Button onClick={() => simulate(state, setResults)}>Simulate!</Button>
      <CSVReader onFileLoaded={data => setResults2(data.map(row => ({
        x: row[0],
        y: row[1], 
      })))}/>
      <Results data={results} data2={results2}/>
    </div>
  );
};
