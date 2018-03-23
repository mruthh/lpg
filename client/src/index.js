import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import Puzzle from './components/puzzle';
import Clock from './components/clock';

const App = () => {
  return (
    <div>
      <Clock />    
      <Puzzle />
    </div>)
}


ReactDOM.render(
<Provider store={createStore(reducers)}>
  <App /> 
</Provider>,
  document.getElementById('root'));
