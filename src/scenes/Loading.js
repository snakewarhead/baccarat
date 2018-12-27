import Phaser from "phaser";
import background1 from "../assets/backgroundOne/background1.png";
import background2 from "../assets/backgroundTwo/background2.png";
import table from "../assets/backgroundOne/table.png";
import title from "../assets/backgroundOne/title.png";
import tableSquares from "../assets/backgroundOne/tableSquares.png";
import tableOneSign from "../assets/backgroundOne/tableOneSign.png";
import tableTwoSign from "../assets/backgroundOne/tableTwoSign.png";
import tableThreeSign from "../assets/backgroundOne/tableThreeSign.png";
import tableFourSign from "../assets/backgroundOne/tableFourSign.png";
import bankerWinsIcon from "../assets/backgroundOne/bankerWinsIcon.png";
import playerWinsIcon from "../assets/backgroundOne/playerWinsIcon.png";
import tieIcon from "../assets/backgroundOne/tieIcon.png";
import chip100 from "../assets/backgroundTwo/chipHolder/100-selected.png";
import chip500 from "../assets/backgroundTwo/chipHolder/500-selected.png";
import chip1000 from "../assets/backgroundTwo/chipHolder/1k-selected.png";
import chip5000 from "../assets/backgroundTwo/chipHolder/5k-selected.png";
import chip10000 from "../assets/backgroundTwo/chipHolder/10k-selected.png";
import chip25000 from "../assets/backgroundTwo/chipHolder/25k-selected.png";
import chip50000 from "../assets/backgroundTwo/chipHolder/50k-selected.png";
import chip100000 from "../assets/backgroundTwo/chipHolder/100k-selected.png";
import chip250000 from "../assets/backgroundTwo/chipHolder/250k-selected.png";
import chip500000 from "../assets/backgroundTwo/chipHolder/500k-selected.png";
import patch1 from "../assets/backgroundTwo/patch1.png";
import patch2 from "../assets/backgroundTwo/patch2.png";
import patch3 from "../assets/backgroundTwo/patch3.png";
import patch4 from "../assets/backgroundTwo/patch4.png";
import patch5 from "../assets/backgroundTwo/patch5.png";
import patch6 from "../assets/backgroundTwo/patch6.png";
import recycledCardHolder from "../assets/backgroundTwo/recycledCardHolder.png";
import recycledCard from "../assets/backgroundTwo/recycledCard.png";
import deckHolder from "../assets/backgroundTwo/deckHolder.png";
import deckCard from "../assets/backgroundTwo/deckCard.png";
import cardsLeftDisplay from "../assets/backgroundTwo/numberOfCardsLeftDisplay.png";
import { getTablesHistory } from "../utils/api";

import { isMobile } from "../utils/helperFunctions";

class Loading extends Phaser.Scene {
  constructor() {
    super("Loading");
  }
  preload() {
    getTablesHistory().then(value => {
      setTimeout(() => {
        this.events.emit("tableHistoryLoadingComplete", value);
      }, 1000);
    });

    this.load.image("background1", background1);
    this.load.image("background2", background2);
    this.load.image("table", table);
    this.load.image("title", title);
    this.load.image("tableSquares", tableSquares);
    this.load.image("tableOneSign", tableOneSign);
    this.load.image("tableTwoSign", tableTwoSign);
    this.load.image("tableThreeSign", tableThreeSign);
    this.load.image("tableFourSign", tableFourSign);
    this.load.image("bankerWinsIcon", bankerWinsIcon);
    this.load.image("playerWinsIcon", playerWinsIcon);
    this.load.image("tieIcon", tieIcon);
    this.load.image("chip100", chip100);
    this.load.image("chip500", chip500);
    this.load.image("chip1000", chip1000);
    this.load.image("chip5000", chip5000);
    this.load.image("chip10000", chip10000);
    this.load.image("chip25000", chip25000);
    this.load.image("chip50000", chip50000);
    this.load.image("chip100000", chip100000);
    this.load.image("chip250000", chip250000);
    this.load.image("chip500000", chip500000);
    this.load.image("patch1", patch1);
    this.load.image("patch2", patch2);
    this.load.image("patch3", patch3);
    this.load.image("patch4", patch4);
    this.load.image("patch5", patch5);
    this.load.image("patch6", patch6);
    this.load.image("recycledCard", recycledCard);
    this.load.image("recycledCardHolder", recycledCardHolder);
    this.load.image("deckHolder", deckHolder);
    this.load.image("deckCard", deckCard);
    this.load.image("cardsLeftDisplay", cardsLeftDisplay);

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
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
    const event = new CustomEvent("finishLoadingGame");
    window.dispatchEvent(event);
    this.scene.start("Tables");
  }

  update() {}
}

export default Loading;
