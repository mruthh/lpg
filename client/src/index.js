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

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const store = createStoreWithMiddleware(reducers);

const App = () => {
  return (
    <div>
      <Clock />    
      <Puzzle />
    </div>)
}


ReactDOM.render(
<Provider store={store}>
  <App /> 
</Provider>,
  document.getElementById('root'));
