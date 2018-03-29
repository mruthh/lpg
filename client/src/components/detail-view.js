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
  }
  componentDidMount() {
    this.renderChart();
  }

  calculateLengthData(){
    let lengthData = this.solutions.map( (solution) => {
      return [solution.word._id, solution.word._id.length]
    })
    return lengthData;
  }

  generateDefaultData(){
    return {    
    xs: {
        dog: 'dog_l',
        doggone: 'doggone_l'
      },
        //dog, length 3, frequency 10
      //doggone, length 7, frequency 1
      columns: [
        ["dog_l", 3],
        ['doggone_l', 7],
        ['dog', 10],
        ['doggone', 1]
      ]
    }
    }

  calculateFreqData(){
    let freqData = this.solutions.map( (solution) => {
      return [solution.word._id + '_x', solution.word.frequency]
    })
    return freqData;
  }

  generateXs(){
    let xs = {};
    this.solutions.forEach( (solution) => {
      xs[solution.word._id] = solution.word._id  + '_x';
    })
    return xs;
  }

  renderChart(){
    const lengthData = this.calculateLengthData();
    const freqData = this.calculateFreqData();
    const chart = c3.generate({
      bindto: '#chart',
      size: {
        height: 480,
        width: 960
    },
    type: 'scatter',
      data: 
      {
        xs: this.generateXs(),

        columns: [...lengthData, ...freqData]
      },
      legend: {
        show: false
      },
      tooltip: {
        grouped: false
      },
      axis: {
        x: {
          label: 'Frequency',

          tick: {
            fit: false
          }
        },
        y: {
          label: 'Length'
        }
      },
      point: {
        r: 5
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

