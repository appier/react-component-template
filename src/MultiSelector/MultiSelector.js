import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import './MultiSelector.css';

import SelectedItem from './SelectedItem';
import Dropdown from './Dropdown';

const MultiSelector = React.createClass({

  getDefaultProps() {
    return {
      options: [],
      value: [],
      disabled: false,
      onChange: ()=>{},
      style: {},
    }
  },

  getInitialState() {
    return {
      isMenuOpen: false,
      kw: '',
    };
  },

  componentDidMount() {
    window.document.addEventListener('keyup', this.handleDoucmenKeyEvent);
  },

  componentWillUnmount() {
    window.document.removeEventListener('click', this.handleDoucmentClickEvent);
    window.document.removeEventListener('keyup', this.handleDoucmenKeyEvent);
  },

  handleDoucmentClickEvent(e){
    if(this.root){
      const contains = this.root.contains(e.target);
      if (!contains) {
        window.document.removeEventListener('click', this.handleDoucmentClickEvent);
        this.closeMenu();
        this.focus = false;
      }
    }
  },

  handleDoucmenKeyEvent(e){
    const {keyCode} = e;
    const {value} = this.props;
    const {kw} = this.state;
    if(keyCode === 8 && this.focus && value.length){
      if(!this.ableToDelete){
        this.ableToDelete = true;
      }
      else{
        this.removeItem(value[value.length-1]);
      }
    }
  },

  changeHandler(value){
    //avoid handleClickInputWrap break;
    setTimeout(()=>{
      this.props.onChange(value);
      this.setState({kw: ''});
    }, 0);
  },

  removeItem(key){
    const { value } = this.props;
    this.changeHandler(value.filter(d=> d !== key));
  },

  handleClickInputWrap(e){
    //click on arrow btn
    if(this.focus && e.target === this.arrowBtn){
      this.closeMenu();
      this.focus = false;
      return;
    }

    this.focus = true;
    if(this.input){
      this.input.focus();
    }
    this.openMenu();
    window.document.addEventListener('click', this.handleDoucmentClickEvent);
  },


  openMenu(){
    this.setState({
      isMenuOpen: true,
    });
  },

  closeMenu(){
    this.setState({
      isMenuOpen: false,
    });
  },

  selectValue(key){
    const {
      value,
      onChange,
    } = this.props;
    value.push(key);
    this.changeHandler(value);
  },

  updateKw(e){
    const {value} = e.target;
    this.setState({kw: value});
    this.ableToDelete = false;
  },

  render() {
    const {state, props} = this;
    const {
      kw,
      isMenuOpen,
      currentIndex,
    } = state;

    const {
      style,
      value,
      options,
      disabled,
    } = props;

    const not = fn => d => !fn(d);
    const selectPredicate = d => value.indexOf(d.key)>-1;

    // const selectedOptions = options.filter(selectPredicate);
    const selectedOptions = value.map(d=>{
      return options.filter(dd => dd.key === d)[0];
    });

    let availableOptions = options.filter(not(selectPredicate));
    if(kw !== ''){
      availableOptions = availableOptions.filter(d=> {
        return String(d.key).toLowerCase().indexOf(kw)>=0 || String(d.label).toLowerCase().indexOf(kw)>=0
      })
    }

    return (
      <div className="rc-multi-selector" style={style||{}} ref={(el)=>this.root = el}>
        <div className="input-wrap" onClick={this.handleClickInputWrap}>
          <SelectedItem
            selectedOptions={selectedOptions}
            removeItem={this.removeItem}
          >
            <input
              ref={(el)=>this.input = el}
              type="text"
              value={kw}
              onChange={this.updateKw}
            />
          </SelectedItem>
          <div className="arrow-btn" ref={(el)=>this.arrowBtn = el}>
            <div className="arrow"></div>
          </div>
        </div>
        {
          isMenuOpen && availableOptions.length ? (
            <Dropdown
              options={availableOptions}
              currentIndex={currentIndex}
              selectValue={this.selectValue}
            />
          ) : null
        }
      </div>
    );
  }
});

export default MultiSelector;