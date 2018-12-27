import React, { Component } from "react";
import "../../css/secondPageUIOverlay/TopLeftHistory.css";
import house from "../../assets/backgroundTwo/topLeftHistoryDisplay/house.png";
import player from "../../assets/backgroundTwo/topLeftHistoryDisplay/player.png";
import tie from "../../assets/backgroundTwo/topLeftHistoryDisplay/tie.png";
class TopLeftHistory extends Component {
  constructor(props) {
    super(props);
    //0 == house, 1 == player, 2 == tie
    this.state = {
      numberOfRows: 6,
      historyArr: [
        [0, 2, 1],
        [1, 0, 1],
        [0, 2, 0],
        [1, 1, 1],
        [2, 0, 0],
        [0, 1, 0]
      ],
      imgMap: [house, player, tie]
    };
  }

  componentDidMount() {}

  showBeadPlateModalAndClearSelectedChip = () => {
    this.props.showBeadPlateModal();
    this.props.clearSelectedChip();
  };

  render() {
    const rowsArr = [];
    for (let i = 0; i < this.state.numberOfRows; i++) {
      rowsArr.push(0);
    }
    const rowNumberMap = ["one", "two", "three", "four", "five", "six"];

    return (
      <div
        className="top-left-history-display"
        onMouseEnter={this.props.mouseEntersUI}
        onMouseLeave={this.props.mouseLeavesUI}
        onClick={this.showBeadPlateModalAndClearSelectedChip}
      >
        <div className="top-left-history-display-body-container">
          {rowsArr.map((obj, idx) => {
            return (
              <div
                className={
                  "top-left-history-display-body-row " +
                  "row-" +
                  rowNumberMap[idx]
                }
                key={idx}
              >
                <div
                  className={
                    "top-left-history-display-body-cell " +
                    "row-" +
                    rowNumberMap[idx] +
                    "-cell-one"
                  }
                >
                  <img
                    className="history-individual-result-img"
                    src={this.state.imgMap[this.state.historyArr[idx][0]]}
                  />
                </div>
                <div
                  className={
                    "top-left-history-display-body-cell " +
                    "row-" +
                    rowNumberMap[idx] +
                    "-cell-two"
                  }
                >
                  <img
                    className="history-individual-result-img"
                    src={this.state.imgMap[this.state.historyArr[idx][1]]}
                  />
                </div>
                <div
                  className={
                    "top-left-history-display-body-cell " +
                    "row-" +
                    rowNumberMap[idx] +
                    "-cell-three"
                  }
                >
                  <img
                    className="history-individual-result-img"
                    src={this.state.imgMap[this.state.historyArr[idx][2]]}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default TopLeftHistory;
