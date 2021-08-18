import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import Customer from './components/customer';

ReactDOM.render(
  <React.StrictMode>
    <Customer />
  </React.StrictMode>,
  document.getElementById('root')
);