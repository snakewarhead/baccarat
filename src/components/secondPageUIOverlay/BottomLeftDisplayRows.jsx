import React, { Component } from "react";
import "../../css/secondPageUIOverlay/BottomLeftDisplayRows.css";

class BottomLeftDisplayRows extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="bottom-left-rows">
        <div className="display-row">
          <div className="display-row-first-partition">用戶名</div>
          <div className="display-row-second-partition">用戶名稱過長</div>
        </div>
        <div className="display-row">
          <div className="display-row-first-partition">總押注</div>
          <div className="display-row-second-partition">1234567890</div>
        </div>
        <div className="display-row">
          <div className="display-row-first-partition">餘額</div>
          <div className="display-row-second-partition">1234567890</div>
        </div>
      </div>
    );
  }
}

export default BottomLeftDisplayRows;
