import React from 'react';
import {select} from 'd3-selection';

const Axis = React.createClass({

  getDefaultProps() {
    return {
      axisFn: () => {},
      modifier: () => {},
      transform: '',
    };
  },

  componentDidMount() {
    this._update(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this._update(nextProps);
  },

  _update(props) {
    if (this.root) {
      const ele = select(this.root).call(props.axisFn);
      props.modifier(ele);
    }
  },

  render() {
    const { props } = this;
    return (
      <g
        className={`axis ${props.className || ''}`}
        transform={props.transform}
        ref={(el)=>this.root = el}
      />
    );
  },
});

export default Axis;
