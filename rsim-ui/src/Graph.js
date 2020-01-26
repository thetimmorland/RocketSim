import React from 'react';

import GridLayout from 'react-grid-layout';
import '../node_modules/react-vis/dist/style.css';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import {XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, LineSeries} from 'react-vis';
import Derivative from './Derivative';


const Results = props =>  {
    const layout = [
      {i: 'a', x: 0, y: 0, w: 2, h: 1, static: true},
      {i: 'b', x: 0, y: 1, w: 2, h: 1, static: true},
      {i: 'c', x: 0, y: 2, w: 2, h: 2, static: true}
    ];
  
    const d1 = props.data;
    const d2 = props.data2;
    const d1_ = Derivative(d1);
    const d2_ = Derivative(d2);
    const d1__ = Derivative(d1_);
    const d2__ = Derivative(d2_);
  
    return (
      <div>
        {(d1 || d2) && <GridLayout className="layout" layout={layout} cols={2} rowHeight={300} width={window.innerWidth} height={window.innerHeight}>
          <div key="a" className="Results">
            <XYPlot className="plot" height={(layout[0]["h"] * 300) - 40} width={(window.innerWidth/2) * layout[0]["w"] - 30}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis title="Time (s)"/>
              <YAxis title="Altitude"/>
              <LineSeries data={d1} />
              <LineSeries data={d2} />
            </XYPlot>
          </div>
          <div key="b" className="Results">
            <XYPlot className="plot" height={(layout[0]["h"] * 300) - 40} width={(window.innerWidth/2) * layout[0]["w"] - 30}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis title="Time (s)"/>
              <YAxis title="Velocity"/>
              <LineSeries data={d1_} />
              <LineSeries data={d2_} />
            </XYPlot>
          </div>
          <div key="c" className="Results">
            <XYPlot className="plot" height={(layout[0]["h"] * 300) - 40} width={(window.innerWidth/2) * layout[0]["w"] - 30}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis title="Time (s)"/>
              <YAxis title="Acceleration"/>
              <LineSeries data={d1__} />
              <LineSeries data={d2__} />
            </XYPlot>
          </div>
        </GridLayout>}
      </div>
    )
  };

export default Results;