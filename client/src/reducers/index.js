import { combineReducers } from 'redux';
import settingsReducer from './reducer-settings';
import gameReducer from './reducer-game';
import currentDetailViewReducer from './reducer-current-detail-view';

const rootReducer = combineReducers({
  game: gameReducer,
  settings: settingsReducer,
  currentDetailView: currentDetailViewReducer
});

export default rootReducer;