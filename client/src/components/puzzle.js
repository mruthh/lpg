//shows the active license plate
//current license plate needs to know its index in license plates array
//needs to know where we are in licensePlates array

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { adjustTime, setTime, fetchLicensePlates, moveToNextLicensePlate } from '../actions';


class Puzzle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputWord: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
  }

  componentDidMount() {
    this.props.fetchLicensePlates(this.props.settings.gameSize)
    this.props.setTime(this.props.settings.maxTime);
    this.countdown = setInterval(this.props.adjustTime, 1000, -1000)
  }


  componentDidUpdate(prevProps) {
    //clearInterval if time has reached zero
    if (this.props.game.remainingTime === 0) {
      clearInterval(this.countdown);
    }
  }

  handleInputChange(event) {
    this.setState({ inputWord: event.target.value })
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let sanitizedInputWord = this.state.inputWord.toLowerCase();
    let currentLicensePlate = this.props.game.currentLicensePlate;
    if (currentLicensePlate.solutions.find( (solution) => {
      return solution.word._id === sanitizedInputWord
    }) ) {
      this.props.moveToNextLicensePlate({
        licensePlate: currentLicensePlate,
        guess: sanitizedInputWord
      });
    } else {
      this.setState({ inputWord: 'Nope' })
    }
    //check if this.state.inputWord matches an array item in current license plate
    //if so, grab next word
    //else, show error (generic for now)
  }

  handleSkip(event){
    event.preventDefault();
    this.props.moveToNextLicensePlate({
      licensePlate: this.props.game.currentLicensePlate,
      guess: ''
    });
  }
  render() {
    if (!this.props.game.currentLicensePlate) return null;
    return (
      <div>
        <h1>{this.props.game.currentLicensePlate._id.toUpperCase()}</h1>
        <form>
          <input type="text"
            value={this.state.inputWord}
            onChange={this.handleInputChange}
            disabled={this.props.settings.time === 0}
          />
          <button onClick={this.handleSkip}>Skip</button>
        <button onClick={this.handleFormSubmit}>Solve</button>
        </form>
      </div >
    )
  }
}

function mapStateToProps(state) {
  return {
    game: state.game,
    settings: state.settings
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ adjustTime, setTime, fetchLicensePlates, moveToNextLicensePlate }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Puzzle);