import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import Calendar from '../Calendar/Calendar';

import './DatePicker.css';


import {
  getDateFormat,
} from './util';

export default React.createClass({

  propTypes: {
    selectedDate: React.PropTypes.object, // date object, will pass to Calendar as well
    placeholder: React.PropTypes.string,
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    // Other stuff are directly passed to Calendar!
  },

  getDefaultProps() {
    return {
      placeholder: 'Please select date',
      selectedDate: null,
      style: {},
      className: '',
    };
  },

  componentWillUnmount() {
    window.document.removeEventListener('click', this.handleDoucmentClickEvent);
  },

  getInitialState() {
    return {
      openCalendar: false,
    };
  },

  onDateChange(...args) {
    window.document.removeEventListener('click', this.handleDoucmentClickEvent);
    this.setState({
      openCalendar: false,
    });
    if (this.props.onChange) {
      this.props.onChange(...args);
    }
  },

  handleDoucmentClickEvent(e) {
    // https://facebook.github.io/react/blog/#dom-node-refs
    const contains = ReactDOM.findDOMNode(this.refs.element).contains(e.target);
    // click dp-month or dp-year will misjudget...
    if (!contains && !e.target.classList.contains('rc-calendar')) {
      window.document.removeEventListener('click', this.handleDoucmentClickEvent);
      this.setState({
        openCalendar: false,
      });
    }
  },

  handleOpenCalendar() {
    this.setState({
      openCalendar: true,
    });
    window.document.addEventListener('click', this.handleDoucmentClickEvent);
  },

  open(){
    this.handleOpenCalendar()
  },

  render() {
    const {
      className, style, placeholder, selectedDate, ...calendarProps,
    } = this.props;

    return (
      <div className={`rc-datepick ${className}`} style={style}>
        <input
          type="text"
          value={selectedDate ? getDateFormat(selectedDate) : ''}
          onClick={this.handleOpenCalendar} onChange={()=>{}}
          placeholder={placeholder}
        />
        <div className={classnames({
          'calendar-wrap': true,
          'show': this.state.openCalendar,
        })}>
          <Calendar
            {...calendarProps}
            selectedDate={selectedDate}
            ref="element"
            onChange={this.onDateChange}
          />
        </div>
      </div>
    );
  },
});
