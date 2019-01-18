import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import TopLeftHistory from "./TopLeftHistory.jsx";
import CountdownTimer from "./CountdownTimer.jsx";
import BottomLeftDisplayRows from "./BottomLeftDisplayRows.jsx";
import ChipHolder from "./ChipHolder.jsx";
import BottomRightButtons from "./BottomRightButtons.jsx";
import TopRightMenu from "./TopRightMenu.jsx";
import CardActions from "../CardActions.jsx";
import "../../css/secondPageUIOverlay/SecondPageUIOverlay.css";
import placeBet from "../../assets/backgroundTwo/countdownTimer/start-bet.png";
import stopBet from "../../assets/backgroundTwo/countdownTimer/stop-bet.png";
import halt from "../../assets/backgroundTwo/countdownTimer/halt.png";
import betConfirmed from "../../assets/backgroundTwo/betConfirmed.png";
import {
  placeBetDuration,
  timeInbetweenCountdowns,
  betConfirmBannerDuration
} from "../../utils/constants";
import { getCards } from "../../utils/api.js";
import CardAnimation from "../CardAnimation.jsx";

const preloadImgArr = new Array(50).fill(0);

const emptyBetDetail = [[], [], [], [], [], []];

class SecondPageUIOverlay extends Component {
  constructor(props) {
    super(props);
    // confirmedBetDetailPerLocation is a snapshot of betDetailPerLocation when the user clicks on confirm bet
    this.state = {
      selectedChip: 0,
      isChipActive: false,
      totalBet: 0,
      balance: 1000000,
      balanceAtStartOfCycle: 1000000,
      time: placeBetDuration,
      timerText: placeBet,
      timerRunning: true,
      betConfirmed: false,
      lastBet: { amount: 0, location: undefined },
      inAutoBetMode: false,
      isProcessingCards: false,
      currentWinning: 0,
      betDetailPerLocation: emptyBetDetail,
      confirmedBetDetailPerLocation: emptyBetDetail,
      betConfirmedBannerState: false
    };

    window.addEventListener("placeBet", e => {
      if (this.state.balance - e.detail.amount < 0) {
        return;
      }
      //e.detail.location can be one of 'patch1', 'patch2', ... , 'patch6

      //locationNum from 0 to 5
      const locationNum =
        e.detail.location.substring(
          e.detail.location.length - 1,
          e.detail.location.length
        ) - 1;

      this.setState(function(prevState) {
        const newBetDetailPerLocation = prevState.betDetailPerLocation.slice();
        for (let i = 0; i < 6; i++) {
          if (locationNum === i) {
            newBetDetailPerLocation[i] = prevState.betDetailPerLocation[
              i
            ].slice();
            newBetDetailPerLocation[i].push(e.detail.amount);
          } else {
            newBetDetailPerLocation[i] = prevState.betDetailPerLocation[
              i
            ].slice();
          }
        }
        return {
          totalBet: prevState.totalBet + e.detail.amount,
          balance: prevState.balance - e.detail.amount,
          lastBet: {
            amount: e.detail.amount,
            location: e.detail.location
          },
          betDetailPerLocation: newBetDetailPerLocation
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
          //restart timer after specified time
          setTimeout(() => {
            this.setState({
              time: placeBetDuration,
              timerRunning: true,
              timerText: placeBet,
              totalBet: 0,
              betConfirmed: false,
              selectedChip: 0,
              isProcessingCards: false,
              betDetailPerLocation: emptyBetDetail,
              confirmedBetDetailPerLocation: emptyBetDetail
            });
            this.first = true;
            setTimeout(step, interval);
            //clear all chips on table once the timer restarts
            const event = new CustomEvent("clearAllChips");
            window.dispatchEvent(event);
          }, timeInbetweenCountdowns);

          //only send the confirmed bets
          const betDetail = this.state.betConfirmed
            ? this.state.confirmedBetDetailPerLocation
            : emptyBetDetail;

          getCards(betDetail).then(obj => {
            const { cards, winning, outcomes } = obj;

            let totalBet = 0;
            this.state.confirmedBetDetailPerLocation.forEach(loc => {
              loc.forEach(bet => {
                totalBet += bet;
              });
            });
            this.setState(
              function(prevState) {
                this.props.hideOutOfMoneyModal();
                return {
                  isProcessingCards: true,
                  cards,
                  currentWinning: winning,
                  outcomes,
                  totalBet,
                  balance: prevState.balanceAtStartOfCycle - totalBet
                };
              },
              function() {
                const event = new CustomEvent("reduceTopRightDeck", {
                  detail: cards.length
                });
                window.dispatchEvent(event);
              }
            );
          });

          //clear all unconfirmed chips
          const event = new CustomEvent("clearAllUnconfirmedChips", {
            detail: this.state.confirmedBetDetailPerLocation
          });
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
      balance: this.state.balanceAtStartOfCycle,
      totalBet: 0,
      selectedChip: 0,
      isChipActive: false,
      betConfirmed: false,
      betDetailPerLocation: emptyBetDetail,
      confirmedBetDetailPerLocation: emptyBetDetail
    });

    this.clearAutoBet();
  };

  clearSelectedChip = () => {
    this.setState({
      selectedChip: 0,
      isChipActive: false
    });

    const event = new CustomEvent("clearSelectedChip");
    window.dispatchEvent(event);
  };

  confirmBet = () => {
    this.setState(function(prevState) {
      return {
        betConfirmed: true,
        confirmedBetDetailPerLocation: prevState.betDetailPerLocation,
        betConfirmedBannerState: true
      };
    });

    setTimeout(() => {
      this.setState({
        betConfirmedBannerState: false
      });
    }, betConfirmBannerDuration);
  };

  autoBet = () => {
    const event = new CustomEvent("autoReBet", { detail: this.state.lastBet });
    window.dispatchEvent(event);

    this.setState({
      inAutoBetMode: true
    });
  };

  clearAutoBet = () => {
    const event = new CustomEvent("clearAutoReBet");
    window.dispatchEvent(event);

    this.setState({
      inAutoBetMode: false
    });
  };

  setTimer = time => {
    this.setState({ time });
  };

  updateBetAndBalance = () => {
    this.setState({
      totalBet: 0,
      balanceAtStartOfCycle: this.state.balance + this.state.currentWinning,
      balance: this.state.balance + this.state.currentWinning
    });
  };

  render() {
    return (
      <div className="full-page-UI-overlay">
        <TopLeftHistory
          mouseEntersUI={this.mouseEntersUI}
          mouseLeavesUI={this.mouseLeavesUI}
          showBeadPlateModal={this.props.showBeadPlateModal}
          clearSelectedChip={this.clearSelectedChip}
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
          confirmBet={this.confirmBet}
          autoBet={this.autoBet}
          clearAutoBet={this.clearAutoBet}
          lastBet={this.state.lastBet}
          inAutoBetMode={this.state.inAutoBetMode}
          clearSelectedChip={this.clearSelectedChip}
          isProcessingCards={this.state.isProcessingCards}
        />
        <TopRightMenu
          showHistoryModal={this.props.showHistoryModal}
          showSoundModal={this.props.showSoundModal}
          showInstructionModal={this.props.showInstructionModal}
          showTallyConfirmationModal={this.props.showTallyConfirmationModal}
          mouseEntersUI={this.mouseEntersUI}
          mouseLeavesUI={this.mouseLeavesUI}
          clearSelectedChip={this.clearSelectedChip}
        />

        {this.state.isProcessingCards ? (
          <CardActions
            cards={this.state.cards}
            currentWinning={this.state.currentWinning}
            outcomes={this.state.outcomes}
            updateBetAndBalance={this.updateBetAndBalance}
          />
        ) : null}

        {/* {this.state.isProcessingCards ? (
          <CardAnimation cards={this.state.cards} />
        ) : null} */}

        {this.state.betConfirmed ? (
          <CSSTransition
            in={this.state.betConfirmedBannerState}
            appear={true}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <div className="bet-confirmed-banner">
              <img src={betConfirmed} />
            </div>
          </CSSTransition>
        ) : null}

        {preloadImgArr.map((ele, i) => {
          return <div className={`no-display second-page-ui img${i}`} />;
        })}
      </div>
    );
  }
}

export default SecondPageUIOverlay;
