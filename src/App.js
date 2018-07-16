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
    return (<div>123</div>);
  }
}

export default App;
