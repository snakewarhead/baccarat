import { tableHistory } from "../utils/tempValues";
import {
  beadPlateHistoryTop,
  beadPlateHistoryBottom
} from "../utils/tempValues";

export function getTablesHistory() {
  return Promise.resolve(tableHistory);
}

export function getBeadPlateHistory() {
  return Promise.resolve({ beadPlateHistoryTop, beadPlateHistoryBottom });
}

export function getCards() {
  let screenHeight = window.screen.availHeight;

  let cards = [];

  let cardNum = Math.random() < 0.5 ? 4 : 6;

  for (let i = 0; i < cardNum; i++) {
    //s,h,d,c
    const randoNum = Math.random();
    let randoColor =
      randoNum < 0.25
        ? "s"
        : randoNum < 0.5
        ? "h"
        : randoNum < 0.75
        ? "d"
        : "c";

    cards.push({ color: randoColor, number: Math.ceil(Math.random() * 13) });
  }

  cards = cards.map((card, index) => {
    card.style = {
      top: "0%",
      right: (screenHeight * 0.3 * 200) / 270,
      width: (screenHeight * 0.3 * 200) / 270,
      height: screenHeight * 0.3,
      transform: "rotate(-60deg)",
      opacity: 0
    };

    console.log(card.style);
    return card;
  });

  cards = cards.map((card, index) => {
    const CARD_RATE = parseFloat(
      (card.style.width / global.screen.width).toFixed(4)
    );
    const CARD_MARGIN = 0.0025;

    if (index % 2 === 0) {
      if (index !== 4) {
        card.translateX =
          -1 *
            ((1 - index / 2) * (CARD_RATE + CARD_MARGIN) + 0.5) *
            global.screen.width +
          card.style.right;
      } else {
        card.translateX =
          -1 * (2 * (CARD_RATE + CARD_MARGIN) + 0.5) * global.screen.width +
          card.style.right;
      }
    } else {
      card.translateX =
        -1 *
          (0.5 - ((CARD_RATE * (index + 1)) / 2 + CARD_MARGIN * index)) *
          global.screen.width +
        card.style.right;
    }
    card.translateY = screenHeight / 2 - (card.style.height * 3) / 4;
    return card;
  });

  return Promise.resolve({ cards, winning: 200000 });
}
