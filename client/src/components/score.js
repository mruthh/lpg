import React from 'react';
import { connect } from "react-redux";


class Score extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUpdate(){
    this.score.className = '';
  }

  componentDidUpdate(prevProps){
    if (this.props.game.score && prevProps.game.score !== this.props.game.score) {
      this.score.className = 'animated pulse';
    }
  }

  renderScore() {
    let score = this.props.game.score.toString();
    while (score.length < 6) {
      score = '0' + score;
    }
    return score;
  }

  render() {
    return (
      <div className="text-center">
        <h1 ref={(score) => { this.score = score; }}>{this.renderScore()}</h1>
      </div>
    );

  }
}

function mapStateToProps(state) {
  return { game: state.game }
}

export default connect(mapStateToProps)(Score);