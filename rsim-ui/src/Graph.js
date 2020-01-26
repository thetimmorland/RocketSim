import React from 'react';
import GridLayout from 'react-grid-layout';
import {XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, LineSeries} from 'react-vis';
import Derivative from "./Derivative";

export default function Graph(props) {
    const layout = [
      {i: 'a', x: 0, y: 0, w: 2, h: 1, static: true},
      {i: 'b', x: 1, y: 0, w: 1, h: 1, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];

    const d1 = undefined;
    const d1_ = undefined;
    const d1__ = undefined;
    const d2 = undefined;
    const d2_ = undefined;
    const d2__ = undefined;

    if(d1) {
      d1 = props.data;
      d1_ = Derivative(d1);
      d1__ = Derivative(d1_);
    }
    if(d2) {
      d2 = props.data2;
      d2_ = Derivative(d2);
      d2__ = Derivative(d2_);
    }
  return (
    <GridLayout className="layout" layout={layout} cols={3} rowHeight={300} width={window.innerWidth} height={window.innerHeight}>
      <div key="a" className="Results">
        Altitude:
        <XYPlot className="plot" height={(layout[0]["h"] * 300) - 40} width={(window.innerWidth/3) * layout[0]["w"] - 30}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title="Time (s)"/>
          <YAxis title="Altitude"/>
          <LineSeries data={d1} />
          <LineSeries data={d2} />
        </XYPlot>
      </div>
      <div key="b" className="Results">
        Velocity:
        <XYPlot className="plot" height={(layout[0]["h"] * 300) - 40} width={(window.innerWidth/3) * layout[0]["w"] - 30}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title="Time (s)"/>
          <YAxis title="Altitude"/>
          <LineSeries data={d1_} />
          <LineSeries data={d2_} />
        </XYPlot>
      </div>
      <div key="c" className="Results">
        Acceleration:
        <XYPlot className="plot" height={(layout[0]["h"] * 300) - 40} width={(window.innerWidth/3) * layout[0]["w"] - 30}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title="Time (s)"/>
          <YAxis title="Altitude"/>
          <LineSeries data={d1__} />
          <LineSeries data={d2__} />
        </XYPlot>
      </div>
    </GridLayout>
  )
};