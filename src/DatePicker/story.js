import React from 'react';
import { fromJS } from 'immutable';
import { storiesOf, action } from '@kadira/storybook';

import DatePicker from './DatePicker.js';

const stories = storiesOf('DatePicker', module);
const today = new Date();

stories.add('Default', () => (
  <DatePicker />
));

stories.add('<Calendar> properties', () => (
  <DatePicker
    selectedDate={today}
    availableDate={{
      to: today,
      from: new Date(new Date(today).setDate(-90)),
    }}
    onChange={action('onChange')}
  />
));

const DemoOpen = React.createClass({
  handleClick() {
    if (this.picker) this.picker.open();
  },

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click to open date picker</button>

        <DatePicker
          ref={elem => this.picker = elem}
          selectedDate={today}
          availableDate={{
            to: today,
            from: new Date(new Date(today).setDate(-90)),
          }}
          onChange={action('onChange')}
        />
      </div>
    );
  },
});

stories.add('open()', () => <DemoOpen />);
