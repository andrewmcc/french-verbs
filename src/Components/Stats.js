import React, { Component } from 'react'

class Stats extends Component {
  render() {
    var percentage;
    if(this.props.totalAnswered === 0) {
      percentage = 0;
    } else {
      percentage = Math.round((this.props.totalCorrect / this.props.totalAnswered) * 100);
    }
    return (
      <div id="stats-view">
        <p className="stats">{this.props.totalCorrect} / {this.props.totalAnswered} ({percentage}%)</p>
        <p className="streak">Streak: {this.props.streak}</p>
      </div>
    );
  }
}

Stats.defaultProps = {
  totalAnswered: 0,
  totalCorrect: 0,
  streak: 0
}

export default Stats
