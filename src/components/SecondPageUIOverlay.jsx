import React, { Component } from "react";
import "../css/SecondPageUIOverlay.css";

class SecondPageUIOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfRows: 6
    };
  }

  render() {
    const rowsArr = [];
    for (let i = 0; i < this.state.numberOfRows; i++) {
      rowsArr.push(0);
    }
    const map = ["one", "two", "three", "four", "five", "six"];

    return (
      <div className="full-page-UI-overlay">
        <div className="top-left-history-display">
          <div className="top-left-history-display-body-container">
            {rowsArr.map((obj, idx) => {
              return (
                <div
                  className={
                    "top-left-history-display-body-row " + "row-" + map[idx]
                  }
                >
                  <div
                    className={
                      "top-left-history-display-body-cell " +
                      "row-" +
                      map[idx] +
                      "-cell-one"
                    }
                  />
                  <div
                    className={
                      "top-left-history-display-body-cell " +
                      "row-" +
                      map[idx] +
                      "-cell-two"
                    }
                  />
                  <div
                    className={
                      "top-left-history-display-body-cell " +
                      "row-" +
                      map[idx] +
                      "-cell-three"
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default SecondPageUIOverlay;
