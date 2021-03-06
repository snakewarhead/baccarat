import React, { Component } from "react";
import Phaser from "phaser";
import "../css/App.css";
import screenfull from "screenfull";
import {
  getMobileOperatingSystem,
  isMobile,
  resizeApp,
  centerPortraitGif,
  goFullscreen
} from "../utils/helperFunctions";
import TopNavBar from "../components/firstPageUIOverlay/TopNavBar.jsx";
import HistoryModal from "../components/HistoryModal.jsx";
import SoundModal from "../components/SoundModal.jsx";
import BeadPlateModal from "../components/BeadPlateModal.jsx";
import InstructionModal from "../components/InstructionModal.jsx";
import TallyConfirmationModal from "../components/TallyConfirmationModal.jsx";
import TallyModal from "../components/TallyModal.jsx";
import SecondPageUIOverlay from "../components/secondPageUIOverlay/SecondPageUIOverlay.jsx";
import Loading from "../scenes/Loading";
import Main from "../scenes/Main";
import Tables from "../scenes/Tables";
import OutOfMoneyModal from "./OutOfMoneyModal";

let lastScrollTop = 0;

const preloadImgArr = new Array(50).fill(0);

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
      showBackgroundTwo: false,
      balance: 50000,
      showHistoryModal: false,
      showBeadPlateModal: false,
      showSoundModal: false,
      showInstructionModal: false,
      showTallyConfirmationModal: false,
      showTallyModal: false,
      tableNo: 0,
      visibilitychange: "visible"
    };

    var hidden, state, visibilityChange;
    if (typeof document.hidden !== "undefined") {
      hidden = "hidden";
      visibilityChange = "visibilitychange";
      state = "visibilityState";
    } else if (typeof document.mozHidden !== "undefined") {
      hidden = "mozHidden";
      visibilityChange = "mozvisibilitychange";
      state = "mozVisibilityState";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
      state = "msVisibilityState";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
      state = "webkitVisibilityState";
    }
    // Add a listener that constantly changes the title
    document.addEventListener(
      visibilityChange,
      () => {
        document.title = document[state];
        console.log(document.title);
        this.setState({
          visibilityChange: document.title
        });
      },
      false
    );

    window.addEventListener("resize", resizeApp);
    window.addEventListener(
      "fromTableToMain",
      function() {
        this.setState({ showBackgroundOne: false, showBackgroundTwo: true });
      }.bind(this)
    );
    window.addEventListener(
      "finishLoadingGame",
      function() {
        this.setState({ showBackgroundOne: true });
      }.bind(this)
    );
    window.addEventListener(
      "tablePicked",
      function(e) {
        this.setState({ tableNo: e.detail });
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
        if (screenfull.enabled && screenfull.isFullscreen) {
          screenfull.exit();
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
      }, 1000);

      window.addEventListener(
        "scroll",
        function(e) {
          this.setState(function(prevState) {
            return {
              scrollCounter: prevState.scrollCounter + 1
            };
          });
          if (this.state.scrollCounter >= 5) {
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
    this.setState({ showHistoryModal: false });
  };

  showBeadPlateModal = () => {
    this.setState({ showBeadPlateModal: true });
  };

  hideBeadPlateModal = () => {
    this.setState({ showBeadPlateModal: false });
  };

  showSoundModal = () => {
    this.setState({ showSoundModal: true });
  };

  hideSoundModal = () => {
    this.setState({ showSoundModal: false });
  };

  showInstructionModal = () => {
    this.setState({ showInstructionModal: true });
  };

  hideInstructionModal = () => {
    this.setState({ showInstructionModal: false });
  };

  showTallyConfirmationModal = () => {
    this.setState({ showTallyConfirmationModal: true });
  };

  hideTallyConfirmationModal = () => {
    this.setState({ showTallyConfirmationModal: false });
  };

  showTallyModal = () => {
    this.setState({
      showTallyModal: true
    });
  };

  hideTallyModal = () => {
    this.setState({
      showTallyModal: false
    });
  };

  showOutOfMoneyModal = () => {
    this.setState({
      showOutOfMoneyModal: true
    });
  };

  hideOutOfMoneyModal = () => {
    this.setState({
      showOutOfMoneyModal: false
    });
  };

  render() {
    const { mobile, inLandscapeMode, mobileIOS } = this.state;

    return (
      <div className="background">
        {this.state.showBackgroundOne ? (
          <TopNavBar
            balance={this.state.balance}
            showHistoryModal={this.showHistoryModal}
            showSoundModal={this.showSoundModal}
            showInstructionModal={this.showInstructionModal}
            showTallyConfirmationModal={this.showTallyConfirmationModal}
          />
        ) : null}
        {this.state.showBackgroundTwo ? (
          <SecondPageUIOverlay
            showHistoryModal={this.showHistoryModal}
            showCardModal={this.showCardModal}
            showBeadPlateModal={this.showBeadPlateModal}
            showSoundModal={this.showSoundModal}
            showInstructionModal={this.showInstructionModal}
            showTallyConfirmationModal={this.showTallyConfirmationModal}
            hideOutOfMoneyModal={this.hideOutOfMoneyModal}
            ref={ourComponent => {
              window.SecondPageUIOverlay = ourComponent;
            }}
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
        {this.state.showBeadPlateModal ? (
          <BeadPlateModal hideBeadPlateModal={this.hideBeadPlateModal} />
        ) : null}
        {this.state.showSoundModal ? (
          <SoundModal hideSoundModal={this.hideSoundModal} />
        ) : null}
        {this.state.showInstructionModal ? (
          <InstructionModal hideInstructionModal={this.hideInstructionModal} />
        ) : null}
        {this.state.showTallyConfirmationModal ? (
          <TallyConfirmationModal
            hideTallyConfirmationModal={this.hideTallyConfirmationModal}
            showTallyModal={this.showTallyModal}
          />
        ) : null}
        {this.state.showTallyModal ? (
          <TallyModal hideTallyModal={this.hideTallyModal} />
        ) : null}
        {this.state.showOutOfMoneyModal ? (
          <OutOfMoneyModal hideOutOfMoneyModal={this.hideOutOfMoneyModal} />
        ) : null}
        {preloadImgArr.map((ele, i) => {
          return <div className={`no-display app img${i}`} />;
        })}
      </div>
    );
  }
}

export default App;
