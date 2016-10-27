import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Form from './Form.js';

const stories = storiesOf('Self validate form', module);

stories.add('Default', () => (
  <Form
    onSubmit={action('onSubmit')}
  />
));
