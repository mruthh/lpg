import React from 'react';
import { connect } from "react-redux";

const Score = (props) => {

  const renderScore = (props) => {
    let score = props.game.score.toString();
    while (score.length < 6) {
      score = '0' + score;
    }
    return score;
  }

  return (
    <div className="row">
      <div className="col-md-12 text-center">
        <h1>{renderScore(props)}</h1>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return { game: state.game }
}

export default connect(mapStateToProps)(Score);