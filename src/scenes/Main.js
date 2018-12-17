import Phaser from "phaser";

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
      if (this.chipAmount != e.detail.chipAmount) {
        if (this.chip) this.chip.destroy();
      }

      this.chipSelected = e.detail.isChipActive;
      this.chipAmount = e.detail.chipAmount;

      if (this.chipSelected) {
        this.chip = this.add.image(-1000, -1000, "chip" + this.chipAmount);
      } else {
        this.chip.destroy();
      }
    });

    window.addEventListener("pointerEntersUI", () => {
      this.isPointerOverUI = true;
    });

    window.addEventListener("pointerLeavesUI", () => {
      this.isPointerOverUI = false;
    });

    // this.selectChip = e => {
    //   console.log(e.detail);
    //   var pointer = this.input.activePointer;
    //   this.chip = this.add.image(pointer.x, pointer.y, "chip100");
    // };

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
  }

  update() {
    if (this.chipSelected && !this.isPointerOverUI) {
      this.chip.alpha = 1;
      var pointer = this.input.activePointer;
      const { x, y } = pointer;
      this.chip.x = x;
      this.chip.y = y;
    } else {
      if (this.chip) this.chip.alpha = 0;
    }
  }
}

export default Main;
