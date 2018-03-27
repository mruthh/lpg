import React from 'react';
import { connect } from "react-redux";
import moment from 'moment';

const Clock = (props) => {
  
  const convertMilliseconds = (ms) => {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    //format seconds as string so that two digits always show
    let seconds = (totalSeconds % 60) < 10 ? `0${totalSeconds % 60}` : `${totalSeconds % 60}`
    return `${minutes}:${seconds}`
  }

  return (
      <div>{convertMilliseconds(props.settings.time)}</div>
    )
}

function mapStateToProps(state){
  return { settings: state.settings }
}

export default connect(mapStateToProps)(Clock);