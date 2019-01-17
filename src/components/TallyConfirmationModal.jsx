import React, { Component } from "react";
import Modal from "./Modal.jsx";
import "../css/TallyConfirmationModal.css";

class TallyConfirmationModal extends Component {
  constructor(props) {
    super(props);
  }

  hideModalIfClickOnBg = e => {
    if (e.target.classList.contains("modal")) {
      this.props.hideTallyConfirmationModal();
    }
  };

  hideConfirmationShowTallyModal = () => {
    this.props.hideTallyConfirmationModal();
    this.props.showTallyModal();
  };

  render() {
    return (
      <Modal>
        <div className="modal" onClick={this.hideModalIfClickOnBg}>
          <div className="tally-confirmation-modal-bg">
            <div
              className="tally-confirmation-cancel-btn"
              onClick={this.props.hideTallyConfirmationModal}
            />
            <div
              className="tally-confirmation-confirm-btn"
              onClick={this.hideConfirmationShowTallyModal}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

export default TallyConfirmationModal;
