import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const HistoryBar = (props) => {

  const renderHistory = (props) => {
    return props.game.history.map( (lp) => {
      //
      let solution = lp.licensePlate.solutions.find( (solution) => {
        return solution.word_id === lp.guess;
      });

      //add consecutive as a f-ing extension. this doesn't work.

      // let consecutive = solution && solution.consecutive
      //   ? <span className ="float-right text-primary">consecutive!</span>
      //   : null;

      let guess = lp.guess 
        ? <span>{lp.guess.toLowerCase()}</span>
        : <span className="text-danger">skipped</span>
      return (
        <div key={lp.licensePlate._id}>
          <h3 className="d-inline">{lp.licensePlate._id.toUpperCase()}: </h3> {guess} {consecutive}
        </div>
      )
    })
    .reverse();
  }

  return (
    <div>
      <h2>Guess History</h2>
      <p>Click on a guess to learn more.</p>
      {renderHistory(props)}
    </div>

  )

}


function mapStateToProps(state) {
  return {
    game: state.game
  }
}


export default connect(mapStateToProps)(HistoryBar);