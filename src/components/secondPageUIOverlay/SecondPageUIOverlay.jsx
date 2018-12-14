import React, { Component } from "react";
import TopLeftHistory from "./TopLeftHistory.jsx";
import CountdownTimer from "./CountdownTimer.jsx";
import BottomLeftDisplayRows from "./BottomLeftDisplayRows.jsx";
import ChipHolder from "./ChipHolder.jsx";
import "../../css/secondPageUIOverlay/SecondPageUIOverlay.css";

class SecondPageUIOverlay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="full-page-UI-overlay">
        <TopLeftHistory />
        <CountdownTimer />
        <BottomLeftDisplayRows />
        <ChipHolder />
      </div>
    );
  }
}

export default SecondPageUIOverlay;
