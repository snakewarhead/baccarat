import React, { Component } from "react";
import Modal from "./Modal.jsx";
import "../css/InstructionModal.css";
import downArrow from "../assets/modals/instructionModal/instructions-modal-down-arrow.png";
import upArrow from "../assets/modals/instructionModal/instructions-modal-up-arrow.png";
import instructionP1 from "../assets/modals/instructionModal/instructions-page-one.png";
import instructionP2 from "../assets/modals/instructionModal/instructions-page-two.png";

class InstructionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageContent: instructionP1
    };
  }

  hideInstructionModalIfClickOnBg = e => {
    if (e.target.classList.contains("modal")) {
      this.props.hideInstructionModal();
    }
  };

  scrollUp = () => {
    this.setState({
      pageContent: instructionP1
    });
  };

  scrollDown = () => {
    this.setState({
      pageContent: instructionP2
    });
  };

  render() {
    return (
      <Modal>
        <div className="modal" onClick={this.hideInstructionModalIfClickOnBg}>
          <div className="instruction-modal-bg">
            <img className="instruction-content" src={this.state.pageContent} />
            <img
              className="instruction-up-arrow"
              src={upArrow}
              onClick={this.scrollUp}
            />
            <img
              className="instruction-down-arrow"
              src={downArrow}
              onClick={this.scrollDown}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

export default InstructionModal;
