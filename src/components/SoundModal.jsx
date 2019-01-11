import React, { Component } from "react";
import Modal from "./Modal.jsx";
import "../css/SoundModal.css";
import switchOn from "../assets/modals/soundModal/on-switch.png";
import switchOff from "../assets/modals/soundModal/off-switch.png";

class SoundModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upperSwitch: true,
      lowerSwitch: true
    };
  }

  hideSoundModalIfClickOnBg = e => {
    console.log(e.target.classList);
    if (e.target.classList.contains("modal")) {
      this.props.hideSoundModal();
    }
  };

  toggleUpperSwitch = () => {
    this.setState(function(prevState) {
      return {
        upperSwitch: !prevState.upperSwitch
      };
    });
  };

  toggleLowerSwitch = () => {
    this.setState(function(prevState) {
      return {
        lowerSwitch: !prevState.lowerSwitch
      };
    });
  };

  render() {
    return (
      <Modal>
        <div className="modal" onClick={this.hideSoundModalIfClickOnBg}>
          <div className="sound-modal-bg">
            <div className="x-icon" onClick={this.props.hideSoundModal} />
            <div className="switch upper" onClick={this.toggleUpperSwitch}>
              <img src={this.state.upperSwitch ? switchOn : switchOff} />
            </div>
            <div className="switch lower" onClick={this.toggleLowerSwitch}>
              <img src={this.state.lowerSwitch ? switchOn : switchOff} />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default SoundModal;
