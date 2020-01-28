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
    display: "flex",
    flexWrap: "wrap"
  },
  paper: {
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "column"
  },
  heading: {
    margin: theme.spacing(2)
  },
  input: {
    margin: theme.spacing(2)
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  fabIcon: {
    marginRight: theme.spacing(1)
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
    console.log(state);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="h6" className={classes.heading}>
            Body
          </Typography>
          <TextField
            name="bodyLength"
            label="Length (m)"
            value={state.bodyLength}
            onChange={handleChange}
            className={classes.input}
            type="number"
          />
          <TextField
            name="bodyDiameter"
            label="Diameter (m)"
            value={state.bodyDiameter}
            onChange={handleChange}
            className={classes.input}
            type="number"
          />
          <TextField
            name="bodyMass"
            label="Mass (kg)"
            value={state.bodyMass}
            onChange={handleChange}
            className={classes.input}
            type="number"
          />
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant="h6" className={classes.heading}>
            Fins
          </Typography>
          <TextField
            name="finCount"
            label="Count (m)"
            value={state.finCount}
            onChange={handleChange}
            className={classes.input}
            type="number"
          />
          <TextField
            name="finMass"
            label="Mass"
            value={state.finMass}
            onChange={handleChange}
            className={classes.input}
            type="number"
          />
          <TextField
            name="finAngle"
            label="Angle"
            value={state.finMass}
            onChange={handleChange}
            className={classes.input}
            type="number"
          />
        </Paper>
        <Fab
          className={classes.fab}
          type="submit"
          variant="extended"
          color="primary"
        >
          <NavigationIcon className={classes.fabIcon} />
          Simulate
        </Fab>
      </div>
    </form>
  );
}
