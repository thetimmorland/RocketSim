import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

export default function InputSlider(props) {

  const step = props.step || 0.1
  const min = props.min || 0
  const max = props.max || 1

  const classes = useStyles();

  const value = props.value;
  const setValue = value => {
    props.setInput({
      ...props,
      value,
    });
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    event.preventDefault();
  };

  const handleInputChange = event => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    event.preventDefault();
  };

  const handleBlur = () => {
    if (value < min) {
      setValue(min);
    } else if (value > max) {
      setValue(max);
    }
  };

  return (
    <>
      <Typography id="input-slider" gutterBottom>
        {props.name}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : props.min}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            step={step}
            min={min}
            max={max}
            type={'number'}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
	    variant='outlined'
            // margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </Grid>
      </Grid>
    </>
  );
}
