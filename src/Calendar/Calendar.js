import React from 'react';
import classnames from 'classnames';

import './Calendar.css';

import {
  DEFAULT_CURRENT_DATE,
  language,
  getMonthFormatted,
  monthGenegrator,
} from './util';

export default React.createClass({

  propTypes: {
    assignedMonth: React.PropTypes.string,
    assignedYear: React.PropTypes.string,
    selectedDate: React.PropTypes.object,
    availableDate: React.PropTypes.shape({
      from: React.PropTypes.object, // Date instance
      to: React.PropTypes.object, // Date instance
    }),
    highlightDates: React.PropTypes.arrayOf(React.PropTypes.object),
    onChange: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      onChange: () => {},
      onHover: () => {},
      selectedDate: undefined,
      highlightDates: [],
    };
  },

  getInitialState() {
    return {
      currentDate: DEFAULT_CURRENT_DATE,
      today: new Date(),
    };
  },

  componentWillMount() {
    this.setCurrentDateFromProps(this.props);
  },

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.assignedYear !== this.props.assignedYear ||
      nextProps.assignedMonth !== this.props.assignedMonth
    ) {
      this.setCurrentDateFromProps(nextProps);
    }
  },

  setCurrentDateFromProps(props) {
    const targetMonth = parseInt(props.assignedMonth, 10);
    const targetYear = parseInt(props.assignedYear, 10);

    if (!isNaN(targetMonth) && !isNaN(targetYear) && targetMonth >= 0 && targetMonth < 13) {
      this.setState({ currentDate: new Date(targetYear, targetMonth - 1, 1) });
    }
  },

  goPrevMonth() {
    const newCurrentDate = new Date(this.state.currentDate);
    newCurrentDate.setMonth(this.state.currentDate.getMonth() - 1, 1);
    this.setState({
      currentDate: newCurrentDate,
    });
  },

  goNextMonth() {
    const newCurrentDate = new Date(this.state.currentDate);
    newCurrentDate.setMonth(this.state.currentDate.getMonth() + 1, 1);
    this.setState({
      currentDate: newCurrentDate,
    });
  },

  selectDayEvent(dateObj) {
    const selectedDateObj = {
      year: this.state.currentDate.getFullYear(),
      month: this.state.currentDate.getMonth(),
      day: dateObj.date,
      fullDate: dateObj.fullDate,
    };
    this.props.onChange(selectedDateObj);
  },

  hoverDayEvent(dateObj) {
    if (dateObj) {
      const selectedDateObj = {
        year: this.state.currentDate.getFullYear(),
        month: this.state.currentDate.getMonth(),
        day: dateObj.date,
        fullDate: dateObj.fullDate,
      };
      this.props.onHover(selectedDateObj);
    } else {
      this.props.onHover(null);
    }
  },

  render() {
    const { state, props } = this;
    const {
      currentDate,
      today,
    } = state;

    const {
      selectedDate,
      availableDate,
      highlightDates,
    } = props;

    const monthObj = monthGenegrator(availableDate, highlightDates)(currentDate, today);

    const selectedDateObj = selectedDate ? {
      day: selectedDate.getDate(),
      month: selectedDate.getMonth(),
      year: selectedDate.getFullYear(),
    } : null;

    const $month = monthObj.map((week, i) => {
      const $week = week.map((day, j) => {
        const dateCx = classnames({
          'cal-month-day': true,
          'cal-day-outmonth': day.outmonth,
          'cal-day-weekend': day.day === 6 || day.day === 7,
          'cal-day-today': day.isToday,
          notAvailable: !day.available,
          selected: selectedDateObj &&
            selectedDateObj.day === day.date &&
            selectedDateObj.month === currentDate.getMonth() &&
            selectedDateObj.year === currentDate.getFullYear() &&
            !day.outmonth,
          highlighted: day.highlighted,
        });
        return (
          <div className="cal-span cal-cell" key={j}>
            <div
              className={dateCx}
              onClick={()=>this.selectDayEvent(day)}
              onMouseEnter={()=>this.hoverDayEvent(day)}
            >
              {day.date}
            </div>
          </div>
        );
      });
      return (
        <div className="cal-row-fluid cal-week" key={i}>
          {$week}
        </div>
      );
    });

    return (
      <div className="rc-calendar">
        <div className="clearfix calendarHeader row">
          <div className="nav-btn prev" onClick={this.goPrevMonth}>
            <svg
              className="arrow-left arrow-icon"
              x="0px" y="0px"
              width="14px" height="14px"
              viewBox="0 0 199.404 199.404"
            >
              <g>
                <polygon points="135.412,0 35.709,99.702 135.412,199.404 163.695,171.119 92.277,99.702 163.695,28.285" />
              </g>
            </svg>
          </div>
          <div className="date">
            {getMonthFormatted(currentDate)} &nbsp;&nbsp; {currentDate.getFullYear()}
          </div>
          <div className="nav-btn next" onClick={this.goNextMonth}>
            <svg
              className="arrow-right arrow-icon"
              x="0px" y="0px"
              width="14px" height="14px"
              viewBox="0 0 199.404 199.404"
            >
              <g>
                <polygon points="63.993,199.404 163.695,99.702 63.993,0 35.709,28.285 107.127,99.702 35.709,171.119" />
              </g>
            </svg>
          </div>
        </div>
        <div className="cal-row-fluid cal-row-head">
          <div className="cal-span">{language.d1}</div>
          <div className="cal-span">{language.d2}</div>
          <div className="cal-span">{language.d3}</div>
          <div className="cal-span">{language.d4}</div>
          <div className="cal-span">{language.d5}</div>
          <div className="cal-span">{language.d6}</div>
          <div className="cal-span">{language.d0}</div>
        </div>
        <div className="cal-month-box">
          {$month}
        </div>
      </div>
    );
  },
});
