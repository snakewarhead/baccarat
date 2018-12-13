import React, { Component } from "react";
import Phaser from "phaser";
import "../css/App.css";
import screenful from "screenfull";
import {
  getMobileOperatingSystem,
  isMobile,
  resizeApp,
  centerPortraitGif,
  goFullscreen
} from "../utils/helperFunctions";
import TopNavBar from "./TopNavBar.jsx";
import HistoryModal from "../components/HistoryModal.jsx";
import Loading from "../scenes/Loading";
import Main from "../scenes/Main";
import Tables from "../scenes/Tables";

let lastScrollTop = 0;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inLandscapeMode: true,
      mobileIOS: false,
      mobileAndroid: false,
      mobile: false,
      scrollCounter: 0,
      showBackgroundOne: false,
      balance: 50000,
      showHistoryModal: true
    };

    window.addEventListener("resize", resizeApp);
    window.addEventListener(
      "fromTableToMain",
      function() {
        this.setState({ showBackgroundOne: false });
      }.bind(this)
    );
    window.addEventListener(
      "finishLoadingGame",
      function() {
        this.setState({ showBackgroundOne: true });
      }.bind(this)
    );

    if (isMobile()) {
      this.state.mobile = true;
      if (getMobileOperatingSystem() === "Android") {
        this.state.mobileAndroid = true;
      } else if (getMobileOperatingSystem() === "iOS") {
        this.state.mobileIOS = true;
      }

      if (this.state.mobileAndroid) {
        window.addEventListener("click", goFullscreen);
        window.addEventListener("touchend", goFullscreen);
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
      document.ontouchmove = function(e) {
        return true;
      };

      this.setState(
        {
          inLandscapeMode: false
        },
        function() {
          centerPortraitGif();
        }
      );

      if (this.state.mobileAndroid) {
        if (screenful.enabled) {
          screenful.exit();
        }
      }
    };

    const leaveIncorrectOrientation = () => {
      this.setState(
        {
          inLandscapeMode: true,
          scrollCounter: 0
        },
        function() {
          setTimeout(() => {
            const landscape = document.querySelector(".landscape");
            landscape.scrollIntoView();
            resizeApp();
          }, 0);
        }
      );
    };
  }

  componentDidMount() {
    var config = {
      type: Phaser.CANVAS,
      width: 1920,
      height: 1080,
      parent: "game",
      scene: [Loading, Tables, Main]
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

          //allow scrolling only when user tries to scroll history modal body or the date option dropdown
          document.ontouchmove = function(e) {
            //let game history modal be scrollable
            const historyModalBody = document.querySelector(
              ".history-modal-scrollable-body"
            );
            const dateOptionDropdown = document.querySelector(
              ".date-option-dropdown-child"
            );

            if (historyModalBody) {
              historyModalBody.ontouchmove = function(e) {
                e.allowScroll = true;
              };
            }

            if (dateOptionDropdown) {
              dateOptionDropdown.ontouchmove = function(e) {
                e.allowScroll = true;
              };
            }
            let parentDiv = e.target.parentNode.parentNode;

            if (parentDiv.classList.contains("date-option-dropdown")) {
              parentDiv = e.target.parentNode;
            }

            if (
              !e.allowScroll ||
              (lastScrollTop !== 0 && parentDiv.scrollTop === 0) ||
              (lastScrollTop === parentDiv.scrollTop && lastScrollTop !== 0)
            ) {
              if (lastScrollTop !== 0 && parentDiv.scrollTop === 0) {
                lastScrollTop = 1;
                parentDiv.scrollTop = 2;
              }
              if (
                lastScrollTop === parentDiv.scrollTop &&
                lastScrollTop !== 0
              ) {
                parentDiv.scrollTop = parentDiv.scrollTop - 1;
              }

              if (landscape.classList.contains("display-block")) {
                return true;
              }
              e.preventDefault();
              console.log("prevent scrolling");
            } else {
              lastScrollTop = parentDiv.scrollTop;
              return true;
            }
          };
        }.bind(this)
      );
    }
  }

  showHistoryModal = () => {
    this.setState({ showHistoryModal: true });
  };

  hideHistoryModal = () => {
    console.log("?");
    this.setState({ showHistoryModal: false });
  };

  render() {
    const { mobile, inLandscapeMode, mobileIOS } = this.state;

    return (
      <div className="background">
        {this.state.showBackgroundOne ? (
          <TopNavBar
            balance={this.state.balance}
            showHistoryModal={this.showHistoryModal}
          />
        ) : null}
        <div id="game" className="game" />
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
        {this.state.showHistoryModal ? (
          <HistoryModal hideHistoryModal={this.hideHistoryModal} />
        ) : null}
      </div>
    );
  }
}

export default App;
