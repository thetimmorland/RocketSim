import React, { UseState } from 'react';
import { CssBaseline } from '@material-ui/core';
import SimpleAppBar from './SimpleAppBar'
import SimulatorParms from './SimulatorParams'

export default function App() {
  const [state, updateState] = UseState({ 'params': [], 'results': [] })

  return(
    <>
      <CssBaseline />
      <SimpleAppBar />
      <SimulatorParms />
    </>
  )
}
