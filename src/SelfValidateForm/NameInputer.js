import React from 'react';

const NameIputer = React.createClass({

  validator: null,

  getDefaultProps() {
    return {
      registerValidator: ()=>{},
    };
  },

  componentDidMount() {
    this.validator = this.props.registerValidator('Name cannot be empty');
  },

  componentWillUnmount() {
    this.validator.remove();
  },

  getInitialState() {
    return {
      value: '',
      validateMsg: 'Name cannot be empty',
    };
  },

  updateValidateMsg(msg){
    this.validator(msg)
    this.setState({validateMsg: msg||''})
  },

  validate(value){
    if(value === ''){
      this.updateValidateMsg('Name cannot be empty');
    }
    else if(value === 'foo'){
      this.updateValidateMsg('"foo" has already be used.');
    }
    else{
      this.updateValidateMsg(null)
    }
  },

  update(e){
    this.setState({value: e.target.value });
    this.validate(e.target.value);
  },

  render(){
    const {state} = this;
    const {value, validateMsg} = state;

    return (
      <div className="vertical-input-group">
        <div className="label">
          Name
        </div>
        <div className="input-wrap">
          <input
            className="input"
            type="text"
            placeholder="try to use 'foo' as name"
            value={value}
            onChange={this.update}
          />
          <div className="text validate-msg">
            {validateMsg}
          </div>
        </div>
      </div>
    );
  }

});

export default NameIputer;
