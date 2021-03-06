import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentDetailView } from '../actions';

const HistoryBar = (props) => {

  const renderHistory = (props) => {
    return props.game.history.map( (lp) => {
      //
      // let solution = lp.licensePlate.solutions.find( (solution) => {
      //   return solution.word_id === lp.guess;
      // });

      //add consecutive as a f-ing extension. this doesn't work.

      // let consecutive = solution && solution.consecutive
      //   ? <span className ="float-right text-primary">consecutive!</span>
      //   : null;

      let guess = lp.guess 
        ? <span>{lp.guess.toLowerCase()}</span>
        : <span className="text-danger">skipped</span>

      let letters = lp.licensePlate._id;

      return (
        <Link key={letters} className="link" onClick={() => {props.setCurrentDetailView(lp)}} to="/detail-view/">
          <div>
            <h3 className="d-inline">{lp.licensePlate._id.toUpperCase()}: </h3> {guess}
          </div>
        </Link>
      )
    })
    .reverse();
  }

  return (
    <div>
      <h1 className="text-bold">Guess History</h1>
      <p>Click on a guess to learn more.</p>
      {renderHistory(props)}
    </div>

  )

}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setCurrentDetailView }, dispatch)
}

function mapStateToProps(state, ownProps) {
  return {
    history: ownProps.history,
    game: state.game
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HistoryBar);