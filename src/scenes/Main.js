import Phaser from "phaser";
import { listenTobetOnArea } from "../utils/sceneHelperFunctions";

class Main extends Phaser.Scene {
  constructor() {
    super("Main");
  }
  preload() {}

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

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
        width / 2.8,
        height / 2.8,
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
  }

  update() {
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
