import {
  ExpansionPanel,
  AppBar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Toolbar,
  Typography,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import React, { useState } from "react";
import Chart from "./Chart";

const InputSection = props => {
  return (
    <ExpansionPanel {...props}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{props.label}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container direction="column" spacing={2}>
          {props.children.map((child, idx) => (
            <Grid item key={idx}>
              {child}
            </Grid>
          ))}
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const NumberField = props => {
  return <TextField type="number" variant="outlined" fullWidth {...props} />;
};

export default function App() {
  const [input, setInput] = useState({
    bodyDiameter: 0.5,
    bodyLength: 0.5,
    bodyMass: 0.1,
    bodyMaterial: "abs",
    finCount: 3,
    finHeight: 0.1,
    finMass: 0.6,
    finMaterial: "abs",
    finSweep: 60,
    motorBurnTime: 10,
    motorImpulse: 25,
    motorMass: 0.5,
    noseDiameter: 0.5,
    noseLength: 0.6,
    noseMass: 0.1,
    noseMaterial: "abs"
  });

  const [output, setOutput] = useState([{ t: 0.0, y: undefined }]);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = key => event => {
    setInput({ ...input, [key]: event.target.value });
  };

  const handleExpand = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post("/api/simulate", input)
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
      <AppBar position="sticky">
        <Toolbar>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6">RSim</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit" color="secondary">
                Simulate
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box m={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={2}>
            <InputSection
              label="Body"
              expanded={expanded === "body"}
              onChange={handleExpand("body")}
            >
              <NumberField
                label="Diameter (m)"
                value={input.bodyDiameter}
                onChange={handleChange("bodyDiameter")}
              />
              <NumberField
                label="Length (m)"
                value={input.bodyLength}
                onChange={handleChange("bodyLength")}
              />
              <NumberField
                label="Mass (kg)"
                value={input.bodyMass}
                onChange={handleChange("bodyMass")}
              />
            </InputSection>
            <InputSection
              label="Fins"
              expanded={expanded === "fins"}
              onChange={handleExpand("fins")}
            >
              <NumberField
                label="Count"
                value={input.finCount}
                onChange={handleChange("finCount")}
              />
              <NumberField
                label="Height (m)"
                value={input.finHeight}
                onChange={handleChange("finHeight")}
              />
              <NumberField
                label="Mass (kg)"
                value={input.finMass}
                onChange={handleChange("finMass")}
              />
              <NumberField
                label="Sweep Angle (°)"
                value={input.finSweep}
                onChange={handleChange("finSweep")}
              />
            </InputSection>
            <InputSection
              label="Motor"
              expanded={expanded === "motor"}
              onChange={handleExpand("motor")}
            >
              <NumberField
                label="Burn Time (s)"
                value={input.motorBurnTime}
                onChange={handleChange("motorBurnTime")}
              />
              <NumberField
                label="Impulse (N⋅m)"
                value={input.motorImpulse}
                onChange={handleChange("motorImpulse")}
              />
              <NumberField
                label="Mass (kg)"
                value={input.motorMass}
                onChange={handleChange("motorMass")}
              />
            </InputSection>
            <InputSection
              label="Nose"
              expanded={expanded === "nose"}
              onChange={handleExpand("nose")}
            >
              <NumberField
                label="Diameter (m)"
                value={input.noseDiameter}
                onChange={handleChange("noseDiameter")}
              />
              <NumberField
                label="Length (m)"
                value={input.noseLength}
                onChange={handleChange("noseLength")}
              />
              <NumberField
                label="Mass (kg)"
                value={input.noseMass}
                onChange={handleChange("noseMass")}
              />
            </InputSection>
          </Grid>
          <Grid item xs={12} sm={8} md={10}>
            <Chart data={output} />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
