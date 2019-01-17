import React, { Component } from "react";
import Modal from "./Modal.jsx";
import "../css/TallyModal.css";
import { gameLobbyLocation } from "../utils/constants.js";

class TallyModal extends Component {
  constructor(props) {
    super(props);
  }

  redirectToLobby = () => {
    window.location.href = gameLobbyLocation;
  };

  render() {
    return (
      <Modal>
        <div className="modal">
          <div className="tally-modal-bg">
            <div
              className="tally-modal-confirm-btn"
              onClick={this.redirectToLobby}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

export default TallyModal;
