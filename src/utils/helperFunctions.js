import screenfull from "screenfull";
import naturalBannerLoop from "../assets/cardImages/Misc/natural-repeat.gif";
import { naturalBannerPopupDuration } from "./constants";

export function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  return "unknown";
}

export function isMobile() {
  let flag;
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      navigator.userAgent.substr(0, 4)
    )
  ) {
    flag = true;
  } else {
    flag = false;
  }
  return flag;
}

export function centerPortraitGif() {
  const portrait = document.querySelector(".portrait");
  var scale = "scale(1)";
  setTimeout(() => {
    portrait.style.webkitTransform = scale;
    portrait.style.msTransform = scale;
    portrait.style.transform = scale;
    portrait.style.backgroundPosition = "center";
    portrait.style.backgroundSize = "50%";
    portrait.style.width = "100%";
  }, 500);

  portrait.style.webkitTransform = scale;
  portrait.style.msTransform = scale;
  portrait.style.transform = scale;
  portrait.style.backgroundPosition = "center";
  portrait.style.backgroundSize = "50%";
  portrait.style.width = "100%";
}

export function resizeApp() {
  // Width-height-ratio of game resolution
  let game_ratio = 1920 / 1080;

  // Make div full height of browser and keep the ratio of game resolution
  let div = document.getElementById("game");
  // div.style.width = window.innerHeight * game_ratio + "px";
  // div.style.height = window.innerHeight + "px";
  div.style.height = window.innerWidth / game_ratio + "px";
  div.style.width = window.innerWidth + "px";

  // Check if device DPI messes up the width-height-ratio
  let canvas = document.querySelector("canvas");

  let dpi_w = parseInt(div.style.width) / canvas.width;
  let dpi_h = parseInt(div.style.height) / canvas.height;

  // height = window.innerHeight * (dpi_w / dpi_h);
  // width = height * game_ratio;

  let width = window.innerWidth * (dpi_h / dpi_w);
  let height = width / game_ratio;

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
}

export function goFullscreen() {
  if (screenfull.enabled) {
    screenfull.request();
  }
}

export function isLeapYear(year) {
  if (year % 4) {
    return false;
  } else if (year % 100) {
    return true;
  } else if (year % 400) {
    return false;
  } else {
    return true;
  }
}

export function animateFourCards(
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
  thisArg
) {
  //first, second, etc refer to the sequence the cards are dealt

  thisArg.myTween
    //deal first card
    .to(thisArg.cardEles[0], cardDealingDuration, {
      x: -window.innerWidth / firstDealtCardPostionXFactor,
      y: window.innerHeight / cardPositionYFactor,
      rotation: 0,
      width: cardWidth,
      height: cardHeight
    })
    //deal second card
    .to(thisArg.cardEles[1], cardDealingDuration, {
      x: -window.innerWidth / secondDealtCardPositionXFactor,
      y: window.innerHeight / cardPositionYFactor,
      rotation: 0,
      width: cardWidth,
      height: cardHeight
    })
    //deal third card
    .to(thisArg.cardEles[2], cardDealingDuration, {
      x: -window.innerWidth / firstDealtCardPostionXFactor + offsetX,
      y: window.innerHeight / cardPositionYFactor,
      rotation: 0,
      width: cardWidth,
      height: cardHeight
    })
    //deal fourth card
    .to(thisArg.cardEles[3], cardDealingDuration, {
      x: -window.innerWidth / secondDealtCardPositionXFactor + offsetX,
      y: window.innerHeight / cardPositionYFactor,
      rotation: 0,
      width: cardWidth,
      height: cardHeight
    })
    //flip first card
    .to(thisArg.cardFrontEles[0], cardFlippingDuration, { rotationY: 0 })
    .to(
      thisArg.cardBackEles[0],
      cardFlippingDuration,
      { rotationY: 180 },
      "-=" + cardFlippingDuration
    )
    .to(
      thisArg.cardFrontBgEles[0],
      cardFlippingDuration,
      { rotationY: 0 },
      "-=" + cardFlippingDuration
    )
    //display first pair point cresent container
    .to(
      thisArg.pointDisplays[0],
      cardFlippingDuration / 2,
      { scale: 1.5, transformOrigin: "50% 100%" },
      "-=" + cardFlippingDuration
    )
    .to(
      thisArg.pointDisplays[0],
      cardFlippingDuration / 2,
      { scale: 1, transformOrigin: "50% 50%" },
      "-=" + cardFlippingDuration / 2
    )
    //flip second card
    .to(thisArg.cardFrontEles[1], cardFlippingDuration, { rotationY: 0 })
    .to(
      thisArg.cardBackEles[1],
      cardFlippingDuration,
      { rotationY: 180 },
      "-=" + cardFlippingDuration
    )
    .to(
      thisArg.cardFrontBgEles[1],
      cardFlippingDuration,
      { rotationY: 0 },
      "-=" + cardFlippingDuration
    )
    //display second pair point cresent container
    .to(
      thisArg.pointDisplays[1],
      cardFlippingDuration / 2,
      { scale: 1.5, transformOrigin: "50% 100%" },
      "-=" + cardFlippingDuration
    )
    .to(
      thisArg.pointDisplays[1],
      cardFlippingDuration / 2,
      { scale: 1 },
      "-=" + cardFlippingDuration / 2
    )
    //third card back sliding off
    .to(thisArg.cardBackEles[2], cardBackSlidingDuration, {
      x: cardWidth / 2,
      onStart: function(thisArg) {
        thisArg.setState({
          showTopLeftCoverOnCard: [false, false, true, false, false, false]
        });
      },
      onStartParams: [thisArg]
    })
    .to(thisArg.cardBackEles[2], cardBackDippingDuration, {
      rotation: "30%",
      x: cardWidth,
      y: cardHeight / 3,
      opacity: 0,
      onStart: function(thisArg) {
        thisArg.setState(function(prevState) {
          const firstPairTotal =
            (prevState.firstPairPoints +=
              thisArg.cards[2].number >= 10 ? 0 : thisArg.cards[2].number) % 10;

          return {
            showTopLeftCoverOnCard: [false, false, false, false, false, false],
            firstPairPoints: firstPairTotal,
            displayNaturalBannerForFirstPair:
              firstPairTotal === 8 || firstPairTotal === 9
          };
        });
        setTimeout(() => {
          thisArg.setState({
            naturalBannerForFirstPair: naturalBannerLoop
          });
        }, naturalBannerPopupDuration);
      },
      onStartParams: [thisArg]
    })
    //fourth card back sliding off
    .to(thisArg.cardBackEles[3], cardBackSlidingDuration, {
      x: cardWidth / 2,
      onStart: function(thisArg) {
        thisArg.setState({
          showTopLeftCoverOnCard: [false, false, false, true, false, false]
        });
      },
      onStartParams: [thisArg]
    })
    .to(thisArg.cardBackEles[3], cardBackDippingDuration, {
      rotation: "30%",
      x: cardWidth,
      y: cardHeight / 3,
      opacity: 0,
      onStart: function(thisArg) {
        thisArg.setState(function(prevState) {
          const secondPairTotal =
            (prevState.secondPairPoints +=
              thisArg.cards[3].number >= 10 ? 0 : thisArg.cards[3].number) % 10;
          return {
            showTopLeftCoverOnCard: [false, false, false, false, false, false],
            secondPairPoints: secondPairTotal,
            displayNaturalBannerForSecondPair:
              secondPairTotal === 8 || secondPairTotal === 9
          };
        });
        setTimeout(() => {
          thisArg.setState({
            naturalBannerForSecondPair: naturalBannerLoop
          });
        }, naturalBannerPopupDuration);
      },
      onStartParams: [thisArg]
    })
    //push the cards back top
    .to(
      ".card",
      1,
      {
        y: window.innerHeight / 50,
        scale: 0.75
      },
      "+=2"
    )
    .to(thisArg.cardEles[0], 1, { x: -window.innerWidth / 2.25 }, "-=1");
  // .to(
  //   thisArg.cardEles[2],
  //   1,
  //   { x: -window.innerWidth / 2.25 + offsetX * 0.75 },
  //   "-=1"
  // );
  // .to(
  //   ".first-pair-points-container",
  //   1,
  //   {
  //     top: window.innerHeight / 10,
  //     scale: 0.9
  //   },
  //   "-=1"
  // );

  thisArg.myTween.play();
}
