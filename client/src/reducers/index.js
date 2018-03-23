import { combineReducers } from 'redux';
import settingsReducer from './reducer-settings';
import licensePlatesReducer from './reducer-license-plates';

const rootReducer = combineReducers({
  licensePlates: licensePlatesReducer,
  settings: settingsReducer
});

export default rootReducer;