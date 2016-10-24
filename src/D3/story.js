import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import LineChart from './LineChart.js';
import StackAreaChart from './StackAreaChart.js';

const stories = storiesOf('D3', module);

// x from 1 to 10, y from 0 to 100,
const lineData = [
  [
    {
      x: 1,
      y: 10,
    },
    {
      x: 3,
      y: 22,
    },
    {
      x: 5,
      y: 43,
    },
    {
      x: 6,
      y: 27,
    },
    {
      x: 7,
      y: 65,
    },
    {
      x: 9,
      y: 89,
    },
    {
      x: 10,
      y: 60,
    },
  ],
  [
    {
      x: 1,
      y: 44,
    },
    {
      x: 3,
      y: 26,
    },
    {
      x: 5,
      y: 48,
    },
    {
      x: 6,
      y: 47,
    },
    {
      x: 7,
      y: 89,
    },
    {
      x: 9,
      y: 99,
    },
    {
      x: 10,
      y: 80,
    },
  ],
]

stories.add('Line Chart', () => (
  <LineChart
    data={lineData}
  />
));


const stackData = [
  {
    site: 0,
    app: 0,
  },
  {
    site: 2,
    app: 5,
  },
  {
    site: 3,
    app: 6,
  },
  {
    site: 7,
    app: 2,
  },
  {
    site: 1,
    app: 1,
  },
  {
    site: 8,
    app: 4,
  },
  {
    site: 9,
    app: 5,
  },
  {
    site: 10,
    app: 6,
  },
  {
    site: 6,
    app: 7,
  },
  {
    site: 9,
    app: 8,
  },
]

stories.add('Stackarea Chart', () => (
  <StackAreaChart
    keys={['site', 'app']}
    data={stackData}
  />
));
