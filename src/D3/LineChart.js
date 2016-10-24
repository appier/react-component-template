import React from 'react';
import Axis from './Axis';
import {scaleLinear} from 'd3-scale';
import {line, area} from 'd3-shape';
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
      data,
      width,
      height,
    } = props;

    const actualWidth = Math.max(200, width - margin.left - margin.right);
    const actualHeight = Math.max(40, height - margin.top - margin.bottom);

    const xFn = scaleLinear()
      .domain([1, 10])
      .range([0, actualWidth]);

    const yFn = scaleLinear()
      .domain([0, 100])
      .range([actualHeight, 0]);

    const { xAxis, yAxis } = drawLayout({ xFn, yFn, actualWidth });

    const lineData = data;

    const drawLineFunction = line()
      .x(d => xFn(d.x))
      .y(d => yFn(d.y))

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
            <g className="line_area_layer">
              {
                lineData.map((d, i) => {
                  return (
                    <path
                      key={i}
                      stroke={colorMapFn[i]}
                      strokeWidth="4"
                      fill="transparent"
                      d={drawLineFunction(d)}
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
