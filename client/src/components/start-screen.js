import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { fetchLicensePlates } from '../actions';


const StartScreen = (props) => {
  return (
    <div className="jumbotron">
      <h1 className="display-3 text-center">The License Plate Game</h1>
      <div className="row">
        <div className="col-md-12 text-center">
          <h2 className="lead">Take three letters.</h2>
          <p className="mt-5">Find a word with...</p>
          <ul className="list-inline">
            <li className="list-inline-item">those three letters</li> 
            <li className="list-inline-item">&#8226; in that order &#8226;</li> 
            <li className="list-inline-item">not necessarily together</li>
          </ul>
          <Link className="link" to="/game/">
            <button className="btn btn-lg btn-block btn-primary text-center"> 
              {/* onClick={() => props.fetchLicensePlates(props.settings.gameSize)} */}
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
