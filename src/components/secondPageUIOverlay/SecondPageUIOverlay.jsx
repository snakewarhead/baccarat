import React, { Component } from "react";
import TopLeftHistory from "./TopLeftHistory.jsx";
import CountdownTimer from "./CountdownTimer.jsx";
import BottomLeftDisplayRows from "./BottomLeftDisplayRows.jsx";
import ChipHolder from "./ChipHolder.jsx";
import BottomRightButtons from "./BottomRightButtons.jsx";
import TopRightMenu from "./TopRightMenu.jsx";
import "../../css/secondPageUIOverlay/SecondPageUIOverlay.css";

class SecondPageUIOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChip: 0,
      isChipActive: false,
      totalBet: 0,
      time: 5
    };

    window.addEventListener("placeBet", () => {
      this.setState(function(prevState) {
        return {
          totalBet: prevState.totalBet + prevState.selectedChip
        };
      });
    });
  }

  selectChip = e => {
    const chipAmount = parseInt(e.target.className.split(" ")[1]);

    let chipActiveOrNot;
    if (chipAmount !== this.state.selectedChip) {
      chipActiveOrNot = true;
    } else {
      chipActiveOrNot = !this.state.isChipActive;
    }

    const event = new CustomEvent("chipSelected", {
      detail: {
        chipAmount,
        isChipActive: chipActiveOrNot
      }
    });
    this.setState(function(prevState) {
      return {
        selectedChip: chipAmount,
        isChipActive: chipActiveOrNot
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
      totalBet: 0
    });
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
          showCardModal={this.props.showCardModal}
        />
        <BottomLeftDisplayRows
          mouseEntersUI={this.mouseEntersUI}
          mouseLeavesUI={this.mouseLeavesUI}
          totalBet={this.state.totalBet}
        />
        <ChipHolder
          selectedChip={this.state.selectedChip}
          isChipActive={this.state.isChipActive}
          selectChip={this.selectChip}
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
