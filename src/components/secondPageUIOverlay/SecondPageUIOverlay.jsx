import React, { Component } from "react";
import TopLeftHistory from "./TopLeftHistory.jsx";
import CountdownTimer from "./CountdownTimer.jsx";
import BottomLeftDisplayRows from "./BottomLeftDisplayRows.jsx";
import ChipHolder from "./ChipHolder.jsx";
import BottomRightButtons from "./BottomRightButtons.jsx";
import TopRightMenu from "./TopRightMenu.jsx";
import "../../css/secondPageUIOverlay/SecondPageUIOverlay.css";
import placeBet from "../../assets/backgroundTwo/countdownTimer/start-bet.png";
import stopBet from "../../assets/backgroundTwo/countdownTimer/stop-bet.png";
import halt from "../../assets/backgroundTwo/countdownTimer/halt.png";
import {
  placeBetDuration,
  timeInbetweenCountdowns
} from "../../utils/constants";

class SecondPageUIOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChip: 0,
      isChipActive: false,
      totalBet: 0,
      balance: 1000000,
      time: placeBetDuration,
      timerText: placeBet,
      timerRunning: true
    };

    window.addEventListener("placeBet", () => {
      this.setState(function(prevState) {
        return {
          totalBet: prevState.totalBet + prevState.selectedChip
        };
      });
    });
  }

  componentDidMount() {
    var interval = 1000; // ms
    //var expected = Date.now() + interval;
    this.first = true;
    let expected;

    const step = () => {
      if (this.first) {
        expected = Date.now();
      }
      this.first = false;
      var dt = Date.now() - expected; // the drift (positive for overshooting)
      if (dt > interval) {
        // something really bad happened. Maybe the browser (tab) was inactive?
        // possibly special handling to avoid futile "catch up" run
      }

      this.setState(function(prevState) {
        if (prevState.time >= 2) {
          return { time: prevState.time - 1 };
        } else if (prevState.time === 1) {
          return { time: prevState.time - 1, timerText: stopBet };
        } else if (prevState.time === 0) {
          setTimeout(() => {
            //restart timer
            this.setState({
              time: placeBetDuration,
              timerRunning: true,
              timerText: placeBet,
              totalBet: 0
            });
            this.first = true;
            setTimeout(step, interval);
            //clear all chips on table once the timer restarts
            const event = new CustomEvent("clearAllChips");
            window.dispatchEvent(event);
          }, timeInbetweenCountdowns);
          // this.props.showCardModal();
          const event = new CustomEvent("displayingResult");
          window.dispatchEvent(event);
          return {
            time: prevState.time,
            timerText: halt,
            timerRunning: false,
            isChipActive: false,
            chipAmount: 0
          };
        }
      });

      expected += interval;
      //if the condition is already halt, stop settimeout
      if (this.state.timerRunning) {
        setTimeout(step, Math.max(0, interval - dt)); // take into account drift
      }
    };
    setTimeout(step, interval);
  }

  selectChip = e => {
    if (!this.state.timerRunning) {
      return;
    }
    const chipAmount = parseInt(e.target.className.split(" ")[1]);

    let chipActive;
    //if chip amounts are different(before & after) then make the chip active,
    //otherwise they selected the same chip, make it inactive
    if (chipAmount !== this.state.selectedChip) {
      chipActive = true;
    } else {
      chipActive = !this.state.isChipActive;
    }

    const event = new CustomEvent("chipSelected", {
      detail: {
        chipAmount,
        isChipActive: chipActive
      }
    });
    this.setState(function(prevState) {
      return {
        selectedChip: chipAmount,
        isChipActive: chipActive
      };
    });

    window.dispatchEvent(event);
  };

  mouseEntersUI = () => {
    const event = new CustomEvent("pointerEntersUI");
    window.dispatchEvent(event);
  };

  mouseLeavesUI = () => {
    const event = new CustomEvent("pointerLeavesUI");
    window.dispatchEvent(event);
  };

  clearAllChips = () => {
    const event = new CustomEvent("clearAllChips");
    window.dispatchEvent(event);
    this.setState({
      totalBet: 0,
      selectedChip: 0,
      isChipActive: false
    });
  };

  setTimer = time => {
    this.setState({ time });
  };

  render() {
    return (
      <div className="full-page-UI-overlay">
        <TopLeftHistory
          mouseEntersUI={this.mouseEntersUI}
          mouseLeavesUI={this.mouseLeavesUI}
        />
        <CountdownTimer
          mouseEntersUI={this.mouseEntersUI}
          mouseLeavesUI={this.mouseLeavesUI}
          time={this.state.time}
          timerText={this.state.timerText}
          // showCardModal={this.props.showCardModal}
          setTimer={this.setTimer}
        />
        <BottomLeftDisplayRows
          mouseEntersUI={this.mouseEntersUI}
          mouseLeavesUI={this.mouseLeavesUI}
          totalBet={this.state.totalBet}
          balance={this.state.balance}
        />
        <ChipHolder
          selectedChip={this.state.selectedChip}
          isChipActive={this.state.isChipActive}
          selectChip={this.selectChip}
          timerRunning={this.timerRunning}
          mouseEntersUI={this.mouseEntersUI}
          mouseLeavesUI={this.mouseLeavesUI}
        />
        <BottomRightButtons
          mouseEntersUI={this.mouseEntersUI}
          mouseLeavesUI={this.mouseLeavesUI}
          clearAllChips={this.clearAllChips}
        />
        <TopRightMenu
          showHistoryModal={this.props.showHistoryModal}
          mouseEntersUI={this.mouseEntersUI}
          mouseLeavesUI={this.mouseLeavesUI}
        />
      </div>
    );
  }
}

export default SecondPageUIOverlay;
