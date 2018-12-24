import Phaser from "phaser";
import {
  listenTobetOnArea,
  makePatchGlow,
  reduceNumberOfCardsToBeDealt
} from "../utils/sceneHelperFunctions";
import { totalNumberOfCards } from "../utils/constants";

class Main extends Phaser.Scene {
  constructor() {
    super("Main");
  }
  preload() {}

  create() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;

    //background of main
    this.bg = this.add.image(0, 0, "background2").setOrigin(0, 0);

    //listen to when chip is selected on UI
    window.addEventListener("chipSelected", e => {
      if (this.pointerChipAmount != e.detail.chipAmount) {
        if (this.pointerChip) this.pointerChip.destroy();
      }

      this.isChipSelected = e.detail.isChipActive;
      this.pointerChipAmount = e.detail.chipAmount;

      if (this.isChipSelected) {
        this.pointerChip = this.add.image(
          -1000,
          -1000,
          "chip" + this.pointerChipAmount
        );
      } else {
        this.pointerChip.destroy();
      }
    });

    //need the following two event listeners to hide chip when mousing over UI
    window.addEventListener("pointerEntersUI", () => {
      this.isPointerOverUI = true;
    });

    window.addEventListener("pointerLeavesUI", () => {
      this.isPointerOverUI = false;
    });

    //clear chips
    window.addEventListener("clearAllChips", () => {
      const chips = [
        this.patch1.chip,
        this.patch2.chip,
        this.patch3.chip,
        this.patch4.chip,
        this.patch5.chip,
        this.patch6.chip
      ];
      chips.forEach(chip => {
        if (chip) {
          chip.destroy();
        }
      });

      this.pointerChip.destroy();
      this.pointerChipAmount = undefined;
      this.isChipSelected = false;
    });

    const tableSignMap = [
      "tableOneSign",
      "tableTwoSign",
      "tableThreeSign",
      "tableFourSign"
    ];

    this.tableSign = this.add
      .image(
        this.width / 2.8,
        this.height / 2.8,
        tableSignMap[this.scene.get("Tables").tablePicked]
      )
      .setScale(1.1);

    //閒對
    this.patch1 = this.add
      .image(this.width / 2, this.height / 2, "patch1")
      .setInteractive({ pixelPerfect: true });
    this.patch1.alpha = 0.001;

    //閒
    this.patch2 = this.add
      .image(this.width / 2, this.height / 2, "patch2")
      .setInteractive({ pixelPerfect: true });
    this.patch2.alpha = 0.001;

    //超級六
    this.patch3 = this.add
      .image(this.width / 2, this.height / 2, "patch3")
      .setInteractive({ pixelPerfect: true });
    this.patch3.alpha = 0.001;

    //和
    this.patch4 = this.add
      .image(this.width / 2, this.height / 2, "patch4")
      .setInteractive({ pixelPerfect: true });
    this.patch4.alpha = 0.001;

    //莊
    this.patch5 = this.add
      .image(this.width / 2, this.height / 2, "patch5")
      .setInteractive({ pixelPerfect: true });
    this.patch5.alpha = 0.001;

    //莊對
    this.patch6 = this.add
      .image(this.width / 2, this.height / 2, "patch6")
      .setInteractive({ pixelPerfect: true });
    this.patch6.alpha = 0.001;

    listenTobetOnArea(this.patch1, 440, 510, this);
    listenTobetOnArea(this.patch2, 670, 630, this);
    listenTobetOnArea(this.patch3, 965, 590, this);
    listenTobetOnArea(this.patch4, 965, 750, this);
    listenTobetOnArea(this.patch5, 1280, 640, this);
    listenTobetOnArea(this.patch6, 1510, 500, this);

    //number of cards left
    this.numberOfCardsLeft = totalNumberOfCards;

    //arrays to holder cards waiting to be dealt and dealt cards
    this.cardsToBeDealt = [];
    this.recycledCards = [];

    //top right deck holder
    this.deckHolder = this.add.image(
      this.width / 1.15,
      this.height / 20,
      "deckHolder"
    );

    //top right cards
    for (let i = 0; i < totalNumberOfCards; i++) {
      this.cardsToBeDealt[i] = this.add.image(
        this.width / 1.135 - 0.1 * i,
        this.height / 305 + 0.2 * i,
        "deckCard"
      );
    }

    //top left recycle card holder
    this.recycledCardHolder = this.add.image(
      this.width / 9,
      this.height / 20,
      "recycledCardHolder"
    );

    //top left recycled cards, there will be NO cards at first
    for (let i = 0; i < totalNumberOfCards - this.numberOfCardsLeft; i++) {
      this.recycledCards[i] = this.add.image(
        this.width / 9 - 0.1 * i,
        this.height / 20 - 0.2 * i,
        "recycledCard"
      );
    }

    //display number of cards left
    this.cardsLeftDisplay = this.add
      .image(this.width / 1.2, this.height / 4, "cardsLeftDisplay")
      .setScale(0.8);

    this.numberOfCardsLeftText = this.make.text({
      x: this.width / 1.18,
      y: this.height / 4,
      text: this.numberOfCardsLeft,
      style: {
        font: "40px monospace",
        fill: "#ffffff"
      }
    });
    this.numberOfCardsLeftText.setOrigin(0.5, 0.5);

    reduceNumberOfCardsToBeDealt(totalNumberOfCards, 1, this);

    //collection of all patches
    this.patches = [
      this.patch1,
      this.patch2,
      this.patch3,
      this.patch4,
      this.patch5,
      this.patch6
    ];
    this.patches.forEach(patch => {
      patch.alphaDir = "up";
      patch.cycle = 0;
    });

    this.makeWinningPatchGlow = false;

    window.addEventListener("displayingResult", () => {
      this.makeWinningPatchGlow = true;
      this.randomPatchIndex = Math.floor(Math.random() * 6);

      //clear out previously selected chip/chip amount
      this.pointerChip.destroy();
      this.isChipSelected = false;
      this.pointerChipAmount = 0;
    });
  }

  update() {
    if (this.makeWinningPatchGlow) {
      makePatchGlow(this.patches[this.randomPatchIndex], this);
    }

    if (this.lastNumberOfCardsLeft === undefined) {
      this.lastNumberOfCardsLeft = this.numberOfCardsLeft;
    } else {
      if (this.lastNumberOfCardsLeft != this.numberOfCardsLeft) {
        //removing cards from top right deck
        for (let i = this.numberOfCardsLeft; i < totalNumberOfCards; i++) {
          if (this.cardsToBeDealt[i]) this.cardsToBeDealt[i].destroy();
        }
        //adding cards to top left card holder
        for (
          let i = totalNumberOfCards - this.lastNumberOfCardsLeft;
          i < totalNumberOfCards - this.numberOfCardsLeft;
          i++
        ) {
          this.recycledCards[i] = this.add.image(
            this.width / 9 - 0.1 * i,
            this.height / 20 - 0.2 * i,
            "recycledCard"
          );
        }
        //for text display of number of cards left
        this.numberOfCardsLeftText.setText(this.numberOfCardsLeft);

        this.lastNumberOfCardsLeft = this.numberOfCardsLeft;
      }
    }
    //make chip follow cursor, also make it invisible once cursor is over UI
    if (this.isChipSelected && !this.isPointerOverUI) {
      this.pointerChip.alpha = 1;
      var pointer = this.input.activePointer;
      const { x, y } = pointer;
      this.pointerChip.x = x;
      this.pointerChip.y = y;
    } else {
      if (this.pointerChip) this.pointerChip.alpha = 0;
    }
  }
}

export default Main;
