import React, { Component } from "react";
import {
  TimelineMax,
  TweenMax,
  TweenLite,
  TimelineLite,
  CSSPlugin
} from "gsap/all";

import "../css/CardAnimation.css";

class CardAnimation extends Component {
  constructor(props) {
    super(props);
    this.cardEles = [];
    this.cardFrontBgEles = [];
    this.cardFrontEles = [];
    this.cardBackEles = [];
    this.myTween = new TimelineMax({ paused: true });

    CSSPlugin.defaultTransformPerspective = 1000;
  }

  componentDidMount() {
    TweenMax.set(".flipped", { rotationY: -180 });
    TweenMax.lagSmoothing(0);
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

    if (this.props.cards.length === 4) {
      this.myTween
        .to(this.cardEles[0], cardDealingDuration, {
          x: -window.innerWidth / firstDealtCardPostionXFactor,
          y: window.innerHeight / cardPositionYFactor,
          rotation: 0,
          width: cardWidth,
          height: cardHeight
        })
        .to(this.cardEles[1], cardDealingDuration, {
          x: -window.innerWidth / secondDealtCardPositionXFactor,
          y: window.innerHeight / cardPositionYFactor,
          rotation: 0,
          width: cardWidth,
          height: cardHeight
        })
        .to(this.cardEles[2], cardDealingDuration, {
          x: -window.innerWidth / firstDealtCardPostionXFactor + offsetX,
          y: window.innerHeight / cardPositionYFactor,
          rotation: 0,
          width: cardWidth,
          height: cardHeight
        })
        .to(this.cardEles[3], cardDealingDuration, {
          x: -window.innerWidth / secondDealtCardPositionXFactor + offsetX,
          y: window.innerHeight / cardPositionYFactor,
          rotation: 0,
          width: cardWidth,
          height: cardHeight
        })
        .to(this.cardFrontEles[0], cardFlippingDuration, { rotationY: 0 })
        .to(
          this.cardBackEles[0],
          cardFlippingDuration,
          { rotationY: 180 },
          "-=" + cardFlippingDuration
        )
        .to(
          this.cardFrontBgEles[0],
          cardFlippingDuration,
          { rotationY: 0 },
          "-=" + cardFlippingDuration
        )
        .to(this.cardFrontEles[1], cardFlippingDuration, { rotationY: 0 })
        .to(
          this.cardBackEles[1],
          cardFlippingDuration,
          { rotationY: 180 },
          "-=" + cardFlippingDuration
        )
        .to(
          this.cardFrontBgEles[1],
          cardFlippingDuration,
          { rotationY: 0 },
          "-=" + cardFlippingDuration
        )
        .to(this.cardBackEles[2], cardBackSlidingDuration, {
          x: cardWidth / 2
        })
        .to(this.cardBackEles[2], cardBackDippingDuration, {
          rotation: "30%",
          x: cardWidth,
          y: cardHeight / 3,
          opacity: 0
        })
        .to(this.cardBackEles[3], cardBackSlidingDuration, {
          x: cardWidth / 2
        })
        .to(this.cardBackEles[3], cardBackDippingDuration, {
          rotation: "30%",
          x: cardWidth,
          y: cardHeight / 3,
          opacity: 0
        })

        .play();
    } else {
    }
  }

  render() {
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
              />
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
      </div>
    );
  }
}

export default CardAnimation;
