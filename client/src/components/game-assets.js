import React from 'react';
import { connect } from "react-redux";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faChevron from '@fortawesome/fontawesome-free-solid/faChevronCircleRight';
import faBan from '@fortawesome/fontawesome-free-solid/faBan';

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
    const skipStyle = {
      color: '#54cabe'
    };
    const emptySkipStyle = {
      color: '#f6815e'
    };
    let singleSkip = <FontAwesomeIcon icon={faChevron} style={skipStyle}/>;
    let emptySkip = <FontAwesomeIcon icon={faBan} style={emptySkipStyle}/>
    for (let i = 0; i < props.settings.maxSkips; i++) {
      let remainingSkips = props.game.remainingSkips;
      if (remainingSkips > i) {
        skips.unshift(<span key={i}> {singleSkip} </span>);
      } else {
        skips.unshift(<span key={i}> {emptySkip} </span>);
      }

    }
    return skips;
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
        <p className="float-left display-4">Skips:</p> <span className="float-right fa-2x">{renderSkips(props)}</span>
        </div>
      </div>
      </div>
      )
  }
  
function mapStateToProps(state){
  return {game: state.game, settings: state.settings }
    }
    
export default connect(mapStateToProps)(GameAssets);