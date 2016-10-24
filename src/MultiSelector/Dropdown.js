import React from 'react';

import Option from './Option';

const Dropdown = React.createClass({

  getDefaultProps() {
    return {
      options: [],
      selectValue: ()=>{},
      updateCurrentIndex: ()=>{},
    };
  },

  componentDidMount() {
    window.document.addEventListener('keyup', this.handleDoucmenKeyEvent);
  },

  componentWillUnmount() {
    window.document.removeEventListener('keyup', this.handleDoucmenKeyEvent);
  },

  getInitialState() {
    return {
      currentIndex: 0,
    };
  },

  handleDoucmenKeyEvent(e){
    const {keyCode} = e;

    const {
      currentIndex,
    } = this.state;

    const {
      selectValue,
      options,
    } = this.props;

    let newIndex = currentIndex;
    if(keyCode >= 38 && keyCode <= 40){
      if(keyCode === 38){
        newIndex--;
      }
      else if(keyCode === 40){
        newIndex++;
      }
      if(newIndex < 0){
        newIndex = 0;
      }
      if(newIndex >= options.length){
        newIndex = options.length-1;
      }
      this.setState({
        currentIndex: newIndex,
      })
    }
    else if(keyCode === 13){
      selectValue(options[currentIndex].key);
      if(currentIndex == options.length-1){
        this.setState({
          currentIndex: currentIndex-1,
        })
      }
    }
  },

  updateCurrentIndex(currentIndex){
    this.setState({currentIndex})
  },

  render(){
    const {state, props} = this;
    const { currentIndex } = state;
    const {
      options,
      selectValue,
    } = props;

    return (
      <div className="dropdown-wrap">
        <div className="menu">
          {
            options.map((d, i)=>{
              return (
                <Option
                  currentIndex={currentIndex}
                  index={i}
                  key={d.key}
                  data={d}
                  selectValue={selectValue}
                  updateCurrentIndex={this.updateCurrentIndex}
                />
              )
            })
          }
        </div>
      </div>
    );
  }

});

export default Dropdown;
