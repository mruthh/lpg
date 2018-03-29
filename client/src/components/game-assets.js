import React from 'react';
import { connect } from "react-redux";
// import FontAwesomeIcon from '@fortawesome/react-fontawesome'
// import faChevron from '@fortawesome/fontawesome-free-solid'

const GameAssets = (props) => {

  const convertMilliseconds = (ms) => {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    //format seconds as string so that two digits always show
    let seconds = (totalSeconds % 60) < 10 ? `0${totalSeconds % 60}` : `${totalSeconds % 60}`
    return `${minutes}:${seconds}`
  }

  const renderTime = (props) => {
    if (!props.game.remainingTime || props.game.remainingTime > 10 * 1000) {
      return <h1 className="display-4 text-right">{convertMilliseconds(props.game.remainingTime)}</h1>;
    } else {
      return <h1 className="display-4 text-right text-danger">{convertMilliseconds(props.game.remainingTime)}</h1>
    }

  }

  const renderScore = (props) => {
    let score = props.game.score.toString();
    while (score.length < 6) {
      score = '0' + score;
    }
    return score;
  }

  const renderSkips = (props) => {
    let skips = [];
    let singleSkip = 'skip';
    for (let i = 0; i < props.game.remainingSkips; i++) {
      skips.push(<span key={i}> {singleSkip} </span>);
    }
    return skips.length ? skips : <span>No Skips Remaining</span>
  }
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
        <p className="display-4 float-left">Time:</p>
        {renderTime(props)}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-left">
        {renderSkips(props)}
        </div>
      </div>
      </div>
      )
  }
  
function mapStateToProps(state){
  return {game: state.game }
    }
    
export default connect(mapStateToProps)(GameAssets);