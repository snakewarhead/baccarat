import React, { Component } from "react";
import anime from "animejs";
import "../css/CardActions.css";

import cardBack from "../assets/cardImages/card.png";
import cardFrontEmpty from "../assets/cardImages/card-empty.png";

import cardImageObj from "../utils/cardImages";
import tie from "../assets/cardImages/tie.png";
import playerWins from "../assets/cardImages/playerWins.png";
import bankWins from "../assets/cardImages/bankWins.png";

class CardActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayPointsForFirstPair: false,
      displayPointsForSecondPair: false
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
            // return self.putCards(1000);
          })
          .then(() => {
            // return self.coverCards(3000);
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
    console.log(
      this.getCards()[index].style.right,
      this.getCards()[index].style.transform
    );

    let first = {};
    let second = {};
    if (index === 0) {
      first.right = this.getCards()[index].style.right;
      first.transform = `translateX(${this.getCards()[index].translateX +
        this.getCards()[index].style.width *
          0.27}px) translateY(${this.getCards()[index].translateY +
        this.getCards()[index].style.height -
        this.getCards()[index].style.height * 0.3}px)  `;
      first.height = this.getCards()[index].style.height * 0.3 + "px";
      first.width = this.getCards()[index].style.width * 0.5 + "px";
    } else if (index === 1) {
      second.right = this.getCards()[index].style.right;
      second.transform = `translateX(${this.getCards()[index].translateX +
        this.getCards()[index].style.width *
          0.27}px) translateY(${this.getCards()[index].translateY +
        this.getCards()[index].style.height -
        this.getCards()[index].style.height * 0.3}px)  `;
      second.height = this.getCards()[index].style.height * 0.3 + "px";
      second.width = this.getCards()[index].style.width * 0.5 + "px";
    }

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
                  : prevState.secondPairLocation
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
    return new Promise(resolve => {
      setTimeout(() => {
        this.setState(
          {
            cards: this.state.cards.map((card, i) => {
              if (index === i) {
                card.checked = true;
              }
              return card;
            })
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
    return anime({
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
  }

  coverCards(delay) {
    const randoNum = Math.random();
    this.setState({
      displayWinner:
        randoNum < 0.33 ? tie : randoNum < 0.66 ? bankWins : playerWins
    });

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
              displayWinner: null
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
          <div className="display-winner">
            <img src={this.state.displayWinner} />
          </div>
        ) : null}
        {this.state.displayPointsForFirstPair ? (
          <div
            className="first-pair-points"
            style={this.state.firstPairLocation}
          />
        ) : null}
        {this.state.displayPointsForSecondPair ? (
          <div
            className="second-pair-points"
            style={this.state.secondPairLocation}
          />
        ) : null}
      </div>
    );
  }
}

export default CardActions;
