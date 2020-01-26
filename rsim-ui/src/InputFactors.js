import React from 'react';
import { Container, Paper, Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import InputSlider from "./InputSlider";
import ListPicker from "./ListPicker";


export default function InputFactors(props) {
  // const classes = useStyles()

  const setInput = input => {
    const newFactor = {
      ...props,
      inputs: [
        ...props.inputs,
      ],
    };
    for(const inputI in newFactor.inputs) {
      if(newFactor.inputs[inputI].name === input.name) {
        newFactor.inputs[inputI] = input;
      }
    }
    props.setInputFactor(newFactor);
  };

  return (
    <Container maxWidth='xs'>
      <Box p={3}>
        <Paper>
          <Box p={3}>
            <Box p={3}>
              <Typography variant="h5">{props.title}</Typography>
            </Box>
            {props.inputs.map(input =>
              input.name !== "material"
                ? <InputSlider key={input.name} {...input} setInput={setInput}/>
                : <ListPicker key={input.name} {...input} setInput={setInput}/>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
