import { ADJUST_TIME, SET_TIME } from "../actions";

const defaultSettings = {
  time: 0
}



export default function(state = defaultSettings, action) {
  switch(action.type){
    case(ADJUST_TIME): {
      return Object.assign({}, state, {time: state.time + action.payload});
    }
    case(SET_TIME): {
      return {...state, time: action.payload}
    }
    default:{
      return state;
    }
  }
}