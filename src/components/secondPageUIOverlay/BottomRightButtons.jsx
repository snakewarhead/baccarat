import React, { Component } from "react";
import "../../css/secondPageUIOverlay/BottomRightButtons.css";

class BottomRightButtons extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bottom-right-button-holder">
        <div className="auto-bet-button" />
        <div className="clear-bet-button" />
        <div className="confirm-bet-button" />
      </div>
    );
  }
}

export default BottomRightButtons;
