import Phaser from "phaser";
import background from "../assets/background.png";
import { isMobile } from "../utils/helperFunctions";

class Loading extends Phaser.Scene {
  constructor() {
    super("Loading");
  }
  preload() {
    this.load.image("background", background);

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    console.log(width, height);
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff"
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    const copyrightText = this.make.text({
      x: width - (isMobile ? 350 : 350),
      y: height - (isMobile ? 200 : 200),
      text:
        "'Sock Hop' \n Kevin MacLeod (incompetech.com)\n Licensed under Creative Commons: By Attribution 3.0",
      style: {
        font: "20px monospace",
        fill: "#ffffff"
      }
    });

    copyrightText.setOrigin(0.5, 0.5);

    progressBox.fillStyle(0x222222, 0.8);

    progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

    for (let i = 0; i < 100; i++) {
      this.load.image("background" + i, background);
    }

    this.load.on("progress", function(value) {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
    });

    this.load.on("fileprogress", function(file) {
      //  console.log(file.src);
    });

    this.load.on("complete", function() {
      progressBar.destroy();
      progressBox.destroy();
    });
  }

  create() {
    this.scene.start("Main");
  }

  update() {}
}

export default Loading;
