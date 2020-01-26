import React from 'react';
import GridLayout from 'react-grid-layout';
import {XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, LineSeries} from 'react-vis';

export default function(props) {
    const layout = [
      {i: 'a', x: 0, y: 0, w: 2, h: 1, static: true},
      {i: 'b', x: 1, y: 0, w: 1, h: 1, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];
  return (
    <GridLayout className="layout" layout={layout} cols={3} rowHeight={300} width={window.innerWidth} height={window.innerHeight}>
      <div key="a" className="Results">
        <XYPlot className="plot" height={(layout[0]["h"] * 300) - 40} width={(window.innerWidth/3) * layout[0]["w"] - 30}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title="Time (s)"/>
          <YAxis title="Altitude"/>
          <LineSeries data={props.data} />
          <LineSeries data={props.data2} />
        </XYPlot>
      </div>
      <div key="b" className="Results">
        Test
      </div>
      <div key="c" className="Results">
        Test
      </div>
    </GridLayout>
  )
};