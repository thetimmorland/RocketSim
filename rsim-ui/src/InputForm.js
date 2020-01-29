import React, { useState } from "react";
import {
  Fab,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NavigationIcon from "@material-ui/icons/Navigation";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  paper: {
    margin: theme.spacing(2),
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  input: {
    margin: theme.spacing(2),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabIcon: {
    marginRight: theme.spacing(1),
  }
}));

export default function InputForm() {
  const classes = useStyles();
  const [state, setState] = useState({
    bodyDiameter: 10,
    bodyLength: 10,
    bodyMass: 10,
    bodyMaterial: 'abs',
    finCount: 3,
    finHeight: 10,
    finMass: 10,
    finMaterial: 'abs',
    finSweep: 10,
    motorBurnTime: 10,
    motorImpulse: 10,
    motorMass: 10,
    noseDiameter: 10,
    noseLength: 10,
    noseMass: 10,
    noseMaterial: 'abs',
  });

  const handleChange = event =>
    setState({ ...state, [event.target.name]: event.target.value });

  const handleSubmit = event => {
    fetch(process.env.API_HOST || 'http://localhost:5000', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
      })

    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant='h6' className={classes.heading}>
            Body
          </Typography>
          <TextField
            name='bodyDiameter'
            label='Diameter (m)'
            value={state.bodyDiameter}
            onChange={handleChange}
            className={classes.input}
            type='number'
          />
          <TextField
            name='bodyLength'
            label='Length (m)'
            value={state.bodyLength}
            onChange={handleChange}
            className={classes.input}
            type='number'
          />
          <TextField
            name='bodyMass'
            label='Mass (kg)'
            value={state.bodyMass}
            onChange={handleChange}
            className={classes.input}
            type='number'
          />
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant='h6' className={classes.heading}>
            Fins
          </Typography>
          <TextField
            name='finCount'
            label='Count'
            value={state.finCount}
            onChange={handleChange}
            className={classes.input}
            type='number'
          />
          <TextField
            name='finHeight'
            label='Height (m)'
            value={state.finHeight}
            onChange={handleChange}
            className={classes.input}
            type='number'
          />
          <TextField
            name='finMass'
            label='Mass (kg)'
            value={state.finMass}
            onChange={handleChange}
            className={classes.input}
            type='number'
          />
          <TextField
            name='finSweep'
            label='Sweep Angle (°)'
            value={state.finSweep}
            onChange={handleChange}
            className={classes.input}
            type='number'
          />
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant='h6' className={classes.heading}>
            Motor
          </Typography>
          <TextField
            name='motorBurnTime'
            label='Burn Time (s)'
            value={state.motorBurnTime}
            onChange={handleChange}
            className={classes.input}
            type='number'
          />
          <TextField
            name='motorImpulse'
            label='Impulse (N⋅m)'
            value={state.motorImpulse}
            onChange={handleChange}
            className={classes.input}
            type='number'
          />
          <TextField
            name='motorMass'
            label='Mass (kg)'
            value={state.motorMass}
            onChange={handleChange}
            className={classes.input}
            type='number'
          />
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant='h6' className={classes.heading}>
            Nose
          </Typography>
          <TextField
            name='noseDiameter'
            label='Diameter (m)'
            value={state.noseDiameter}
            onChange={handleChange}
            className={classes.input}
            type='number'
          />
          <TextField
            name='noseLength'
            label='Length (m)'
            value={state.noseLength}
            onChange={handleChange}
            className={classes.input}
            type='number'
          />
          <TextField
            name='noseMass'
            label='Mass (kg)'
            value={state.noseMass}
            onChange={handleChange}
            className={classes.input}
            type='number'
          />
        </Paper>
      </div>
      <Fab
        className={classes.fab}
        type='submit'
        variant='extended'
        color='primary'
      >
        <NavigationIcon className={classes.fabIcon} />
        Simulate
      </Fab>
    </form>
  );
}
