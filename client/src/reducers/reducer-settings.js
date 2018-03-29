import { SET_TIME } from "../actions";

const defaultSettings = {
  maxTime: 60 * 1000,
  difficulty: 'medium',
  maxSkips: 3,
  gameSize: 20
}



export default function(state = defaultSettings, action) {
  switch(action.type){
    default:{
      return state;
    }
  }
}