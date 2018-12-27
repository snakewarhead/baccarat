import React, { Component } from "react";
import "../../css/secondPageUIOverlay/TopRightMenu.css";

class TopRightMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="top-right-menu-container"
        onMouseEnter={this.props.mouseEntersUI}
        onMouseLeave={this.props.mouseLeavesUI}
        onClick={this.props.clearSelectedChip}
      >
        <div className="top-right-menu-container-inner">
          <div className="tally-change-table-icon top-right-menu-icon" />
          <div className="change-table-icon top-right-menu-icon" />
          <div
            className="history-icon top-right-menu-icon"
            onClick={this.props.showHistoryModal}
          />
          <div className="gear-icon top-right-menu-icon" />
          <div className="instruction-icon top-right-menu-icon" />
          <div className="exit-icon top-right-menu-icon" />
        </div>
      </div>
    );
  }
}

export default TopRightMenu;
