import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { fetchLicensePlates } from '../actions';


const StartScreen = (props) => {
  return (
    <div className="jumbotron">
      <h1 className="display-4 text-center">The License Plate Game</h1>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <p className="lead">Take three letters.</p>
          <p>Find a word with...</p>
          <ol>
            <li>those three letters</li> <li>in that order</li> <li>not necessarily together</li>
          </ol>
          <Link className="link" to="/game/">
            <button className="btn btn-lg btn-block text-center" onClick={() => props.fetchLicensePlates(props.settings.gameSize)}>
              Start Game
            </button>
          </Link>
        </div>

      </div>
      <div className="row">

      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    game: state.game,
    settings: state.settings
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchLicensePlates }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);
