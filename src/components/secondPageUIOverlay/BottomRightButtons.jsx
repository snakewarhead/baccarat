import React, { Component } from "react";
import "../../css/secondPageUIOverlay/BottomRightButtons.css";

class BottomRightButtons extends Component {
  constructor(props) {
    super(props);
  }

  autoBet = () => {
    this.props.autoBet();
  };

  clearAutoBet = () => {
    this.props.clearAutoBet();
  };

  render() {
    return (
      <div
        className="bottom-right-button-holder"
        onMouseEnter={this.props.mouseEntersUI}
        onMouseLeave={this.props.mouseLeavesUI}
        onClick={
          this.props.isProcessingCards ? null : this.props.clearSelectedChip
        }
      >
        <div className="auto-bet-button-container">
          <div
            className="auto-bet-button"
            onClick={
              this.props.isProcessingCards
                ? null
                : this.props.lastBet.amount
                ? this.props.inAutoBetMode
                  ? this.clearAutoBet
                  : this.autoBet
                : null
            }
          />
          <div className="auto-bet-button-text">
            {this.props.inAutoBetMode ? "取消押注" : "自動押注"}
          </div>
        </div>
        <div className="clear-bet-button-container">
          <div
            className="clear-bet-button"
            onClick={
              this.props.isProcessingCards ? null : this.props.clearAllChips
            }
          />
          <div className="clear-bet-button-text">清空籌碼</div>
        </div>
        <div className="confirm-bet-button-container">
          <div
            className="confirm-bet-button"
            onClick={
              this.props.isProcessingCards ? null : this.props.confirmBet
            }
          />
          <div className="confirm-bet-button-text">確認押注</div>
        </div>
      </div>
    );
  }
}

export default BottomRightButtons;
