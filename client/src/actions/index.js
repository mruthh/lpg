import axios from 'axios';

export const ADJUST_TIME = "adjust_time";
export const SET_TIME = "set_time";
export const FETCH_LICENSE_PLATES = "fetch_license_plates";
export const MOVE_TO_NEXT_LICENSE_PLATE = "move_to_next_license_plate";


const ROOT_URL = 'http://localhost:8000';

export function adjustTime(changeAmount){
  return {
    type: ADJUST_TIME,
    payload: changeAmount 
  }
}

export function setTime(timeAmount){
  return {
    type: SET_TIME,
    payload: timeAmount
  }
}

export function fetchLicensePlates(gameSize) {
  const request = axios.get(`${ROOT_URL}/api/licensePlates?gamesize=${gameSize}`);
  return {
    type: FETCH_LICENSE_PLATES,
    payload: request
  }
}

export function moveToNextLicensePlate(guess){
  return {
    type: MOVE_TO_NEXT_LICENSE_PLATE,
    payload: guess
  }
}
