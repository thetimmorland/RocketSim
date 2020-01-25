import React from 'react';

import InputSlider from "./InputSlider";
import ListPicker from "./ListPicker";

export default function InputFactors(props) {
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
    <div className={props.className}>
        <h1>{props.header}</h1>
        {props.inputs.map(input =>
          input.name !== "material"
            ? <InputSlider key={input.name} {...input} setInput={setInput}/>
            : <ListPicker key={input.name} {...input} setInput={setInput}/>)}
    </div>
  );
}
