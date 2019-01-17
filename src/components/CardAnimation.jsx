import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import {
  TimelineMax,
  TweenMax,
  TweenLite,
  TimelineLite,
  CSSPlugin
} from "gsap/all";

import { cardImageObj, numberImageObj } from "../utils/cardImages";
import { animateFourCards } from "../utils/helperFunctions";
import "../css/CardAnimation.css";

import naturalBannerFirstPairOnce from "../assets/cardImages/Misc/natural1.gif";
import naturalBannerSecondPairOnce from "../assets/cardImages/Misc/natural2.gif";
import naturalBannerLoop from "../assets/cardImages/Misc/natural-repeat.gif";

class CardAnimation extends Component {
  constructor(props) {
    super(props);
    this.cardEles = [];
    this.cardFrontBgEles = [];
    this.cardFrontEles = [];
    this.cardBackEles = [];
    this.pointDisplays = [];
    this.myTween = new TimelineMax({ paused: true });

    this.state = {
      //fitst element in the array corresponds to the first dealt card
      showTopLeftCoverOnCard: [false, false, false, false, false, false],
      firstPairPoints:
        this.props.cards[0].number >= 10 ? 0 : this.props.cards[0].number,
      secondPairPoints:
        this.props.cards[1].number >= 10 ? 0 : this.props.cards[1].number,
      displayNaturalBannerForFirstPair: false,
      displayNaturalBannerForSecondPair: false,
      naturalBannerForFirstPair: naturalBannerFirstPairOnce,
      naturalBannerForSecondPair: naturalBannerSecondPairOnce
    };

    CSSPlugin.defaultTransformPerspective = 1000;
  }

  componentDidMount() {
    this.cards = this.props.cards;

    const cardWidth = window.innerWidth / 8.5;
    const cardHeight = window.innerHeight / 3.2;

    const firstDealtCardPostionXFactor = 2.13;
    const secondDealtCardPositionXFactor = 4.25;
    const cardPositionYFactor = 4.35;
    const offsetX = cardWidth / 1.07;
    const cardDealingDuration = 0.5;
    const cardFlippingDuration = 0.5;
    const cardBackSlidingDuration = 0.3;
    const cardBackDippingDuration = 0.3;

    TweenMax.set(".flipped", { rotationY: -180 });

    //this is to let the animation continue even if the tab is inactive
    TweenMax.lagSmoothing(0);

    //update card front with the correct background image
    this.cardFrontEles.forEach((cardFront, i) => {
      cardFront.style.backgroundImage = `url(${
        cardImageObj[this.cards[i].color + this.cards[i].number]
      })`;
    });

    if (this.cards.length === 4) {
      animateFourCards(
        cardWidth,
        cardHeight,
        cardDealingDuration,
        cardFlippingDuration,
        cardBackSlidingDuration,
        cardBackDippingDuration,
        firstDealtCardPostionXFactor,
        secondDealtCardPositionXFactor,
        cardPositionYFactor,
        offsetX,
        this
      );
    } else {
    }
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
    const blueNumMap = [b0, b1, b2, b3, b4, b5, b6, b7, b8, b9];
    const redNumMap = [r0, r1, r2, r3, r4, r5, r6, r7, r8, r9];

    return (
      <div className="cards-container">
        {this.props.cards.map((card, i) => {
          return (
            <div className="card" ref={div => (this.cardEles[i] = div)} key={i}>
              <div
                className={
                  i < 2 ? "cardFrontBg flipped" : "cardFrontBg nonFlipped"
                }
                ref={div => (this.cardFrontBgEles[i] = div)}
              >
                {this.state.showTopLeftCoverOnCard[i] ? (
                  <div className="top-left-card-cover" />
                ) : null}
              </div>
              <div
                className={i < 2 ? "cardFront flipped" : "cardFront nonFlipped"}
                ref={div => (this.cardFrontEles[i] = div)}
              />
              <div
                className="cardBack"
                ref={div => (this.cardBackEles[i] = div)}
              />
            </div>
          );
        })}
        <div
          className="first-pair-points-container"
          ref={div => (this.pointDisplays[0] = div)}
        >
          <img
            className="points"
            src={blueNumMap[this.state.firstPairPoints]}
          />
        </div>
        <div
          className="second-pair-points-container"
          ref={div => (this.pointDisplays[1] = div)}
        >
          <img
            className="points"
            src={redNumMap[this.state.secondPairPoints]}
          />
        </div>

        {this.state.displayNaturalBannerForFirstPair ? (
          <CSSTransition in={true} appear={true} timeout={300} classNames="pop">
            <div className="first-pair-natural-banner">
              <img src={this.state.naturalBannerForFirstPair} />
            </div>
          </CSSTransition>
        ) : null}

        {this.state.displayNaturalBannerForSecondPair ? (
          <CSSTransition in={true} appear={true} timeout={300} classNames="pop">
            <div className="second-pair-natural-banner">
              <img src={this.state.naturalBannerForSecondPair} />
            </div>
          </CSSTransition>
        ) : null}
      </div>
    );
  }
}

export default CardAnimation;
