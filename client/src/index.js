import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import reducers from "./reducers";
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import Puzzle from './components/puzzle';
import GameAssets from './components/game-assets';
import StartScreen from './components/start-screen';
import HistoryBar from './components/history-bar';
import DetailView from './components/detail-view';
import ChartLength from './components/chart-length';
import Score from './components/score';
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const store = createStoreWithMiddleware(reducers);

const App = () => {
  return (
    <div>
    <nav class="navbar navbar-light bg-light">
      {/* <a class="navbar-brand" href="#">The License Plate Game</a> */}
    </nav>
    <nav class="navbar navbar-light bg-light">
      <span class="navbar-brand mb-0 h1">The License Plate Game</span>
    </nav>
    <div className="container bg-light mt-5 pt-5 pb-5 border rounded">
      <Switch>
        <Route path="/chart" component={ChartLength} />
        <Route exact path="/" component={StartScreen} />
        <Route path="/game/">
          <div className="row">
            <div className="col-md-4">
              <HistoryBar />
            </div>
            <div className="col-md-4 border-left border-right border-dark">
              <Score />
              <Puzzle />
            </div>
            <div className="col-md-4">
              <GameAssets />
            </div>
          </div>
        </Route>
        <Route path="/detail-view">
          <DetailView />
        </Route>
      </Switch>
    </div>
    </div>
  )
}


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

