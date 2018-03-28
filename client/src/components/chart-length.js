import React from 'react';
import ReactDOM from 'react';
import { connect } from "react-redux";

import C3Chart from 'react-c3js';
import 'c3/c3.css';


const ChartLength = (props) => {

  const lengths = props.lp.licensePlate.solutions.map( (solution) => {
    return [solution.word._id, solution.word._id.length]
  });

  const lengthData = {
    columns: lengths
  };

  const LineChart = ({ data }) =>
    <C3Chart data={{ json: data}} />;

   
  const chartData = {
    line: {
      data1: [30, 20, 50, 40, 60, 50],
      data2: [200, 130, 90, 240, 130, 220],
      data3: [300, 200, 160, 400, 250, 250]
    },
    bar: {
      data1: [30, 200, 100, 400, 150, 250],
      data2: [130, 100, 140, 200, 150, 50]
    }
  };

  return <C3Chart data={ {columns: chartData.line} }/>
};

 
function mapStateToProps(state) {
  return {
    lp: state.currentDetailView
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ adjustTime, setTime, adjustSkips, setSkips, fetchLicensePlates, moveToNextLicensePlate, updateScore, resetGame }, dispatch)
// }

export default connect(mapStateToProps)(ChartLength);