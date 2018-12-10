import React, { Component } from "react";
import Phaser from "phaser";
import "./App.css";
import { getMobileOperatingSystem, isMobile } from "./utils/helperFunctions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inLandscapeMode: true,
      mobileIOS: false,
      mobileAndroid: false,
      mobile: false
    };

    if (isMobile()) {
      this.state.mobile = true;
      if (getMobileOperatingSystem() === "Android") {
        this.state.mobileAndroid = true;
      } else if (getMobileOperatingSystem() === "iOS") {
        this.state.mobileIOS = true;
      }

      var mql = window.matchMedia("(orientation: portrait)");

      if (mql.matches) {
        this.state.inLandscapeMode = false;
      } else {
        this.state.inLandscapeMode = true;
      }

      // Add a media query change listener
      mql.addListener(function(m) {
        if (m.matches) {
          enterIncorrectOrientation();
        } else {
          leaveIncorrectOrientation();
        }
      });
    }

    const enterIncorrectOrientation = () => {
      this.setState({
        inLandscapeMode: false
      });
    };

    const leaveIncorrectOrientation = () => {
      this.setState({
        inLandscapeMode: true
      });
      const landscape = document.querySelector(".landscape");
      landscape.scrollIntoView();
    };
  }

  componentDidMount() {
    var config = {
      type: Phaser.AUTO,
      width: 1920,
      height: 1080,
      parent: "game",
      scene: []
    };

    var game = new Phaser.Game(config);

    const landscape = document.querySelector(".landscape");
    landscape.style.height = window.innerHeight + 100 + "px";
    landscape.scrollTop = 0;

    setTimeout(() => {
      landscape.scrollTop = 0;
    }, 0);
    window.addEventListener("scroll", function(e) {
      console.log(e.target);
      // landscape.classList.remove("display-block");
    });
  }

  render() {
    const { mobile, inLandscapeMode, mobileIOS } = this.state;
    return (
      <div className="background">
        <div id="game" />
        <div
          className={
            mobile && !inLandscapeMode ? "portrait visible" : "portrait"
          }
        />
        <div
          className={
            mobileIOS && inLandscapeMode
              ? "landscape display-block"
              : "landscape"
          }
        />
      </div>
    );
  }
}

export default App;
