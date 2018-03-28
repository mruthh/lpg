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
import StartScreen from './components/start-screen';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const store = createStoreWithMiddleware(reducers);

const App = () => {
  return (
    <div className="container white-box mt-5 p-5">
      <StartScreen />
       <div className="row">
          <div className="col-md-4">
          </div>
          <div className="col-md-4">
            <Clock />
            <Puzzle />
          </div>
        </div>
      </div>)
  }


  ReactDOM.render(
<Provider store={store}>
        <App />
      </Provider>,
        document.getElementById('root'));
