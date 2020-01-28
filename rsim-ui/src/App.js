import React, { UseState } from 'react'
import { CssBaseline } from '@material-ui/core'
import SimpleAppBar from './SimpleAppBar'
import InputForm from './InputForm'

export default function App() {
  // const [output, updateOutput] = UseState([])

  return(
    <>
      <CssBaseline />
      <SimpleAppBar />
      <InputForm />
    </>
  )
}
