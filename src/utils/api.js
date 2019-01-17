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

export function getCards(betDetail) {
  let screenHeight = window.screen.availHeight;

  let cards = [];

  let cardNum = Math.random() < 0.5 ? 4 : 6;
  //let cardNum = 6;

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
    //cards.push({ color: randoColor, number: 4 });
  }

  cards = cards.map((card, index) => {
    card.style = {
      top: "0%",
      right: (screenHeight * 0.3 * 200) / 270,
      // width: (screenHeight * 0.3 * 200) / 270,
      // height: screenHeight * 0.3,
      width: (screenHeight * 0.3 * 200) / 280,
      height: screenHeight * 0.29,
      transform: "rotate(-60deg)",
      opacity: 0
    };

    return card;
  });

  cards = cards.map((card, index) => {
    const CARD_RATE = parseFloat(
      (card.style.width / global.screen.width).toFixed(4)
    );
    const CARD_MARGIN = 0.0025;

    if (index % 2 === 0) {
      if (index !== 4) {
        console.log("index" + index);
        //0,2

        const factor = index === 2 ? 1.03 : 1;
        card.translateX =
          (-1 *
            ((1 - index / 2) * (CARD_RATE + CARD_MARGIN) + 0.5) *
            global.screen.width +
            card.style.right) *
          factor;
      } else {
        //4
        const factor = 0.98;
        card.translateX =
          (-1 * (2 * (CARD_RATE + CARD_MARGIN) + 0.5) * global.screen.width +
            card.style.right) *
          factor;
      }
    } else {
      //1,3,5
      console.log(index);
      const factor = index === 1 ? 0.97 : index === 3 ? 1.05 : 1.5;
      card.translateX =
        (-1 *
          (0.5 - ((CARD_RATE * (index + 1)) / 2 + CARD_MARGIN * index)) *
          global.screen.width +
          card.style.right) *
        factor;
    }
    card.translateY = screenHeight / 2 - (card.style.height * 3) / 4;
    return card;
  });

  //cardNum === 4 => 0,2     1,3
  //cardNum === 6 => 0,2,4   1,3,5

  // 6 outcomes: 0:閒對, 1:閒贏, 2:超級六, 3:和, 4:莊贏, 5:莊對
  // 莊贏: 莊家合計點數大於閒家
  // 閒贏: 閒家合計點數大於莊家
  // 和: 兩家合計點數相同
  // 莊對: 莊家前兩張牌發出相同的牌則為莊對 例：紅心8，方塊8
  // 閒對: 閒家前兩張牌發出相同的牌則為閒對 例：梅花k,黑桃k
  // 超級六: 莊家以6點大過閒家

  const outcomes = [];
  if (cardNum === 4) {
    const card0Num = cards[0].number > 10 ? 10 : cards[0].number;
    const card1Num = cards[1].number > 10 ? 10 : cards[1].number;
    const card2Num = cards[2].number > 10 ? 10 : cards[2].number;
    const card3Num = cards[3].number > 10 ? 10 : cards[3].number;

    const playerTotal = (card0Num + card2Num) % 10;
    const bankTotal = (card1Num + card3Num) % 10;

    if (playerTotal > bankTotal) {
      //閒贏
      outcomes.push(1);
    } else if (playerTotal < bankTotal) {
      //莊贏
      outcomes.push(4);

      if (bankTotal === playerTotal + 6) {
        //超級六
        outcomes.push(2);
      }
    } else {
      //和
      outcomes.push(3);
    }

    if (cards[1].color === cards[3].color) {
      //莊對
      outcomes.push(5);
    }

    if (cards[0].color === cards[2].color) {
      //閒對
      outcomes.push(0);
    }
  } else {
    const card0Num = cards[0].number > 10 ? 10 : cards[0].number;
    const card1Num = cards[1].number > 10 ? 10 : cards[1].number;
    const card2Num = cards[2].number > 10 ? 10 : cards[2].number;
    const card3Num = cards[3].number > 10 ? 10 : cards[3].number;
    const card4Num = cards[4].number > 10 ? 10 : cards[4].number;
    const card5Num = cards[5].number > 10 ? 10 : cards[5].number;

    const playerTotal = (card0Num + card2Num + card4Num) % 10;
    const bankTotal = (card1Num + card3Num + card5Num) % 10;

    if (playerTotal > bankTotal) {
      //閒贏
      outcomes.push(1);
    } else if (playerTotal < bankTotal) {
      //莊贏
      outcomes.push(4);

      if (bankTotal === playerTotal + 6) {
        //超級六
        outcomes.push(2);
      }
    } else {
      //和
      outcomes.push(3);
    }

    if (cards[1].color === cards[3].color) {
      //莊對
      outcomes.push(5);
    }

    if (cards[0].color === cards[2].color) {
      //閒對
      outcomes.push(0);
    }
  }

  const oddsMap = [11, 1, 12, 8, 1, 11];
  let winning = 0;
  outcomes.forEach(winningLocation => {
    winning += betDetail[winningLocation] * oddsMap[winningLocation];
  });

  return Promise.resolve({ cards, winning, outcomes });
}

// export function getCards(betDetail) {
//   let cards = [];

//   //let cardNum = Math.random() < 0.5 ? 4 : 6;
//   let cardNum = 4;

//   for (let i = 0; i < cardNum; i++) {
//     //s,h,d,c
//     const randoNum = Math.random();
//     let randoColor =
//       randoNum < 0.25
//         ? "s"
//         : randoNum < 0.5
//         ? "h"
//         : randoNum < 0.75
//         ? "d"
//         : "c";

//     cards.push({ color: randoColor, number: Math.ceil(Math.random() * 13) });
//     // cards.push({ color: randoColor, number: 4 });
//   }

//   //cardNum === 4 => 0,2     1,3
//   //cardNum === 6 => 0,2,4   1,3,5

//   // 6 outcomes: 0:閒對, 1:閒贏, 2:超級六, 3:和, 4:莊贏, 5:莊對
//   // 莊贏: 莊家合計點數大於閒家
//   // 閒贏: 閒家合計點數大於莊家
//   // 和: 兩家合計點數相同
//   // 莊對: 莊家前兩張牌發出相同的牌則為莊對 例：紅心8，方塊8
//   // 閒對: 閒家前兩張牌發出相同的牌則為閒對 例：梅花k,黑桃k
//   // 超級六: 莊家以6點大過閒家

//   const outcomes = [];
//   if (cardNum === 4) {
//     const card0Num = cards[0].number > 10 ? 10 : cards[0].number;
//     const card1Num = cards[1].number > 10 ? 10 : cards[1].number;
//     const card2Num = cards[2].number > 10 ? 10 : cards[2].number;
//     const card3Num = cards[3].number > 10 ? 10 : cards[3].number;

//     const playerTotal = (card0Num + card2Num) % 10;
//     const bankTotal = (card1Num + card3Num) % 10;

//     if (playerTotal > bankTotal) {
//       //閒贏
//       outcomes.push(1);
//     } else if (playerTotal < bankTotal) {
//       //莊贏
//       outcomes.push(4);

//       if (bankTotal === playerTotal + 6) {
//         //超級六
//         outcomes.push(2);
//       }
//     } else {
//       //和
//       outcomes.push(3);
//     }

//     if (cards[1].color === cards[3].color) {
//       //莊對
//       outcomes.push(5);
//     }

//     if (cards[0].color === cards[2].color) {
//       //閒對
//       outcomes.push(0);
//     }
//   } else {
//     const card0Num = cards[0].number > 10 ? 10 : cards[0].number;
//     const card1Num = cards[1].number > 10 ? 10 : cards[1].number;
//     const card2Num = cards[2].number > 10 ? 10 : cards[2].number;
//     const card3Num = cards[3].number > 10 ? 10 : cards[3].number;
//     const card4Num = cards[4].number > 10 ? 10 : cards[4].number;
//     const card5Num = cards[5].number > 10 ? 10 : cards[5].number;

//     const playerTotal = (card0Num + card2Num + card4Num) % 10;
//     const bankTotal = (card1Num + card3Num + card5Num) % 10;

//     if (playerTotal > bankTotal) {
//       //閒贏
//       outcomes.push(1);
//     } else if (playerTotal < bankTotal) {
//       //莊贏
//       outcomes.push(4);

//       if (bankTotal === playerTotal + 6) {
//         //超級六
//         outcomes.push(2);
//       }
//     } else {
//       //和
//       outcomes.push(3);
//     }

//     if (cards[1].color === cards[3].color) {
//       //莊對
//       outcomes.push(5);
//     }

//     if (cards[0].color === cards[2].color) {
//       //閒對
//       outcomes.push(0);
//     }
//   }

//   const oddsMap = [11, 1, 12, 8, 1, 11];
//   let winning = 0;
//   outcomes.forEach(winningLocation => {
//     winning += betDetail[winningLocation] * oddsMap[winningLocation];
//   });

//   return Promise.resolve({ cards, winning, outcomes });
// }
