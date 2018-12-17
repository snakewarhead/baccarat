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
      isChipActive: false
    };

    this.pointerEnterEvent = new CustomEvent("pointerEntersUI");
    this.pointerLeaveEvent = new CustomEvent("pointerLeavesUI");
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
      console.log(chipAmount !== this.state.isChipActive);
      return {
        selectedChip: chipAmount,
        isChipActive: chipActiveOrNot
      };
    });

    window.dispatchEvent(event);
  };

  mouseEntersUI = () => {
    window.dispatchEvent(this.pointerEnterEvent);
  };

  mouseLeavesUI = () => {
    window.dispatchEvent(this.pointerLeaveEvent);
  };

  render() {
    return (
      <div className="full-page-UI-overlay">
        <TopLeftHistory />
        <CountdownTimer />
        <BottomLeftDisplayRows />
        <ChipHolder
          selectedChip={this.state.selectedChip}
          selectChip={this.selectChip}
          mouseEntersUI={this.mouseEntersUI}
          mouseLeavesUI={this.mouseLeavesUI}
        />
        <BottomRightButtons />
        <TopRightMenu showHistoryModal={this.props.showHistoryModal} />
      </div>
    );
  }
}

export default SecondPageUIOverlay;
