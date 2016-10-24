import React from 'react';
import Axis from './Axis';
import {scaleLinear} from 'd3-scale';
import {stack, area} from 'd3-shape';
import {axisBottom, axisLeft} from 'd3-axis';

const colorMapFn = ['#f00', '#0f0'];
const margin = { top: 10, right: 30, bottom: 40, left: 60 };

const xAxisModifier = (ele) => {
  ele.selectAll('text').attr('dy', '20px');
};

const yAxisModifier = (ele) => {
  ele.selectAll('text').attr('dx', '-5px');
};

const drawLayout = ({ xFn, yFn }) => {
  const xAxis = axisBottom()
    .scale(xFn)
    .tickSize(0)
    .ticks(8);

  const yAxis = axisLeft()
    .scale(yFn)
    .ticks(4)
    .tickFormat((d) => `${d}%`)
    .tickSize(-1);

  return {
    xAxis,
    yAxis,
  };
};

const StackAreaChart = React.createClass({

  getDefaultProps() {
    return {
      width: 1000,
      height: 200,
      data: [],
    };
  },

  render() {
    const { props } = this;
    const {
      keys,
      data,
      width,
      height,
    } = props;

    const actualWidth = Math.max(200, width - margin.left - margin.right);
    const actualHeight = Math.max(40, height - margin.top - margin.bottom);

    //we hard code x, y range
    const xFn = scaleLinear()
      .domain([1, 10])
      .range([0, actualWidth]);

    const yFn = scaleLinear()
      .domain([0, 100])
      .range([actualHeight, 0]);

    const { xAxis, yAxis } = drawLayout({ xFn, yFn, actualWidth });

    const stackFn = stack().keys(keys);
    const stackData = stackFn(data);
    const drawAreaFunction = area()
      .x((d, i)=> xFn(i+1))
      .y0(d => yFn(d[0] || 0))
      .y1(d => yFn(d[0] + (d[1] || 0)));

    return (
      <div className="chart"
        style={{background: '#fff'}}
      >
        <svg
          width={width}
          height={height}
        >
          <g
            transform={`translate(${margin.left}, ${margin.top})`}
          >
            <Axis
              className="x"
              transform={`translate(0,${actualHeight})`}
              axisFn={xAxis}
              modifier={xAxisModifier}
            />
            <Axis
              className="y"
              axisFn={yAxis}
              modifier={yAxisModifier}
            />
            <g className="stack_area_layer">
              {
                stackData.map((d, i) => {
                  return (
                    <path
                      key={i}
                      fill={colorMapFn[i]}
                      d={drawAreaFunction(d)}
                    />
                  );
                })
              }
            </g>
          </g>
        </svg>
      </div>
    );
  },

});

export default StackAreaChart;
