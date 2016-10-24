import React from 'react';
import { fromJS } from 'immutable';
import { storiesOf, action } from '@kadira/storybook';

import MultiSelector from './MultiSelector.js';

const stories = storiesOf('MultiSelector', module);

stories.add('Default', () => {

  const options = [
    {
      key : 'foo',
      label : 'FOO',
    },
    {
      key : 'bar',
      label : 'BAR',
    },
    {
      key : 'baz',
      label : 'BAZ',
    },
    {
      key : 'foobar',
      label : 'FOO-BAR',
    },
    {
      key : 'barbaz',
      label : 'BAR-BAZ',
    },
    {
      key : 'bazfoo',
      label : 'BAZ-FOO',
    },
  ];

  const Host = React.createClass({

    getInitialState() {
      return {
        value: ['foo'],
      };
    },

    onChange(value) {
      this.setState({value})
    },

    render() {
      return (
        <MultiSelector
          style={{width: '400px'}}
          options={options}
          value={this.state.value}
          onChange={this.onChange}
        />
      );
    },
  });

  return <Host />;
});


stories.add('Long List', () => {
  const options = [];
  for(let i = 0; i < 100; i++){
    options[i] = {
      key: i,
      label: i,
    }
  }
  const Host = React.createClass({

    getInitialState() {
      return {
        value: [],
      };
    },

    onChange(value) {
      this.setState({value})
    },

    render() {
      return (
        <MultiSelector
          options={options}
          value={this.state.value}
          onChange={this.onChange}
        />
      );
    },
  });

  return <Host />
});


