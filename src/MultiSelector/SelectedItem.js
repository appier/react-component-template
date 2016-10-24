import React from 'react';

const SelectedItem = React.createClass({

  getDefaultProps() {
    return {
      selectedOptions: [],
      removeItem: ()=>{},
    };
  },

  render(){
    const {props} = this;
    const{
      selectedOptions,
      removeItem,
    } = props;

    return (
      <div className="multi-value-wrapper">
        <div className="place-holder">&nbsp;</div>
        {
          selectedOptions.map(d=>{
            return (
              <div className="value-wrap" key={d.key} onClick={()=>removeItem(d.key)}>
                <div className="value">{d.label}</div>
                <div className="remove-btn">×</div>
              </div>
            )
          })
        }
        {this.props.children}
      </div>
    );
  }

});

export default SelectedItem;
