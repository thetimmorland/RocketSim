import React from 'react'
import { Box, Paper, Typography, Fab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import NavigationIcon from '@material-ui/icons/Navigation';
import InputSlider from "./InputSlider"

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    flexWrap: 'wrap',
    margin: theme.spacing(2),
  },
  paper: {
    flexGrow: 0.5,
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}))

function handleSubmit(event) {

  // fetch(process.env.BACKEND_HOST || "http://localhost:5000/", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(formData),
  // })
  //   .then(res => res.json())
  //   .then(res => {
  //     console.log(res);
  //   })
  //   .catch(err => {
  //     alert("Simulator Error");
  //   })

  console.log(event)
  event.preventDefault()
}

function PaperList({ name, children }) {
  const classes = useStyles()

  return (
    <div className={classes.paper}>
      <Paper>
        <Box p={2}>
          <Typography variant='h4' gutterBottom>
            {name}
          </Typography>
          {children}
        </Box>
      </Paper>
    </div>
  )
}

export default function InputForm() {
  const classes = useStyles()

  return(
    <form onSubmit={handleSubmit}>
      <div className={classes.root}>
        <PaperList name='Body'>
          <InputSlider name='Length (m)' />
          <InputSlider name='Diameter (m)' />
          <InputSlider name='Mass (kg)' />
        </PaperList>
        <PaperList name='Fins'>
          <InputSlider name='Count' />
          <InputSlider name='Height (m)' />
          <InputSlider name='Mass (kg)' />
          <InputSlider name='Sweep Angle (deg)' />
        </PaperList>
        <PaperList name='Motor'>
          <InputSlider name='Burn Time (s)' />
          <InputSlider name='Impulse (N⋅s)' />
          <InputSlider name='Mass (kg)' />
        </PaperList>
        <PaperList name='Nose'>
          <InputSlider name='Length (m)' />
          <InputSlider name='Diameter (m)' />
          <InputSlider name='Mass (kg)' />
        </PaperList>
        <Fab
          className={classes.fab}
          type='submit'
          variant='extended'
          color='primary'
        >
          <NavigationIcon className={classes.extendedIcon} />
          Simulate
        </Fab>
      </div>
    </form>
  )
}

