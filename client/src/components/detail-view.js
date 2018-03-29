import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import c3 from 'c3';

class DetailView extends React.Component {
  constructor(props) {
    super(props);
    this.letters = '';
    this.guess = '';
    if (this.props.lp.licensePlate) {
      this.baseSolutionsCount = props.lp.licensePlate.baseSolutionsCount;
      this.letters = props.lp.licensePlate._id;
      this.guess = props.lp.guess;
      this.solutions = props.lp.licensePlate.solutions;
    }
    this.selectGuess = this.selectGuess.bind(this);
  }
  componentDidMount() {
    this.renderChart();
  }

  calculateLengthData() {
    let lengthData = this.solutions
      .filter(solution => solution.isRoot || solution.word._id === this.guess)
      .map((solution) => {
        return [solution.word._id, solution.word._id.length]
      })
    return lengthData;
  }

  generateDefaultData() {
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

  calculateFreqData() {
    let freqData = this.solutions
      .filter(solution => solution.isRoot || solution.word._id === this.guess)
      .map((solution) => {
        return [solution.word._id + '_x', solution.word.frequency]
      })
    return freqData;
  }

  generateXs() {
    let xs = {};
    this.solutions.forEach((solution) => {
      if (solution.isRoot || solution.word._id === this.guess) {
        xs[solution.word._id] = solution.word._id + '_x';
      }
    })
    return xs;
  }
  renderStats() {
    //Solutions (root words only)
    //Total Solutions
    //Shortest
    //Longest
    //Rarest
    //Most Common

    return (
      <table class="table">
        <thead>
        <tr>
          <td className="text-center h6 table-primary" colspan="2">How Did You Do?</td>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Your Solution</strong></td>
            <td><strong>{this.renderGuess()}</strong></td>
          </tr>
          <tr>
            <td>Solutions (root only)</td>
            <td>{this.baseSolutionsCount}</td>
          </tr>
          <tr>
            <td>Total Solutions</td>
            <td>{this.solutions.length}</td>
          </tr>

        </tbody>
      </table>
    )
  }
  selectGuess(){
    this.chart.select([this.guess])
  }

  renderChart() {
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
          selection: {
            enabled: true
          },
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
          label: {
            text: 'Frequency',
            position: 'outer-center',
          },
          tick: {
            fit: false
          }
        },
        y: {
          label: 'Length',
        }
      },
      point: {
        r: 5
      }
    });
    chart.select([this.guess]);
 }

  renderGuess() {
    return this.guess
      ? <span>{this.guess.toUpperCase()}</span>
      : <span className="text-danger">skipped</span>
  }


  render() {
    if (!this.props.lp.licensePlate) return null;
    
    let solutionIsCircled = this.guess 
      ? <span className="text-center">Your solution is circled.</span>
      : null;
    return (
      <div>
          <Link to="/game/">
            <button className="btn btn-dark ml-3">Back</button>
          </Link>
        <h1 className="display-4 text-center">Stats for {this.letters.toUpperCase()}</h1>
        <div>
          <p class="h6 text-center">Each dot in the chart below is a word that solves <strong>{this.letters.toUpperCase()}</strong>. {solutionIsCircled}</p> 

          <p className="text-center">Shorter words are further down. More common words are to the right. Hover over a dot to learn more.</p>
        </div>
        <div className="float-right">{this.renderStats()}</div>
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

