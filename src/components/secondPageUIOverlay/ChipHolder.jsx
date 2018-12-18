import React, { Component } from "react";
import "../../css/secondPageUIOverlay/ChipHolder.css";
import chip100 from "../../assets/backgroundTwo/chipHolder/100-unselected.png";
import chip100s from "../../assets/backgroundTwo/chipHolder/100-selected.png";
import chip500 from "../../assets/backgroundTwo/chipHolder/500-unselected.png";
import chip500s from "../../assets/backgroundTwo/chipHolder/500-selected.png";
import chip1k from "../../assets/backgroundTwo/chipHolder/1k-unselected.png";
import chip1ks from "../../assets/backgroundTwo/chipHolder/1k-selected.png";
import chip5k from "../../assets/backgroundTwo/chipHolder/5k-unselected.png";
import chip5ks from "../../assets/backgroundTwo/chipHolder/5k-selected.png";
import chip10k from "../../assets/backgroundTwo/chipHolder/10k-unselected.png";
import chip10ks from "../../assets/backgroundTwo/chipHolder/10k-selected.png";
import chip25k from "../../assets/backgroundTwo/chipHolder/25k-unselected.png";
import chip25ks from "../../assets/backgroundTwo/chipHolder/25k-selected.png";
import chip50k from "../../assets/backgroundTwo/chipHolder/50k-unselected.png";
import chip50ks from "../../assets/backgroundTwo/chipHolder/50k-selected.png";
import chip100k from "../../assets/backgroundTwo/chipHolder/100k-unselected.png";
import chip100ks from "../../assets/backgroundTwo/chipHolder/100k-selected.png";
import chip250k from "../../assets/backgroundTwo/chipHolder/250k-unselected.png";
import chip250ks from "../../assets/backgroundTwo/chipHolder/250k-selected.png";
import chip500k from "../../assets/backgroundTwo/chipHolder/500k-unselected.png";
import chip500ks from "../../assets/backgroundTwo/chipHolder/500k-selected.png";
class ChipHolder extends Component {
  constructor(props) {
    super(props);
  }

  translateXLeft = () => {
    const chipSlider = document.querySelector(".chip-holder-slider");
    let position = chipSlider.style.transform.substring(
      12,
      chipSlider.style.transform.indexOf("%")
    );
    if (position === "0%") position = 0;
    if (position <= 40) {
      chipSlider.style.transform = `translateX(-${Number(position) + 10}%)`;
    }
  };

  translateXRight = () => {
    const chipSlider = document.querySelector(".chip-holder-slider");
    let position = chipSlider.style.transform.substring(
      12,
      chipSlider.style.transform.indexOf("%")
    );
    if (position === "0%") position = 0;

    if (position <= 50) {
      chipSlider.style.transform = `translateX(-${Number(position) - 10}%)`;
    }
  };

  render() {
    const { selectedChip, isChipActive } = this.props;

    return (
      <div
        className="chip-holder"
        onMouseEnter={this.props.mouseEntersUI}
        onMouseLeave={this.props.mouseLeavesUI}
      >
        <div className="left-arrow" onClick={this.translateXLeft} />
        <div className="chip-holder-body ">
          <div className="chip-holder-body-inner">
            <div className="chip-holder-slider" onClick={this.props.selectChip}>
              <img
                className="chip-container 100"
                src={selectedChip === 100 && isChipActive ? chip100s : chip100}
              />
              <img
                className="chip-container 500"
                src={selectedChip === 500 && isChipActive ? chip500s : chip500}
              />
              <img
                className="chip-container 1000"
                src={selectedChip === 1000 && isChipActive ? chip1ks : chip1k}
              />
              <img
                className="chip-container 5000"
                src={selectedChip === 5000 && isChipActive ? chip5ks : chip5k}
              />
              <img
                className="chip-container 10000"
                src={
                  selectedChip === 10000 && isChipActive ? chip10ks : chip10k
                }
              />
              <img
                className="chip-container 25000"
                src={
                  selectedChip === 25000 && isChipActive ? chip25ks : chip25k
                }
              />
              <img
                className="chip-container 50000"
                src={
                  selectedChip === 50000 && isChipActive ? chip50ks : chip50k
                }
              />
              <img
                className="chip-container 100000"
                src={
                  selectedChip === 100000 && isChipActive ? chip100ks : chip100k
                }
              />
              <img
                className="chip-container 250000"
                src={
                  selectedChip === 250000 && isChipActive ? chip250ks : chip250k
                }
              />
              <img
                className="chip-container 500000"
                src={
                  selectedChip === 500000 && isChipActive ? chip500ks : chip500k
                }
              />
            </div>
          </div>
        </div>
        <div className="right-arrow" onClick={this.translateXRight} />
      </div>
    );
  }
}

export default ChipHolder;
