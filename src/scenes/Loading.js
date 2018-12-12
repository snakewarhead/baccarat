import Phaser from "phaser";
import background1 from "../assets/backgroundOne/background1.png";
import background2 from "../assets/backgroundTwo/background2.jpg";
import table from "../assets/backgroundOne/table.png";
import title from "../assets/backgroundOne/title.png";
import tableSquares from "../assets/backgroundOne/tableSquares.png";
import tableOneSign from "../assets/backgroundOne/tableOneSign.png";
import tableTwoSign from "../assets/backgroundOne/tableTwoSign.png";
import tableThreeSign from "../assets/backgroundOne/tableThreeSign.png";
import tableFourSign from "../assets/backgroundOne/tableFourSign.png";
import { isMobile } from "../utils/helperFunctions";

class Loading extends Phaser.Scene {
  constructor() {
    super("Loading");
  }
  preload() {
    this.load.image("background1", background1);
    this.load.image("background2", background2);
    this.load.image("table", table);
    this.load.image("title", title);
    this.load.image("tableSquares", tableSquares);
    //this.load.image("tableOneSign", tableOneSign);
    // this.load.image("tableTwoSign", tableTwoSign);
    // this.load.image("tableThreeSign", tableThreeSign);
    // this.load.image("tableFourSign", tableFourSign);

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

    // for (let i = 0; i < 100; i++) {
    //   this.load.image("background" + i, background1);
    // }

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
    this.scene.start("Tables");
  }

  update() {}
}

export default Loading;
