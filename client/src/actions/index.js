export const ADJUST_TIME = "adjust_time";
export const SET_TIME = "set_time";
export const MOVE_TO_NEXT_LICENSE_PLATE = "move_to_next_license_plate";

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

export function moveToNextLicensePlate(guess){
  return {
    type: MOVE_TO_NEXT_LICENSE_PLATE,
    payload: guess
  }
}
