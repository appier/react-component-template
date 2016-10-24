import React from 'react';
import classnames from 'classnames';

const Option = React.createClass({

  getDefaultProps() {
    return {
      currentIndex: 0,
      index: 0,
      data: {},
      selectValue: ()=>{},
      updateCurrentIndex: ()=>{},
    };
  },

  render(){
    const {props} = this;
    const {
      currentIndex,
      index,
      data,
      selectValue,
      updateCurrentIndex,
    } = props;

    return (
      <div
        className={classnames('option', {highlight: currentIndex === index})}
        onClick={()=>selectValue(data.key)}
        onMouseEnter={()=>updateCurrentIndex(index)}
      >
        <div className="value">{data.label}</div>
      </div>
    );
  }

});

export default Option;
