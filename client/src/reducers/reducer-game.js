import { makeQueue } from '../oldLPG/main';
import { ADJUST_TIME, SET_TIME, FETCH_LICENSE_PLATES, MOVE_TO_NEXT_LICENSE_PLATE, ADJUST_SKIPS, SET_SKIPS, UPDATE_SCORE, RESET_GAME, RESTART_GAME } from '../actions';
import calculateScore from './calculate-score';

const defaultLicensePlates = {
  currentLicensePlate: makeQueue(1)[0],
  queue: makeQueue(25),
  history: []
};

const defaultGameState = {
  currentLicensePlate: null,
  queue: [],
  history: [],
  remainingTime: 0,
  remainingSkips: 0,
  score: 0,
  scoreDiff: 0
};

export default function (state = defaultGameState, action) {
  switch (action.type) {
    case(ADJUST_TIME): {
      return {...state, remainingTime: state.remainingTime + action.payload};
    }
    case(SET_TIME): {
      return {...state, remainingTime: action.payload}
    }
    case(ADJUST_SKIPS): {
      return {...state, remainingSkips: state.remainingSkips + action.payload}
    }
    case(SET_SKIPS): {
      return {...state, remainingSkips: action.payload}
    }
    case (FETCH_LICENSE_PLATES): {
      if (action.payload.data) {
        console.log(action.payload)
        return {
          ...state, 
          currentLicensePlate: action.payload.data[0], 
          queue: action.payload.data.slice(1)
        }
      } else {
        return state;
      }
    }
    case (MOVE_TO_NEXT_LICENSE_PLATE): {
      //move guess to history
      //TODO: group together guesses on same letters
      let newHistory = [...state.history, action.payload];

      //take first element from queue as currentlicenseplate
      let newLicensePlate = state.queue[0] || null;

      //remove first element (our new current license plate) from queue 
      let newQueue = state.queue.slice(1);

      let newState = {
        ...state,
        currentLicensePlate: newLicensePlate,
        queue: newQueue,
        history: newHistory
      }
      //shorten this when able to remove log statements.
      console.log(newState);
      return newState;
    }
    case (RESET_GAME): {
      return {...state, remainingTime: 0};
    }
    case (UPDATE_SCORE): {
      let scoreDiff = calculateScore(action.payload);
      return {
        ...state, 
        score: state.score + scoreDiff,
        scoreDiff: scoreDiff
      }
    }
    default: {
      return state;
    }
  }
}