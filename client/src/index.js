import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import reducers from "./reducers";
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';

import Puzzle from './components/puzzle';
import GameAssets from './components/game-assets';
import StartScreen from './components/start-screen';
import HistoryBar from './components/history-bar';
import DetailView from './components/detail-view';
import Score from './components/score';
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const store = createStoreWithMiddleware(reducers);

const App = () => {
  return (
    <div>
    <nav className="navbar navbar-light bg-light">
    </nav>
    <nav className="navbar navbar-light bg-light">
    <Link to="/"><span className="navbar-brand mb-0 h1">The License Plate Game</span></Link>
    </nav>
    <div className="container bg-light mt-5 pt-5 pb-5 border rounded">
      <Switch>
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

