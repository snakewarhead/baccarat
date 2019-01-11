import React, { Component } from "react";
import Modal from "./Modal.jsx";
import bankerWinsIcon from "../assets/backgroundTwo/topLeftHistoryDisplay/topLeftHistoryDisplayModal/bankerWinsIcon.png";
import tieIcon from "../assets/backgroundTwo/topLeftHistoryDisplay/topLeftHistoryDisplayModal/tieIcon.png";
import playerWinsIcon from "../assets/backgroundTwo/topLeftHistoryDisplay/topLeftHistoryDisplayModal/playerWinsIcon.png";
import bankerWinsIcon2 from "../assets/backgroundTwo/topLeftHistoryDisplay/topLeftHistoryDisplayModal/banker.png";
import tieIcon2 from "../assets/backgroundTwo/topLeftHistoryDisplay/topLeftHistoryDisplayModal/tie.png";
import playerWinsIcon2 from "../assets/backgroundTwo/topLeftHistoryDisplay/topLeftHistoryDisplayModal/player.png";
import { getBeadPlateHistory } from "../utils/api";
import "../css/BeadPlateModal.css";

class BeadPlateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beadPlateHistoryTop: [],
      beadPlateHistoryBottom: [],
      rowCount: 6,
      colCount: 20
    };
  }

  componentDidMount() {
    getBeadPlateHistory().then(data => {
      this.setState({
        beadPlateHistoryTop: data.beadPlateHistoryTop,
        beadPlateHistoryBottom: data.beadPlateHistoryBottom
      });
    });
  }

  hideBeadPlateModalIfClickOnBg = e => {
    if (e.target.classList.contains("modal")) {
      this.props.hideBeadPlateModal();
    }
  };

  render() {
    const topContainerMap = [];
    const bottomContainerMap = [];
    const { beadPlateHistoryTop, beadPlateHistoryBottom } = this.state;
    const iconMapTop = { 1: bankerWinsIcon, 2: playerWinsIcon, 3: tieIcon };
    const iconMapBottom = {
      1: bankerWinsIcon2,
      2: playerWinsIcon2,
      3: tieIcon2
    };

    for (let i = 0; i < this.state.colCount; i++) {
      topContainerMap.push([]);
      for (let j = 0; j < this.state.rowCount; j++) {
        if (!beadPlateHistoryTop[i]) {
          beadPlateHistoryTop.push([0]);
        } else if (!beadPlateHistoryTop[i][j]) {
          beadPlateHistoryTop[i].push(0);
        }
        topContainerMap[i].push(beadPlateHistoryTop[i][j]);
      }
    }

    for (let i = 0; i < this.state.colCount; i++) {
      bottomContainerMap.push([]);
      for (let j = 0; j < this.state.rowCount; j++) {
        if (!beadPlateHistoryBottom[i]) {
          beadPlateHistoryBottom.push([0]);
        } else if (!beadPlateHistoryBottom[i][j]) {
          beadPlateHistoryBottom[i].push(0);
        }
        bottomContainerMap[i].push(beadPlateHistoryBottom[i][j]);
      }
    }

    return (
      <Modal>
        <div className="modal" onClick={this.hideBeadPlateModalIfClickOnBg}>
          <div className="bead-plate-modal-bg">
            <div
              className="bead-plate-modal-x-icon"
              onClick={this.props.hideBeadPlateModal}
            />
            <div className="top-container half-container">
              {topContainerMap.map((col, idx) => {
                return (
                  <div className="container-col" key={idx}>
                    {col.map((cell, idx) => {
                      return (
                        <div className="cell">
                          {cell ? (
                            <img src={iconMapTop[cell]} alt="" key={idx} />
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="bottom-container half-container">
              {bottomContainerMap.map(col => {
                return (
                  <div className="container-col">
                    {col.map(cell => {
                      return (
                        <div className="cell">
                          {cell ? <img src={iconMapBottom[cell]} alt="" /> : ""}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default BeadPlateModal;
