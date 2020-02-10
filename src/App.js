import React, { useState} from "react";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Box,
  Button,
  AppBar,
  Toolbar
} from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";

export default function App() {
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

  return (
    <form >
    <CssBaseline />
    <Box width={1}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6" color="inherit">
                RSim
                </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() =>
                  (window.location.href =
                    "http://www.github.com/thetimmorland/RocketSim")
                }
              >
                Github
                </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
    <Box>
      <Paper >
        <Typography variant='h6' >
          Body
          </Typography>
        <TextField
          label='Diameter (m)'
          value={state.bodyDiameter}
          onChange={handleChange}
        />
        <TextField
          label='Length (m)'
          value={state.bodyLength}
        />
        <TextField
          label='Mass (kg)'
          value={state.bodyMass}
        />
      </Paper>
      <Paper >
        <Typography variant='h6' >
          Fins
          </Typography>
        <TextField
          label='Count'
          value={state.finCount}
          onChange={handleChange}
        />
        <TextField
          label='Height (m)'
          value={state.finHeight}
          onChange={handleChange}
        />
        <TextField
          label='Mass (kg)'
          value={state.finMass}
          onChange={handleChange}
        />
        <TextField
          label='Sweep Angle (°)'
          value={state.finSweep}
          onChange={handleChange}
        />
      </Paper>
      <Paper >
        <Typography variant='h6' >
          Motor
          </Typography>
        <TextField
          label='Burn Time (s)'
          value={state.motorBurnTime}
          onChange={handleChange}
        />
        <TextField
          label='Impulse (N⋅m)'
          value={state.motorImpulse}
          onChange={handleChange}
        />
        <TextField
          label='Mass (kg)'
          value={state.motorMass}
          onChange={handleChange}
        />
      </Paper>
      <Paper >
        <Typography variant='h6' >
          Nose
          </Typography>
        <TextField
          label='Diameter (m)'
          value={state.noseDiameter}
          onChange={handleChange}
        />
        <TextField
          label='Length (m)'
          value={state.noseLength}
          onChange={handleChange}
        />
        <TextField
          label='Mass (kg)'
          value={state.noseMass}
          onChange={handleChange}
        />
      </Paper>
    </Box>
    </form >
  );
}
