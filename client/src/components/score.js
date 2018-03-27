import React from 'react';
import { connect } from "react-redux";
import moment from 'moment';

const Score = (props) => {
  
  return (
      <div>{convertMilliseconds(props.settings.time)}</div>
    )
}

function mapStateToProps(state){
  return { settings: state.settings }
}

export default connect(mapStateToProps)(Clock);