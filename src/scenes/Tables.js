import Phaser from "phaser";

class Tables extends Phaser.Scene {
  constructor() {
    super("Tables");
  }
  preload() {
    this.nextScene = false;
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.bg = this.add.image(0, 0, "background1").setOrigin(0, 0);

    this.tableOne = this.add
      .image(width / 3.4, height / 2.4, "table")
      .setScale(0.95);
    this.tableOne.setInteractive();
    this.tableTwo = this.add
      .image(width / 1.45, height / 2.4, "table")
      .setScale(0.95);
    this.tableTwo.setInteractive();
    this.tableThree = this.add
      .image(width / 3.4, height / 1.25, "table")
      .setScale(0.95);
    this.tableThree.setInteractive();
    this.tableFour = this.add
      .image(width / 1.45, height / 1.25, "table")
      .setScale(0.95);
    this.tableFour.setInteractive();

    // this.tableOneSquares = this.add
    //   .image(width / 3.4, height / 3.4, "tableSquares")
    //   .setScale(0.95);

    this.tableOne.on(
      "pointerdown",
      function() {
        this.nextScene = true;
      }.bind(this)
    );

    this.tableTwo.on(
      "pointerdown",
      function() {
        this.nextScene = true;
      }.bind(this)
    );

    this.tableThree.on(
      "pointerdown",
      function() {
        this.nextScene = true;
      }.bind(this)
    );

    this.tableFour.on(
      "pointerdown",
      function() {
        this.nextScene = true;
      }.bind(this)
    );

    this.title = this.add.image(width / 2, height / 10, "title");
  }

  update() {
    if (this.nextScene) {
      this.scene.start("Main");
    }
  }
}

export default Tables;
