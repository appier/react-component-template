import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Calendar from './Calendar.js';

const stories = storiesOf('Calendar', module);
const today = new Date();

stories.add('Default', () => (
  <Calendar />
));

stories.add('selectedDate & availableDate', () => (
  <Calendar
    selectedDate={new Date(new Date(today).setDate(2))}
    availableDate={{
      from: new Date(new Date(today).setDate(-3)),
      to: new Date(new Date(today).setDate(6)),
    }}
    onChange={action('onChange')}
  />
));

stories.add('onHover & onChange', () => (
  <Calendar
    onHover={action('onHover')}
    onChange={action('onChange')}
  />
));

stories.add('assignedYear/assignedMonth = 2017/3', () => (
  <Calendar
    assignedYear="2017"
    assignedMonth="3"
  />
));

stories.add('highlightDates', () => (
  <Calendar
    availableDate={{
      from: new Date(new Date(today).setDate(0)),
    }}
    highlightDates={[new Date(new Date(today).setDate(-1)), new Date(new Date(today).setDate(1))]}
  />
));
