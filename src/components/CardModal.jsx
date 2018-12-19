import React, { Component } from "react";
import "../css/CardModal.css";

class CardModal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //TODO: rewrite this code to make it more declarative!

    const card1 = document.querySelector(".flip-card.card-1");
    const card2 = document.querySelector(".flip-card.card-2");
    const card2Inner = document.querySelector(".flip-card-inner.card-2");

    const card3 = document.querySelector(".flip-card.card-3");
    const card4 = document.querySelector(".flip-card.card-4");
    const card4Inner = document.querySelector(".flip-card-inner.card-4");
    setTimeout(() => {
      card1.style.bottom = "50%";
      card1.style.right = "80%";
      card2.style.bottom = "50%";
      card2.style.right = "65%";
      card2Inner.style.transform = "rotateX(180deg)";

      card3.style.bottom = "50%";
      card3.style.right = "15%";
      card4.style.bottom = "50%";
      card4.style.right = "0%";
      card4Inner.style.transform = "rotateX(180deg)";
    }, 1000);

    setTimeout(() => {
      this.props.hideCardModal();
    }, 3000);
  }

  render() {
    return (
      <div className="modal">
        <div className="container">
          <div className="flip-card card-1">
            <div className="flip-card-inner card-1">
              <div className="flip-card-front-no-back front-1 card-1" />
              <div className="flip-card-front-no-back front-2 card-1" />
            </div>
          </div>

          <div className="flip-card card-2">
            <div className="flip-card-inner card-2">
              <div className="flip-card-front card-2" />
              <div className="flip-card-back back1 card-2" />
              <div className="flip-card-back back2 card-2" />
            </div>
          </div>

          <div className="flip-card card-3">
            <div className="flip-card-inner card-3">
              <div className="flip-card-front-no-back front-1 card-3" />
              <div className="flip-card-front-no-back front-2 card-3" />
            </div>
          </div>

          <div className="flip-card card-4">
            <div className="flip-card-inner card-4">
              <div className="flip-card-front card-4" />
              <div className="flip-card-back back1 card-4" />
              <div className="flip-card-back back2 card-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardModal;
