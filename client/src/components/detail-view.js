import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { adjustTime, setTime, adjustSkips, setSkips, updateScore, fetchLicensePlates, moveToNextLicensePlate, resetGame } from '../actions';
import Chart from './chart';
import c3 from 'c3';

class DetailView extends React.Component {
  constructor(props) {
    super(props);
    this.letters = '';
    this.guess = '';
    if (this.props.lp.licensePlate) {
      this.letters = props.lp.licensePlate._id;
      this.guess = props.lp.guess;
      this.solutions = props.lp.licensePlate.solutions;
    }
    // this.data = {
    //   columns: [
    //     ['data1', 30, 200, 100, 400, 150, 250],
    //     ['data2', 50, 20, 10, 40, 15, 25],
    //     ['data', 30, 200, 100, 400, 150, 250],
    //     ['dat2', 50, 20, 10, 40, 15, 25],
    //     ['daa1', 30, 200, 100, 400, 150, 250],
    //     ['dta2', 50, 20, 10, 40, 15, 25],
    //     ['ata1', 30, 200, 100, 400, 150, 250],
    //     ['sdgdata2', 50, 20, 10, 40, 15, 25],
    //     ['datsdga1', 30, 200, 100, 400, 150, 250],
    //     ['data2e', 50, 20, 10, 40, 15, 25],

    //   ]
    // };
  }
  componentDidMount() {
    this.renderChart();
  }

  calculateLengthData(){
    return this.solutions.map( (solution) => {
      return [solution.word._id, solution.word._id.length]
    });
  }

  renderChart(){
    const chart = c3.generate({
      bindto: '#chart',
      size: {
        height: 240,
        width: 480
    },
    xs: {
      //the list of words
    },
    type: 'scatter',
      data: {columns: this.calculateLengthData()},
      axis: {
        x: {
            label: 'Sepal.Width',
  
        },
        y: {
            label: 'Length'
        }
    }
    });
  }

  renderGuess() {
    return this.guess
      ? <span>{this.guess.toLowerCase()}</span>
      : <span className="text-danger">skipped</span>
  }


  render() {
    if (!this.props.lp.licensePlate) return null;
    return (
      <div>
        <div>
          <h1 className="text-center">Details for {this.letters.toUpperCase()}</h1>
        </div>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <p>Possible solutions: {this.solutions.length}</p>
            <p>Your solution: {this.renderGuess()}</p>
          </div>
        </div>
        <div className="row" id="chart">
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    lp: state.currentDetailView
  }
}

export default connect(mapStateToProps)(DetailView);

