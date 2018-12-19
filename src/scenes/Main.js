import Phaser from "phaser";
import { listenTobetOnArea } from "../utils/sceneHelperFunctions";

class Main extends Phaser.Scene {
  constructor() {
    super("Main");
  }
  preload() {}

  create() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;

    this.bg = this.add.image(0, 0, "background2").setOrigin(0, 0);

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

    window.addEventListener("pointerEntersUI", () => {
      this.isPointerOverUI = true;
    });

    window.addEventListener("pointerLeavesUI", () => {
      this.isPointerOverUI = false;
    });

    window.addEventListener("clearAllChips", () => {
      const chips = [
        this.crop1.chip,
        this.crop2.chip,
        this.crop3.chip,
        this.crop4.chip,
        this.crop5.chip,
        this.crop6.chip
      ];
      chips.forEach(chip => {
        if (chip) {
          chip.destroy();
        }
      });
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
    this.crop1 = this.add
      .image(440, 510, "crop1")
      .setScale(1.9)
      .setInteractive({ pixelPerfect: true });
    this.crop1.alpha = 0.001;

    //閒
    this.crop2 = this.add
      .image(670, 630, "crop2")
      .setScale(1.5)
      .setInteractive({ pixelPerfect: true });
    this.crop2.alpha = 0.001;

    //超級六
    this.crop3 = this.add
      .image(965, 590, "crop3")
      .setScale(1.6)
      .setInteractive({ pixelPerfect: true });
    this.crop3.alpha = 0.001;

    //和
    this.crop4 = this.add
      .image(965, 750, "crop4")
      .setScale(1.5)
      .setInteractive({ pixelPerfect: true });
    this.crop4.alpha = 0.001;

    //莊
    this.crop5 = this.add
      .image(1280, 640, "crop5")
      .setScale(1.5)
      .setInteractive({ pixelPerfect: true });
    this.crop5.alpha = 0.001;

    //莊對
    this.crop6 = this.add
      .image(1510, 500, "crop6")
      .setScale(1.5)
      .setInteractive({ pixelPerfect: true });
    this.crop6.alpha = 0.001;

    listenTobetOnArea(this.crop1, 440, 510, this);
    listenTobetOnArea(this.crop2, 670, 630, this);
    listenTobetOnArea(this.crop3, 965, 590, this);
    listenTobetOnArea(this.crop4, 965, 750, this);
    listenTobetOnArea(this.crop5, 1280, 640, this);
    listenTobetOnArea(this.crop6, 1510, 500, this);

    //number of cards left
    this.totalNumberOfCards = 416;
    this.numberOfCardsLeft = 416;

    //arrays to holder cards waiting to be dealt and dealt cards
    this.deckCards = [];
    this.recycledCards = [];

    //top right deck holder
    this.deckHolder = this.add.image(
      this.width / 1.15,
      this.height / 20,
      "deckHolder"
    );

    //top right cards
    for (let i = 0; i < this.numberOfCardsLeft; i++) {
      this.deckCards[i] = this.add.image(
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

    //top left recycled cards
    for (let i = 0; i < this.totalNumberOfCards - this.numberOfCardsLeft; i++) {
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

    setInterval(() => {
      if (this.numberOfCardsLeft > 0) {
        this.numberOfCardsLeft--;
      } else {
        this.numberOfCardsLeft = 416;
        this.lastNumberOfCardsLeft = undefined;
        //cleaup then repopulate top right cards
        this.deckCards.forEach(card => {
          if (card) card.destroy();
        });
        for (let i = 0; i < this.totalNumberOfCards; i++) {
          this.deckCards[i] = this.add.image(
            this.width / 1.135 - 0.1 * i,
            this.height / 305 + 0.2 * i,
            "deckCard"
          );
        }
        //clean up top left cards
        this.recycledCards.forEach(card => {
          card.destroy();
        });
      }
    }, 1000);
  }

  update() {
    if (this.lastNumberOfCardsLeft === undefined) {
      this.lastNumberOfCardsLeft = this.numberOfCardsLeft;
    } else {
      if (this.lastNumberOfCardsLeft != this.numberOfCardsLeft) {
        //removing cards from the top right deck of cards
        // for (
        //   let i = this.numberOfCardsLeft;
        //   i < this.lastNumberOfCardsLeft;
        //   i++
        // ) {
        //   this.deckCards[i].destroy();
        // }
        for (let i = this.numberOfCardsLeft; i < this.totalNumberOfCards; i++) {
          if (this.deckCards[i]) this.deckCards[i].destroy();
        }

        //adding cards to top left card holder
        for (
          let i = this.totalNumberOfCards - this.lastNumberOfCardsLeft;
          i < this.totalNumberOfCards - this.numberOfCardsLeft;
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
