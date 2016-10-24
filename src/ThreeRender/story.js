import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import ThreeRender from './ThreeRender.js';

const stories = storiesOf('Three', module);

stories.add('Default', () => (
  <ThreeRender />
));
