import React from 'react';
import { connect } from "react-redux";
import AnimateOnChange from 'react-animate-on-change';

const Score = (props) => {



  const renderScore = (props) => {
    let score = props.game.score.toString();
    while (score.length < 6) {
      score = '0' + score;
    }
    return score;
  }

  return (

    <AnimateOnChange
      baseClassName="score"
      animationClassName="score-bounce"
      animate={props.game.scoreDiff != 0}>
      Score: {props.game.score}
      <h1 className="display-4">{renderScore(props)}</h1>
      <div className="row">
        <div className="col-md-12 text-center">
        </div>
      </div>
    </AnimateOnChange>
  )
}

function mapStateToProps(state) {
  return { game: state.game }
}

export default connect(mapStateToProps)(Score);