import React, { Component } from "react";
import "../../css/secondPageUIOverlay/BottomRightButtons.css";

class BottomRightButtons extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="bottom-right-button-holder"
        onMouseEnter={this.props.mouseEntersUI}
        onMouseLeave={this.props.mouseLeavesUI}
      >
        <div className="auto-bet-button-container">
          <div className="auto-bet-button" />
          <div className="auto-bet-button-text">自動押注</div>
        </div>
        <div className="clear-bet-button-container">
          <div
            className="clear-bet-button"
            onClick={this.props.clearAllChips}
          />
          <div className="clear-bet-button-text">清空籌碼</div>
        </div>
        <div className="confirm-bet-button-container">
          <div className="confirm-bet-button" />
          <div className="confirm-bet-button-text">確認押注</div>
        </div>
      </div>
    );
  }
}

export default BottomRightButtons;
