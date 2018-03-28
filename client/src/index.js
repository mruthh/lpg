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
import ChartLength from './components/chart-length'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const store = createStoreWithMiddleware(reducers);

const App = () => {
  return (
    <div className="container white-box mt-5 p-5">
      <Switch>
        <Route path="/chart" component={ChartLength} />
        <Route exact path="/" component={StartScreen} />
        <Route path="/game/">
          <div className="row">
            <div className="col-md-4">
              <HistoryBar />
            </div>
            <div className="col-md-4">
              <GameAssets />
              <Puzzle />
            </div>
          </div>
        </Route>
        <Route path="/detail-view">
          <DetailView />
        </Route>
      </Switch>
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
