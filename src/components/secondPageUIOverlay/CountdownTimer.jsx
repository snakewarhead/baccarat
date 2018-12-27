import React, { Component } from "react";
import "../../css/secondPageUIOverlay/CountdownTimer.css";

import zero from "../../assets/backgroundTwo/countdownTimer/0.png";
import one from "../../assets/backgroundTwo/countdownTimer/1.png";
import two from "../../assets/backgroundTwo/countdownTimer/2.png";
import three from "../../assets/backgroundTwo/countdownTimer/3.png";
import four from "../../assets/backgroundTwo/countdownTimer/4.png";
import five from "../../assets/backgroundTwo/countdownTimer/5.png";
import six from "../../assets/backgroundTwo/countdownTimer/6.png";
import seven from "../../assets/backgroundTwo/countdownTimer/7.png";
import eight from "../../assets/backgroundTwo/countdownTimer/8.png";
import nine from "../../assets/backgroundTwo/countdownTimer/9.png";

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const map = [zero, one, two, three, four, five, six, seven, eight, nine];
    const leftDigit = Math.floor(this.props.time / 10);
    const rightDigit = this.props.time % 10;

    return (
      <div
        className="countdown-timer-container"
        onMouseEnter={this.props.mouseEntersUI}
        onMouseLeave={this.props.mouseLeavesUI}
      >
        <div className="countdown-timer">
          <img src={map[leftDigit]} alt="" />
          <img src={map[rightDigit]} alt="" />
        </div>
        <div className="timer-condition">
          <img src={this.props.timerText} alt="" />
        </div>
      </div>
    );
  }
}

export default CountdownTimer;
