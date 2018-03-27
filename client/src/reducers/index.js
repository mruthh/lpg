import { combineReducers } from 'redux';
import settingsReducer from './reducer-settings';
import gameReducer from './reducer-game';

const rootReducer = combineReducers({
  game: gameReducer,
  settings: settingsReducer
});

export default rootReducer;