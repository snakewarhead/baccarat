import Phaser from "phaser";

class Main extends Phaser.Scene {
  constructor() {
    super("Main");
  }
  preload() {}

  create() {
    this.bg = this.add.image(0, 0, "background2").setOrigin(0, 0);
  }

  update() {}
}

export default Main;
