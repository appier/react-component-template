import React from 'react';

const NumberInputer = React.createClass({

  validator: null,

  timer: null,

  getDefaultProps() {
    return {
      registerValidator: ()=>{},
    };
  },

  componentDidMount() {
    this.validator = this.props.registerValidator('Number cannot be empty');
  },

  componentWillUnmount() {
    this.validator.remove();
  },

  getInitialState() {
    return {
      value: '',
      validateMsg: 'Number cannot be empty',
    };
  },

  updateValidateMsg(msg){
    this.validator(msg)
    this.setState({validateMsg: msg||''})
  },

  validate(value){
    //Do some async validate ...
    this.updateValidateMsg('Validating Number ...');
    clearTimeout(this.timer);
    this.timer = setTimeout(()=>{
      if(value === ''){
        this.updateValidateMsg('Number cannot be empty');
      }
      else if(isNaN(Number(value))){
        this.updateValidateMsg('Not a valid Number');
      }
      else if(Number(value) < 1000){
        this.updateValidateMsg('Number must >= 1000')
      }
      else{
        this.updateValidateMsg(null)
      }
    }, 200);
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
          Number
        </div>
        <div className="input-wrap">
          <input
            className="input"
            type="text"
            placeholder="try to input invalid number"
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

export default NumberInputer;
