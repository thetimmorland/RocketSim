import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }
}));

export default function SimpleAppBar() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Grid container justify='space-between'>
            <Grid item>
              <Typography variant="h6" color="inherit">
                RSim
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant='outlined'
                color='secondary'
                onClick={() =>
                    window.location.href =
                      'http://www.github.com/thetimmorland/RocketSim'
                }
              >
                Github
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
