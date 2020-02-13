import React, { useState } from "react";
import axios from "axios";
import {
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
  Box,
  Button,
  AppBar,
  Toolbar
} from "@material-ui/core";
import { sizing } from "@material-ui/system";

const InputGrid = ({ children }) => {
  return (
    <Grid container direction="column" spacing={2}>
      {children.map((child, idx) => (
        <Grid item key={idx}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
};

const PaperList = ({ children }) => {
  return (
    <Paper>
      <Box p={2}>
        <Grid container direction="column" spacing={2}>
          {children.map((child, idx) => (
            <Grid item key={idx}>
              {child}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

const Heading = props => {
  return (
    <Typography variant="h6" {...props}>
      {props.children}
    </Typography>
  );
};

const NumericInput = props => {
  return <TextField type="number" variant="outlined" fullWidth {...props} />;
};

const MaterialInput = props => {
  return;
};

export default function App() {
  const [input, setInput] = useState({
    bodyDiameter: 10,
    bodyLength: 10,
    bodyMass: 10,
    bodyMaterial: "abs",
    finCount: 3,
    finHeight: 10,
    finMass: 10,
    finMaterial: "abs",
    finSweep: 10,
    motorBurnTime: 10,
    motorImpulse: 10,
    motorMass: 10,
    noseDiameter: 10,
    noseLength: 10,
    noseMass: 10,
    noseMaterial: "abs"
  });

  const [output, setOutput] = useState([{ t: 0.0, y: 0.0 }]);

  const handleChange = key => event => {
    setInput({ ...input, [key]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post("/api")
      .then(res => {
        setOutput(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
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
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
      <Box p={2} height="100%" style={{ overflow: "auto" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <InputGrid>
              <PaperList>
                <Heading>Body</Heading>
                <NumericInput
                  label="Diameter (m)"
                  value={input.bodyDiameter}
                  onChange={handleChange("bodyDiameter")}
                />
                <NumericInput
                  label="Length (m)"
                  value={input.bodyLength}
                  onChange={handleChange("bodyLength")}
                />
                <NumericInput
                  label="Mass (kg)"
                  value={input.bodyMass}
                  onChange={handleChange("bodyMass")}
                />
              </PaperList>
              <PaperList>
                <Heading>Fins</Heading>
                <NumericInput
                  label="Count"
                  value={input.finCount}
                  onChange={handleChange("finCount")}
                />
                <NumericInput
                  label="Height (m)"
                  value={input.finHeight}
                  onChange={handleChange("finHeight")}
                />
                <NumericInput
                  label="Mass (kg)"
                  value={input.finMass}
                  onChange={handleChange("finMass")}
                />
                <NumericInput
                  label="Sweep Angle (°)"
                  value={input.finSweep}
                  onChange={handleChange("finSweep")}
                />
              </PaperList>
              <PaperList>
                <Heading>Motor</Heading>
                <NumericInput
                  label="Burn Time (s)"
                  value={input.motorBurnTime}
                  onChange={handleChange("motorBurnTime")}
                />
                <NumericInput
                  label="Impulse (N⋅m)"
                  value={input.motorImpulse}
                  onChange={handleChange("motorImpulse")}
                />
                <NumericInput
                  label="Mass (kg)"
                  value={input.motorMass}
                  onChange={handleChange("motorMass")}
                />
              </PaperList>
              <PaperList>
                <Heading>Nose</Heading>
                <NumericInput
                  label="Diameter (m)"
                  value={input.noseDiameter}
                  onChange={handleChange("noseDiameter")}
                />
                <NumericInput
                  label="Length (m)"
                  value={input.noseLength}
                  onChange={handleChange("noseLength")}
                />
                <NumericInput
                  label="Mass (kg)"
                  value={input.noseMass}
                  onChange={handleChange("noseMass")}
                />
              </PaperList>
            </InputGrid>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
