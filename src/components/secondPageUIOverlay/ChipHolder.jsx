import React, { Component } from "react";
import "../../css/secondPageUIOverlay/ChipHolder.css";
import chip100 from "../../assets/backgroundTwo/chipHolder/100-unselected.png";
import chip500 from "../../assets/backgroundTwo/chipHolder/500-unselected.png";
import chip1k from "../../assets/backgroundTwo/chipHolder/1k-unselected.png";
import chip5k from "../../assets/backgroundTwo/chipHolder/5k-unselected.png";
import chip10k from "../../assets/backgroundTwo/chipHolder/10k-unselected.png";
import chip25k from "../../assets/backgroundTwo/chipHolder/25k-unselected.png";
import chip50k from "../../assets/backgroundTwo/chipHolder/50k-unselected.png";
import chip100k from "../../assets/backgroundTwo/chipHolder/100k-unselected.png";
import chip250k from "../../assets/backgroundTwo/chipHolder/250k-unselected.png";
import chip500k from "../../assets/backgroundTwo/chipHolder/500k-unselected.png";
class ChipHolder extends Component {
  constructor(props) {
    super(props);
  }

  translateXLeft = () => {
    const chipSlider = document.querySelector(".chip-holder-slider");
    let position = chipSlider.style.transform.substring(12, 14);
    if (position === "0%") position = 0;
    if (!chipSlider.style.transform) {
      chipSlider.style.transform = "translateX(-10%)";
    } else if (position <= 40) {
      chipSlider.style.transform = `translateX(-${Number(position) + 10}%)`;
      console.log(position);
    } else {
    }
  };

  translateXRight = () => {
    const chipSlider = document.querySelector(".chip-holder-slider");
    let position = chipSlider.style.transform.substring(12, 14);
    if (position === "0%") position = 0;
    if (!chipSlider.style.transform) {
    } else if (position <= 40) {
      chipSlider.style.transform = `translateX(-${Number(position) - 10}%)`;
      console.log(chipSlider.style.transform);
    } else {
    }
  };

  render() {
    return (
      <div className="chip-holder">
        <div className="left-arrow" onClick={this.translateXLeft} />
        <div className="chip-holder-body">
          <div className="chip-holder-slider">
            <img className="chip-container" src={chip100} />
            <img className="chip-container" src={chip500} />
            <img className="chip-container" src={chip1k} />
            <img className="chip-container" src={chip5k} />
            <img className="chip-container" src={chip10k} />
            <img className="chip-container" src={chip25k} />
            <img className="chip-container" src={chip50k} />
            <img className="chip-container" src={chip100k} />
            <img className="chip-container" src={chip250k} />
            <img className="chip-container" src={chip500k} />
          </div>
        </div>
        <div className="right-arrow" onClick={this.translateXRight} />
      </div>
    );
  }
}

export default ChipHolder;
