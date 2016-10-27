import React from 'react';

import NameInputer from './NameInputer';
import NumberInputer from './NumberInputer';

import './Form.css';

const uuid = ()=>{
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('');
  const newId = [];
  const len = 22;
  for (let i = 0; i < len; i++) {
    newId[i] = chars[0 | Math.random() * 64];
  }
  return newId.join('');
}

const Form = React.createClass({

  getDefaultProps() {
    return {
      onSubmit: ()=>{},
    };
  },

  reigsteredValidators: {},

  registerValidator(initValue){

    let key = uuid();

    //store init value
    this.reigsteredValidators[key] = initValue;

    //validatedValue should be promise;
    let validator = (validatedValue) => {
      this.reigsteredValidators[key] = validatedValue;
    };

    //remove fn
    validator.remove = () => {
      delete this.reigsteredValidators[key];
    }
    return validator;
  },

  submit(){
    Promise.all(Object.keys(this.reigsteredValidators)).then(keys=>{
      const notValidated = keys.map(key=>this.reigsteredValidators[key]).filter(d=>!!d);
      if(notValidated.length){
        window.alert(notValidated.join('\n'))
        return;
      }
      this.props.onSubmit('Submit successfully');
    });
  },

  render(){

    return (
      <div className="rc-form">
        <NameInputer
          registerValidator={this.registerValidator}
        />
        <NumberInputer
          registerValidator={this.registerValidator}
        />

        <div className="submit-btn" onClick={this.submit}>Submit</div>
      </div>
    );
  }

});

export default Form;
