import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import anime from "animejs";
import "../css/CardActions.css";

import cardBack from "../assets/cardImages/card.png";
import cardFrontEmpty from "../assets/cardImages/card-empty.png";

import {
  cardImageObj,
  numberImageObj,
  winningDigitImageArr
} from "../utils/cardImages";
import tie from "../assets/cardImages/tie.png";
import playerWins from "../assets/cardImages/playerWins.png";
import bankWins from "../assets/cardImages/bankWins.png";
import winBanner from "../assets/cardImages/resultBanner/winBanner.png";
import goldCoinShower from "../assets/cardImages/resultBanner/gold-coin-shower.gif";

class CardActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayPointsForFirstPair: false,
      displayPointsForSecondPair: false,
      displayResultBanner: false,
      currentWinning: 0
    };
  }

  getCards() {
    return this.state.cards;
  }

  // implement
  processCards(cards) {
    let self = this;

    return this.setState(
      {
        cards: cards
      },
      () => {
        let promise = Promise.resolve(0)
          // deal card
          .then(() => {
            return self.dealCard(0);
          })
          .then(() => {
            return self.dealCard(1);
          })
          .then(() => {
            return self.dealCard(2);
          })
          .then(() => {
            return self.dealCard(3);
          })
          // flip card and check card
          .then(() => {
            return self.flipCard(0, 500);
          })
          .then(() => {
            return self.flipCard(1, 500);
          })
          .then(() => {
            return self.checkCard(2, 1000);
          })
          .then(() => {
            return self.checkCard(3, 1000);
          });

        // draw card
        let checkIndex = 4;
        if (checkIndex < cards.length && cards[checkIndex]) {
          promise = promise
            .then(() => {
              return self.dealCard(checkIndex, 1000);
            })
            .then(() => {
              return self.checkCard(checkIndex, 1000);
            })
            .then(() => {
              checkIndex++;
            });
        }

        if (checkIndex < cards.length && cards[checkIndex]) {
          promise = promise
            .then(() => {
              return self.dealCard(checkIndex, 1000);
            })
            .then(() => {
              return self.checkCard(checkIndex, 1000);
            })
            .then(() => {
              checkIndex++;
            });
        }

        promise
          .then(() => {
            return self.putCards(1000);
          })
          .then(() => {
            return self.showResult(3000);
          })
          .then(() => {
            return self.showResultBanner(3000);
          })
          .then(() => {
            // return self.coverCards(5000);
          })
          .then(() => {
            const delay = 400;
            // return self.backCards(function(el, i, l) {
            //   if (i === 4) return 0 * delay;
            //   if (i === 0) return 1 * delay;
            //   if (i === 2) return 2 * delay;
            //   if (i === 1) return 3 * delay;
            //   if (i === 3) return 4 * delay;
            //   if (i === 5) return 5 * delay;
            //   return i * delay;
            // });
          });
      }
    );
  }

  dealCard(index, delay) {
    return anime({
      targets: [Array.from(document.querySelectorAll(".card"))[index]],
      easing: "linear",
      delay: delay ? delay : 500,
      duration: 150,
      translateX: this.getCards()[index].translateX,
      translateY: this.getCards()[index].translateY,
      rotate: 360,
      opacity: 1
    }).finished;
  }

  flipCard(index, delay) {
    const card = this.getCards()[index];

    let first = {};
    let second = {};
    if (index === 0) {
      first.right = this.getCards()[index].style.right;
      first.transform = `translateX(${card.translateX +
        card.style.width * 0.27}px) translateY(${card.translateY +
        card.style.height -
        card.style.height * 0.3}px)  `;
      first.height = card.style.height * 0.3 + "px";
      first.width = card.style.width * 0.5 + "px";
    } else if (index === 1) {
      second.right = card.style.right;
      second.transform = `translateX(${card.translateX +
        card.style.width * 0.27}px) translateY(${card.translateY +
        card.style.height -
        card.style.height * 0.3}px)  `;
      second.height = card.style.height * 0.3 + "px";
      second.width = card.style.width * 0.5 + "px";
    }

    let cardNumber = card.number > 10 ? 10 : card.number;

    return new Promise(resolve => {
      setTimeout(() => {
        this.setState(
          prevState => {
            return {
              cards: this.state.cards.map((card, i) => {
                if (index === i) card.filp = true;
                return card;
              }),
              displayPointsForFirstPair: prevState.displayPointsForFirstPair
                ? true
                : index === 0,
              displayPointsForSecondPair: prevState.displayPointsForSecondPair
                ? true
                : index === 1,
              firstPairLocation:
                index === 0
                  ? {
                      right: first.right,
                      transform: first.transform,
                      width: first.width,
                      height: first.height
                    }
                  : prevState.firstPairLocation,
              secondPairLocation:
                index === 1
                  ? {
                      right: second.right,
                      transform: second.transform,
                      width: second.width,
                      height: second.height
                    }
                  : prevState.secondPairLocation,
              valueOfFirstPair:
                index === 0 ? cardNumber % 10 : prevState.valueOfFirstPair,
              valueOfSecondPair:
                index === 1 ? cardNumber % 10 : prevState.valueOfSecondPair
            };
          },
          () => {
            resolve(0);
          }
        );
      }, delay);
    });
  }

  checkCard(index, delay) {
    console.log(index);

    const card = this.getCards()[index];
    let cardNumber = card.number > 10 ? 10 : card.number;
    return new Promise(resolve => {
      setTimeout(() => {
        this.setState(
          prevState => {
            return {
              cards: this.state.cards.map((card, i) => {
                if (index === i) {
                  card.checked = true;
                }
                return card;
              }),
              valueOfFirstPair:
                index % 2 === 0
                  ? (prevState.valueOfFirstPair += cardNumber) % 10
                  : prevState.valueOfFirstPair,
              valueOfSecondPair:
                index % 2 === 1
                  ? (prevState.valueOfSecondPair += cardNumber) % 10
                  : prevState.valueOfSecondPair
            };
          },
          () => {
            resolve(0);
          }
        );
      }, delay);
    });
  }

  putCards(delay) {
    const self = this;
    var ss = anime({
      targets: ".card",
      easing: "linear",
      delay: delay ? delay : 500,
      duration: 150,
      scale: 0.75,
      translateY: function(el, i, l) {
        return self.getCards()[i].translateY - global.screen.height * 0.2;
      },
      translateX: function(el, i, l) {
        let card = self.getCards()[i];
        return card.translateX - 1 * card.style.width;
      }
    }).finished;

    const firstTranslateXStr = document
      .querySelector(".first-pair-points")
      .style.transform.split(" ")[0];

    const firstTranslateYStr = document
      .querySelector(".first-pair-points")
      .style.transform.split(" ")[1];

    const firstTranslateXValue = firstTranslateXStr.substring(
      11,
      firstTranslateXStr.length - 3
    );
    const firstTranslateYValue = firstTranslateYStr.substring(
      11,
      firstTranslateYStr.length - 3
    );

    var vv = anime({
      targets: ".first-pair-points",
      easing: "linear",
      delay: delay ? delay : 500,
      duration: 150,
      scale: 0.75,
      translateY: function(el, i, l) {
        return firstTranslateYValue - global.screen.height * 0.17;
      },
      translateX: function(el, i, l) {
        return (
          firstTranslateXValue -
          document
            .querySelector(".first-pair-points")
            .style.width.substring(
              0,
              document.querySelector(".first-pair-points").style.width.length -
                2
            ) *
            2.2
        );
      }
    }).finished;

    const secondTranslateXStr = document
      .querySelector(".second-pair-points")
      .style.transform.split(" ")[0];

    const secondTranslateYStr = document
      .querySelector(".second-pair-points")
      .style.transform.split(" ")[1];

    const secondTranslateXValue = secondTranslateXStr.substring(
      11,
      secondTranslateXStr.length - 3
    );
    const secondTranslateYValue = secondTranslateYStr.substring(
      11,
      secondTranslateYStr.length - 3
    );

    var vv = anime({
      targets: ".second-pair-points",
      easing: "linear",
      delay: delay ? delay : 500,
      duration: 150,
      scale: 0.75,
      translateY: function(el, i, l) {
        return secondTranslateYValue - global.screen.height * 0.17;
      },
      translateX: function(el, i, l) {
        return (
          secondTranslateXValue -
          document
            .querySelector(".second-pair-points")
            .style.width.substring(
              0,
              document.querySelector(".second-pair-points").style.width.length -
                2
            ) *
            2.15
        );
      }
    }).finished;
    return vv;
  }

  showResult(delay) {
    const randoNum = Math.random();
    this.setState({
      displayWinner:
        randoNum < 0.33 ? tie : randoNum < 0.66 ? bankWins : playerWins
    });
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
  }

  showResultBanner(delay) {
    this.setState(
      {
        displayResultBanner: true,
        displayGoldCoinShower: true
      },
      function() {
        let counter = 0;
        let delta = this.props.currentWinning / 100;
        const step = () => {
          counter++;

          this.setState(prevState => {
            return {
              currentWinning: (prevState.currentWinning += delta)
            };
          });
          if (counter < 100) requestAnimationFrame(step);
        };

        step();
      }
    );
    return new Promise(resolve => {
      setTimeout(() => {
        this.setState(
          {
            displayGoldCoinShower: false
          },
          resolve
        );
      }, delay);
    });
  }

  coverCards(delay) {
    return new Promise(resolve => {
      setTimeout(
        () => {
          this.setState(
            {
              cards: this.state.cards.map((card, i) => {
                card.filp = false;
                card.checked = false;
                card.cover = true;
                return card;
              }),
              displayWinner: null,
              displayPointsForFirstPair: false,
              displayPointsForSecondPair: false,
              displayResultBanner: false
            },
            () => {
              resolve(0);
            }
          );
        },
        delay ? delay : 0
      );
    });
  }

  backCards(delay) {
    const self = this;
    return anime({
      targets: ".card",
      easing: "linear",
      delay: delay ? delay : 500,
      duration: 150,
      scale: 0.75,
      translateY: 0,
      translateX: -global.screen.width,
      opacity: 0
    }).finished.then(() => {
      return self.setState({ cards: [], displayWinner: null });
    });
  }

  getCardClass(card) {
    return (
      (card.filp ? " flip-vertical-left" : "") +
      (card.checked ? " slide-right-drop-down" : "") +
      (card.cover ? " flip-vertical-right" : "")
    );
  }

  componentDidMount() {
    this.processCards(this.props.cards);
  }

  render() {
    const {
      b0,
      b1,
      b2,
      b3,
      b4,
      b5,
      b6,
      b7,
      b8,
      b9,
      r0,
      r1,
      r2,
      r3,
      r4,
      r5,
      r6,
      r7,
      r8,
      r9
    } = numberImageObj;
    const leftPointDisplayMap = [b0, b1, b2, b3, b4, b5, b6, b7, b8, b9];
    const rightPointDisplayMap = [r0, r1, r2, r3, r4, r5, r6, r7, r8, r9];

    const winningArr = (this.state.currentWinning + "").split("");

    return (
      <div className="cards">
        {(this.state.cards || []).map((card, i) => {
          return (
            <div
              className={"card" + this.getCardClass(card)}
              style={card.style}
            >
              <div className="card-inner">
                <div className="card-back">
                  <img src={cardBack} alt="card" />
                </div>
                <div className="card-front" alt="front">
                  <img src={cardFrontEmpty} alt="card-empty" />
                  <img
                    className="card-front-num"
                    alt={card.color + "-" + card.number}
                    src={cardImageObj[card.color + card.number]}
                  />
                </div>
              </div>
            </div>
          );
        })}
        {this.state.displayWinner ? (
          <CSSTransition
            in={true}
            appear={true}
            timeout={600}
            classNames="fade"
          >
            <div className="display-winner">
              <img src={this.state.displayWinner} />
            </div>
          </CSSTransition>
        ) : null}
        {this.state.displayResultBanner ? (
          <CSSTransition
            in={true}
            appear={true}
            timeout={600}
            classNames="fade"
          >
            <div className="result-banner">
              <img src={winBanner} className="result-banner-bg" />
              <div className="winning-digits-holder">
                {winningArr.map(num => {
                  return <img src={winningDigitImageArr[num]} />;
                })}
              </div>
            </div>
          </CSSTransition>
        ) : null}
        {this.state.displayGoldCoinShower ? (
          <div className="gold-coin-shower">
            <img src={goldCoinShower} />
          </div>
        ) : null}
        {this.state.displayPointsForFirstPair ? (
          <div
            className="first-pair-points "
            style={this.state.firstPairLocation}
          >
            <img src={leftPointDisplayMap[this.state.valueOfFirstPair]} />
          </div>
        ) : null}
        {this.state.displayPointsForSecondPair ? (
          <div
            className="second-pair-points "
            style={this.state.secondPairLocation}
          >
            <img src={rightPointDisplayMap[this.state.valueOfSecondPair]} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default CardActions;
