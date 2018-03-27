import React from 'react';
import { connect } from "react-redux";

const Clock = (props) => {
  
  const convertMilliseconds = (ms) => {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    //format seconds as string so that two digits always show
    let seconds = (totalSeconds % 60) < 10 ? `0${totalSeconds % 60}` : `${totalSeconds % 60}`
    return `${minutes}:${seconds}`
  }

  return (
      <div>{convertMilliseconds(props.game.remainingTime)}</div>
    )
}

function mapStateToProps(state){
  return { game: state.game }
}

export default connect(mapStateToProps)(Clock);