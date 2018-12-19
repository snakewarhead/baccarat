import React, { Component } from "react";
import "../../css/secondPageUIOverlay/CountdownTimer.css";
import startBet from "../../assets/backgroundTwo/countdownTimer/start-bet.png";
import stopBet from "../../assets/backgroundTwo/countdownTimer/stop-bet.png";
import halt from "../../assets/backgroundTwo/countdownTimer/halt.png";
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

    this.state = {
      time: this.props.time,
      condition: startBet
    };
  }

  componentDidMount() {
    var interval = 1000; // ms
    var expected = Date.now() + interval;

    const step = () => {
      var dt = Date.now() - expected; // the drift (positive for overshooting)
      if (dt > interval) {
        // something really bad happened. Maybe the browser (tab) was inactive?
        // possibly special handling to avoid futile "catch up" run
      }

      this.setState(function(prevState) {
        if (prevState.time >= 2) {
          return { time: prevState.time - 1 };
        } else if (prevState.time === 1) {
          return { time: prevState.time - 1, condition: stopBet };
        } else if (prevState.time === 0) {
          this.props.showCardModal();
          return { time: prevState.time, condition: halt };
        }
      });

      expected += interval;
      //if the condition is already halt, stop settimeout
      if (this.state.time >= 0 && this.state.condition !== halt) {
        setTimeout(step, Math.max(0, interval - dt)); // take into account drift
      }
    };
    setTimeout(step, interval);
  }

  render() {
    const map = [zero, one, two, three, four, five, six, seven, eight, nine];
    const leftDigit = Math.floor(this.state.time / 10);
    const rightDigit = this.state.time % 10;

    return (
      <div
        className="countdown-timer-container"
        onMouseEnter={this.props.mouseEntersUI}
        onMouseLeave={this.props.mouseLeavesUI}
      >
        <div className="countdown-timer">
          <img src={map[leftDigit]} />
          <img src={map[rightDigit]} />
        </div>
        <div className="timer-condition">
          <img src={this.state.condition} alt="" />
        </div>
      </div>
    );
  }
}

export default CountdownTimer;
