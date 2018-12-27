import Phaser from "phaser";
import {
  listenToBetOnArea,
  makePatchGlow,
  reduceNumberOfCardsToBeDealt,
  placeBet
} from "../utils/sceneHelperFunctions";
import { totalNumberOfCards, patchCenters } from "../utils/constants";
const { patch1, patch2, patch3, patch4, patch5, patch6 } = patchCenters;

class Main extends Phaser.Scene {
  constructor() {
    super("Main");
  }
  preload() {
    //helper functions
    this.clearPointerChip = () => {
      if (this.pointerChip) this.pointerChip.destroy();
      console.log(this.pointerchip);
      this.pointerChipAmount = 0;
      this.isChipSelected = false;
    };
  }

  create() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;

    //background of main
    this.bg = this.add.image(0, 0, "background2").setOrigin(0, 0);

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

    console.log(patch1);
    listenToBetOnArea(this.patch1, patch1.x, patch1.y, this);
    listenToBetOnArea(this.patch2, patch2.x, patch2.y, this);
    listenToBetOnArea(this.patch3, patch3.x, patch3.y, this);
    listenToBetOnArea(this.patch4, patch4.x, patch4.y, this);
    listenToBetOnArea(this.patch5, patch5.x, patch5.y, this);
    listenToBetOnArea(this.patch6, patch6.x, patch6.y, this);

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
      this.clearPointerChip();

      //clear timer
      clearInterval(this.autoBetTimerId);
    });

    //listen to when chip is selected on UI
    window.addEventListener("chipSelected", e => {
      if (this.pointerChipAmount != e.detail.chipAmount) {
        if (this.pointerChip) this.pointerChip.destroy();
      }

      this.isChipSelected = e.detail.isChipActive;
      this.pointerChipAmount = e.detail.chipAmount;

      if (this.isChipSelected) {
        console.log(this.pointerChip);
        this.pointerChip = this.add.image(
          -1000,
          -1000,
          "chip" + this.pointerChipAmount
        );
        console.log(this.pointerChip);
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

      this.clearPointerChip();
    });

    //clear pointer chip
    window.addEventListener("clearSelectedChip", () => {
      this.clearPointerChip();
    });

    //auto rebet
    window.addEventListener("autoReBet", e => {
      const map = {
        patch1: 0,
        patch2: 1,
        patch3: 2,
        patch4: 3,
        patch5: 4,
        patch6: 5
      };
      const map2 = {
        patch1,
        patch2,
        patch3,
        patch4,
        patch5,
        patch6
      };

      this.autoBetTimerId = setInterval(() => {
        placeBet(
          this.patches[map[e.detail.location]],
          map2[e.detail.location].x,
          map2[e.detail.location].y,
          e.detail.amount,
          this
        );
      }, 1000);
    });

    //clear auto bet
    window.addEventListener("clearAutoReBet", () => {
      clearInterval(this.autoBetTimerId);
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
    if (
      this.isChipSelected &&
      !this.isPointerOverUI &&
      this.sys.game.device.os.desktop
    ) {
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
