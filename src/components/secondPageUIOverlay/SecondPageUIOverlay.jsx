import React, { Component } from "react";
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
import {
  placeBetDuration,
  timeInbetweenCountdowns
} from "../../utils/constants";
import { getCards } from "../../utils/api.js";

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
      timerRunning: true,
      betConfirmed: false,
      lastBet: { amount: 0, location: undefined },
      inAutoBetMode: false,
      isProcessingCards: false,
      currentWinning: 0
    };

    window.addEventListener("placeBet", e => {
      this.setState(function(prevState) {
        return {
          totalBet: prevState.totalBet + e.detail.amount,
          lastBet: {
            amount: e.detail.amount,
            location: e.detail.location
          }
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
            console.log("!!");
            //restart timer
            this.setState({
              time: placeBetDuration,
              timerRunning: true,
              timerText: placeBet,
              totalBet: 0,
              betConfirmed: false,
              selectedChip: 0,
              isProcessingCards: false
            });
            this.first = true;
            setTimeout(step, interval);
            //clear all chips on table once the timer restarts
            const event = new CustomEvent("clearAllChips");
            window.dispatchEvent(event);
          }, timeInbetweenCountdowns);

          //clear all chips if bets are not confirmed
          if (!this.state.betConfirmed) {
            this.setState({
              totalBet: 0,
              previousBetState: {
                patch1: [],
                patch2: [],
                patch3: [],
                patch4: [],
                patch5: [],
                patch6: []
              }
            });
            const event = new CustomEvent("clearAllChips");
            window.dispatchEvent(event);
          }

          const event = new CustomEvent("displayingResult");
          window.dispatchEvent(event);

          getCards().then(obj => {
            const { cards, winning } = obj;
            this.setState({
              isProcessingCards: true,
              cards,
              currentWinning: winning
            });
          });

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

    // const cardActions = this.state.cardActions;
    // const screenHeight = global.screen.availHeight;

    // let cards = [
    //   {
    //     color: "s",
    //     number: 1
    //   },
    //   {
    //     color: "h",
    //     number: 10
    //   },
    //   {
    //     color: "d",
    //     number: 11
    //   },
    //   {
    //     color: "c",
    //     number: 12
    //   },
    //   {
    //     color: "d",
    //     number: 13
    //   },
    //   {
    //     color: "c",
    //     number: 7
    //   }
    // ];

    // cards = cards.map((card, index) => {
    //   card.style = {
    //     top: "0%",
    //     right: (screenHeight * 0.3 * 200) / 270,
    //     width: (screenHeight * 0.3 * 200) / 270,
    //     height: screenHeight * 0.3,
    //     transform: "rotate(-60deg)",
    //     opacity: 0
    //   };
    //   return card;
    // });

    // cards = cards.map((card, index) => {
    //   const CARD_RATE = parseFloat(
    //     (card.style.width / global.screen.width).toFixed(4)
    //   );
    //   const CARD_MARGIN = 0.0025;

    //   if (index % 2 === 0) {
    //     if (index !== 4) {
    //       card.translateX =
    //         -1 *
    //           ((1 - index / 2) * (CARD_RATE + CARD_MARGIN) + 0.5) *
    //           global.screen.width +
    //         card.style.right;
    //     } else {
    //       card.translateX =
    //         -1 * (2 * (CARD_RATE + CARD_MARGIN) + 0.5) * global.screen.width +
    //         card.style.right;
    //     }
    //   } else {
    //     card.translateX =
    //       -1 *
    //         (0.5 - ((CARD_RATE * (index + 1)) / 2 + CARD_MARGIN * index)) *
    //         global.screen.width +
    //       card.style.right;
    //   }
    //   card.translateY = screenHeight / 2 - (card.style.height * 3) / 4;
    //   return card;
    // });

    // cardActions.processCards(cards);
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
      isChipActive: false,
      betConfirmed: false
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
    this.setState({
      betConfirmed: true
    });
  };

  autoBet = () => {
    const event = new CustomEvent("autoReBet", { detail: this.state.lastBet });
    window.dispatchEvent(event);
    console.log(this.state.lastBet);

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
        />
        <TopRightMenu
          showHistoryModal={this.props.showHistoryModal}
          mouseEntersUI={this.mouseEntersUI}
          mouseLeavesUI={this.mouseLeavesUI}
          clearSelectedChip={this.clearSelectedChip}
        />

        {/* <CardActions
          ref={cardActions => {
            this.state.cardActions = cardActions;
          }}
        /> */}

        {this.state.isProcessingCards ? (
          <CardActions
            cards={this.state.cards}
            currentWinning={this.state.currentWinning}
          />
        ) : null}
      </div>
    );
  }
}

export default SecondPageUIOverlay;
