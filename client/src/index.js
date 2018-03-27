import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import reducers from "./reducers";
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import Puzzle from './components/puzzle';
import Clock from './components/clock';
import Score from './components/score';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const store = createStoreWithMiddleware(reducers);

const App = () => {
  return (
    <div className ="container white-box w-25 mt-5 p-5">
      <Clock />
      <Puzzle />
    </div>)
}


ReactDOM.render(
<Provider store={store}>
  <App /> 
</Provider>,
  document.getElementById('root'));
