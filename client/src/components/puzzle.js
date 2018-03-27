//shows the active license plate
//current license plate needs to know its index in license plates array
//needs to know where we are in licensePlates array

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { adjustTime, setTime, adjustSkips, setSkips, fetchLicensePlates, moveToNextLicensePlate } from '../actions';


class Puzzle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputWord: '',
      error: '',
      bonuses: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
    this.error = null;
  }

  componentDidMount() {
    this.props.fetchLicensePlates(this.props.settings.gameSize);
    this.props.setSkips(this.props.settings.maxSkips);
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
    this.setState({ error: '' })
    let sanitizedInputWord = this.state.inputWord.toLowerCase();
    let currentLicensePlate = this.props.game.currentLicensePlate;
    if (currentLicensePlate.solutions.find((solution) => {
      return solution.word._id === sanitizedInputWord
    })) {
      this.props.moveToNextLicensePlate({
        licensePlate: currentLicensePlate,
        guess: sanitizedInputWord
      });
      this.setState({ inputWord: '' })
    } else {
      this.setState({ error: 'Not a valid solution.' })
    }
    this.wordInput.focus()
    //check if this.state.inputWord matches an array item in current license plate
    //if so, grab next word
    //else, show error (generic for now)
  }

  handleSkip(event) {
    event.preventDefault();
    this.setState({ error: '' })
    this.props.adjustSkips(-1);
    this.props.moveToNextLicensePlate({
      licensePlate: this.props.game.currentLicensePlate,
      guess: ''
    });
    this.wordInput.focus()
    this.setState({ inputWord: '' })
  }
  renderBonuses(){
    if (this.state.bonuses.length){
      let bonuses = this.state.bonuses.map( (bonus) => {
        return <span className="text-primary text-bold"> *{bonus}*</span>
      })
    } else {
      return null;
    }
  }
  
  renderErrors() {
    if (this.state.error) {
      return (
          <div className="col-md-12 text-center text-danger">
            {this.state.error}
          </div>
      )
    } else {
      return null;
    }
  }

  render() {
    if (!this.props.game.currentLicensePlate) return null;
    const solveStyle = {
      'background-color': '#54cabe'
    };
    const skipStyle = {
      'background-color': '#f6815e'
    };



    return (
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center d-block">
            {this.props.game.currentLicensePlate._id.toUpperCase()}
            </h1>
          </div>
        {this.renderErrors()}
        <div className="col-md-12">
          <form className="w-100">
            <input className="d-block w-100 mt-2 text-center" type="text"
              value={this.state.inputWord}
              onChange={this.handleInputChange}
              disabled={this.props.settings.time === 0}
              ref={(input) => { this.wordInput = input }}
            />
            <button className="btn btn-lg float-right m-1"
              disabled={!this.props.game.remainingTime}
              style={solveStyle}
              onClick={this.handleFormSubmit}>Solve</button>
            <button className="btn btn-lg float-left m-2"
              disabled={!this.props.game.remainingTime}
              style={skipStyle}
              onClick={this.handleSkip}>Skip</button>
          </form>
        </div>
      </div>
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
  return bindActionCreators({ adjustTime, setTime, adjustSkips, setSkips, fetchLicensePlates, moveToNextLicensePlate }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Puzzle);