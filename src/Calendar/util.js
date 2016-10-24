export const DEFAULT_CURRENT_DATE = new Date();
DEFAULT_CURRENT_DATE.setDate(1);

export const language = {
  ms0: 'January',
  ms1: 'February',
  ms2: 'March',
  ms3: 'April',
  ms4: 'May',
  ms5: 'June',
  ms6: 'July',
  ms7: 'August',
  ms8: 'September',
  ms9: 'October',
  ms10: 'November',
  ms11: 'December',

  d0: 'Su',
  d1: 'Mo',
  d2: 'Tu',
  d3: 'We',
  d4: 'Th',
  d5: 'Fr',
  d6: 'Sa',

  thisMonth: 'This month',
  prevMonth: 'Prev',
  nextMonth: 'Next',
};

export const getMonthFormatted = (date) => {
  return language[`ms${date.getMonth()}`];
};

export const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

export const stringifyDay = (date) => {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

// month between 1 ~ 12
export const monthGenegrator = (availableDate, highlightDates) => (currentDate, today) => {

  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const monthArray = [];
  const firstDay = new Date(year, month - 1, 1, 0, 0, 0, 0);
  //  weekDay between 1 ~ 7 , 1 is Monday, 7 is Sunday
  const firstDayInFirstweek = (firstDay.getDay() > 0) ? firstDay.getDay() : 7;
  const daysOfMonth = daysInMonth(month, year);
  const prevDaysOfMonth = daysInMonth(month - 1, year);

  let recordDate = 0; // record which day obj already genegrate

  // first week row
  monthArray.push(weekGenerator(availableDate, highlightDates)(year, month, recordDate - firstDayInFirstweek, daysOfMonth, prevDaysOfMonth));

  recordDate = 7 - firstDayInFirstweek;
  // loop for following week row
  while (recordDate < daysOfMonth - 1) {
    monthArray.push(weekGenerator(availableDate, highlightDates)(year, month, recordDate, daysOfMonth));
    recordDate += 7;
  }

  // set isToday
  if (currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()) {
    const atWeek = Math.ceil((today.getDate() + firstDayInFirstweek - 1) / 7) - 1;
    const atDay = (today.getDate() + firstDayInFirstweek - 2) % 7;
    monthArray[atWeek][atDay].isToday = true;
  }
  return monthArray;
};


// month between 1~12
export const weekGenerator = (availableDate, highlightDates) => (year, month, startDate, daysOfMonth, prevDaysOfMonth) => {

  const isDateHighlighted = {};
  highlightDates.forEach(date => {
    isDateHighlighted[stringifyDay(date)] = true;
  });

  const week = [];
  let realDate;
  let outmonth;
  let isBeforeMonth;
  let fullDate;
  let available;

  for (let i = 1; i <= 7; i++) {
    outmonth = false;
    available = true;

    if (startDate + i < 0) {
      realDate = prevDaysOfMonth + startDate + i + 1;
      outmonth = true;
      isBeforeMonth = true;
    } else if (startDate + i + 1 > daysOfMonth) {
      realDate = startDate + i - daysOfMonth + 1;
      outmonth = true;
      isBeforeMonth = false;
    } else {
      realDate = startDate + i + 1;
      isBeforeMonth = false;
    }

    if (outmonth && isBeforeMonth) {
      fullDate = new Date(year, month - 2, realDate);
    } else if (outmonth && !isBeforeMonth) {
      fullDate = new Date(year, month, realDate);
    } else {
      fullDate = new Date(year, month - 1, realDate);
    }

    // is available ?
    if (availableDate && availableDate.from && fullDate < availableDate.from) {
      available = false;
    }

    if (availableDate && availableDate.to && fullDate > availableDate.to) {
      available = false;
    }

    week.push({
      outmonth,
      day: i,
      date: realDate,
      available,
      fullDate,
      highlighted: isDateHighlighted[stringifyDay(fullDate)],
    });
  }
  return week;
};

