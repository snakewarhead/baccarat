import React, { Component } from "react";
import Phaser from "phaser";
import "./css/App.css";
import {
  getMobileOperatingSystem,
  isMobile,
  resizeApp,
  centerPortraitGif
} from "./utils/helperFunctions";
import Loading from "./scenes/Loading";
import Main from "./scenes/Main";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inLandscapeMode: true,
      mobileIOS: false,
      mobileAndroid: false,
      mobile: false,
      scrollCounter: 0
    };

    window.addEventListener("resize", resizeApp);

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

      centerPortraitGif();
    };

    const leaveIncorrectOrientation = () => {
      this.setState({
        inLandscapeMode: true,
        scrollCounter: 0
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
      scene: [Loading, Main]
    };

    var game = new Phaser.Game(config);
    setTimeout(() => {
      resizeApp();
    }, 0);

    if (this.state.mobileIOS) {
      const landscape = document.querySelector(".landscape");
      landscape.style.height = window.innerHeight + 100 + "px";
      setTimeout(() => {
        landscape.scrollIntoView();
      }, 400);

      window.addEventListener(
        "scroll",
        function(e) {
          this.setState(function(prevState) {
            return {
              scrollCounter: prevState.scrollCounter + 1
            };
          });
          if (this.state.scrollCounter === 5) {
            landscape.classList.remove("display-block");
          }
        }.bind(this)
      );
    }
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
