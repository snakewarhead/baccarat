import { placeBetDuration } from "./constants";

export function placeBet(interactableArea, x, y, amount, thisArg) {
  const event = new CustomEvent("placeBet", {
    detail: { location: interactableArea.texture.key, amount }
  });
  window.dispatchEvent(event);
  if (!interactableArea.chip) {
    interactableArea.chip = thisArg.add.image(x, y, "chip" + amount);
    interactableArea.chipAmount = amount;
  } else if (thisArg.crop1ChipAmount !== amount) {
    interactableArea.chip.destroy();
    interactableArea.chip = thisArg.add.image(x, y, "chip" + amount);
    interactableArea.chipAmount = amount;
  } else {
  }
}

export const listenToBetOnArea = (interactableArea, x, y, thisArg) => {
  interactableArea.on("pointerdown", () => {
    if (thisArg.isChipSelected) {
      let amount = thisArg.pointerChipAmount;
      placeBet(interactableArea, x, y, amount, thisArg);
      if (thisArg.pointerChip) thisArg.pointerChip.destroy();
    }
  });
};

export function makePatchGlow(patch, thisArg) {
  if (patch.cycle < 3) {
    if (patch.alpha > 0 && patch.alphaDir === "down") {
      patch.alpha = patch.alpha - 0.02;
    } else if (patch.alpha <= 0) {
      patch.alpha = patch.alpha + 0.02;
      patch.alphaDir = "up";
      patch.cycle++;
    } else {
      if (patch.alpha >= 1) patch.alphaDir = "down";
      patch.alpha = patch.alpha + 0.02;
    }
  } else {
    patch.alphaDir = "up";
    patch.cycle = 0;
    patch.alpha = 0.001;
    thisArg.makeWinningPatchGlow = false;
  }
}

export function reduceNumberOfCardsToBeDealt(totalNumberOfCards, num, thisArg) {
  setInterval(() => {
    if (thisArg.numberOfCardsLeft > 0) {
      thisArg.numberOfCardsLeft = thisArg.numberOfCardsLeft - num;
    } else {
      thisArg.numberOfCardsLeft = totalNumberOfCards;
      thisArg.lastNumberOfCardsLeft = undefined;
      //cleaup then repopulate top right cards
      thisArg.cardsToBeDealt.forEach(card => {
        if (card) card.destroy();
      });
      for (let i = 0; i < totalNumberOfCards; i++) {
        thisArg.cardsToBeDealt[i] = thisArg.add.image(
          thisArg.width / 1.135 - 0.1 * i,
          thisArg.height / 305 + 0.2 * i,
          "deckCard"
        );
      }
      //clean up top left cards
      thisArg.recycledCards.forEach(card => {
        card.destroy();
      });
    }
  }, 1000);
}
