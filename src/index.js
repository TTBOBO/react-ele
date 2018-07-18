import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {ajaxGet,ajaxPost} from './api/axios'

React.ajaxGet = ajaxGet;
React.ajaxPost = ajaxPost;


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
