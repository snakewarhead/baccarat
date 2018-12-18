export const listenTobetOnArea = (interactableArea, x, y, thisArg) => {
  interactableArea.on("pointerdown", () => {
    if (thisArg.isChipSelected) {
      const event = new CustomEvent("placeBet");
      window.dispatchEvent(event);
      if (!interactableArea.chip) {
        interactableArea.chip = thisArg.add.image(
          x,
          y,
          "chip" + thisArg.pointerChipAmount
        );
        interactableArea.chipAmount = thisArg.pointerChipAmount;
      } else if (thisArg.crop1ChipAmount !== thisArg.pointerChipAmount) {
        interactableArea.chip.destroy();
        interactableArea.chip = thisArg.add.image(
          x,
          y,
          "chip" + thisArg.pointerChipAmount
        );
        interactableArea.chipAmount = thisArg.pointerChipAmount;
      } else {
      }
    }
  });
};
