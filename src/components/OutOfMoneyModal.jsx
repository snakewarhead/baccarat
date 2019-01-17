import React, { Component } from "react";
import Modal from "./Modal.jsx";
import "../css/OutOfMoneyModal.css";

class OutOfMoneyModal extends Component {
  constructor(props) {
    super(props);
  }

  hideModalIfClickOnBg = e => {
    if (e.target.classList.contains("modal")) {
      this.props.hideOutOfMoneyModal();
    }
  };

  render() {
    return (
      <Modal>
        <div className="modal" onClick={this.hideModalIfClickOnBg}>
          <div className="out-of-money-modal-bg">
            <div
              className="out-of-money-modal-confirm-btn"
              onClick={this.props.hideOutOfMoneyModal}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

export default OutOfMoneyModal;
