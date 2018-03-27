import React from 'react';
import { connect } from "react-redux";

const Score = (props) => {
  
   return (
      <div>lol I'm a score</div>
    )
}

function mapStateToProps(state){
  return { game: state.game }
}

export default connect(mapStateToProps)(Score);