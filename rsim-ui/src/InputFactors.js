import React from 'react';

import InputSlider from "./InputSlider";

export default function InputFactors(props) {
  return (
    <div style={{
        backgroundColor: "grey",
    }}>
        <h1>{props.header}</h1>
        {props.inputs.map(input => <InputSlider key={input.name} {...input}/>)}
    </div>
  );
}
