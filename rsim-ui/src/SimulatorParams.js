import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import InputFactors from "./InputFactors";
import { useTheme } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    alignContent: 'stretch',
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(2),
  }
}))

const simulate = (state, setResults) => {

  const inputData = {};
  for (const factor of state) {
    const inputs = {};
    for (const input of factor.inputs) {
      inputs[input.name] = input.value;
    }
    inputData[factor.header] = inputs;
  }

  // send to server to simulate
  fetch(process.env.BACKEND_HOST || "http://localhost:5000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputData),
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      alert("Uh oh!\nIt looks like you are missing an input!");
    });
};

export default function RocketParams() {
  const classes = useStyles()
  const [state, upateState] = useState()

  return(
    <div className={classes.root}>
    </div>
  )
}

