import React, { Component } from 'react';
import {Layout,Menu} from "element-react"
import './App.css';
import 'element-theme-default';
class App extends Component {

  onOpen(index){
	console.log(index)
  }
  onClose(index){
	console.log(index)
  }
  render() {
    return (<div style={{width:'100%',height:'100%'}}>
      		{this.props.children}
    </div>);
  }
}

export default App;
