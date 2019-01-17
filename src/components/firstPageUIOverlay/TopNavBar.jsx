import React, { Component } from "react";
import "../../css/firstPageUIOverlay/TopNavBar.css";
import img0 from "../../assets/backgroundOne/numbers/0.png";
import img1 from "../../assets/backgroundOne/numbers/1.png";
import img2 from "../../assets/backgroundOne/numbers/2.png";
import img3 from "../../assets/backgroundOne/numbers/3.png";
import img4 from "../../assets/backgroundOne/numbers/4.png";
import img5 from "../../assets/backgroundOne/numbers/5.png";
import img6 from "../../assets/backgroundOne/numbers/6.png";
import img7 from "../../assets/backgroundOne/numbers/7.png";
import img8 from "../../assets/backgroundOne/numbers/8.png";
import img9 from "../../assets/backgroundOne/numbers/9.png";

class TopNavBar extends Component {
  render() {
    const balanceStr = this.props.balance + "";
    const balanceArr = balanceStr.split("");
    const map = [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9];
    return (
      <div className="top-nav-bar">
        <div className="balance-display-container">
          <div className="balance-display">
            {balanceArr.map((num, idx) => {
              return <img src={map[num]} key={idx} alt="" />;
            })}
          </div>
        </div>
        <div className="side-bar-container">
          <div className="side-bar">
            <div className="icon-container">
              <div
                className="history-icon icons"
                onClick={this.props.showHistoryModal}
              />
              <div
                className="gear-icon icons"
                onClick={this.props.showSoundModal}
              />
              <div
                className="instruction-icon icons"
                onClick={this.props.showInstructionModal}
              />
              <div
                className="exit-icon icons"
                onClick={this.props.showTallyConfirmationModal}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopNavBar;
