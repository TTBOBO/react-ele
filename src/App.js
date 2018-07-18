import React, { Component } from 'react';
import './App.css';
import Router from './router/index';
import { Provider } from 'react-redux';
import stort from './store'
class App extends Component {


  render() {
    return (
      <Provider store = {stort}>
          <Router />
      </Provider>
    
  );
  }
}

export default App;
