import Phaser from "phaser";
import {
  tablePositions,
  table1TopLeftPosition,
  table2TopLeftPosition,
  table3TopLeftPosition,
  table4TopLeftPosition,
  tableCellDeltas
} from "../utils/constants";

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

    const {
      leftWidthDivisor,
      rightWidthDivisor,
      topHeightDivisor,
      bottomHeightDivisor
    } = tablePositions;

    this.bg = this.add.image(0, 0, "background1").setOrigin(0, 0);

    this.title = this.add.image(width / 2, height / 13, "title");

    this.tableOne = this.add.image(
      width / leftWidthDivisor,
      height / topHeightDivisor,
      "table"
    );

    this.tableTwo = this.add.image(
      width / rightWidthDivisor,
      height / topHeightDivisor,
      "table"
    );

    this.tableThree = this.add.image(
      width / leftWidthDivisor,
      height / bottomHeightDivisor,
      "table"
    );

    this.tableFour = this.add.image(
      width / rightWidthDivisor,
      height / bottomHeightDivisor,
      "table"
    );

    this.tableOneSquares = this.add.image(
      width / leftWidthDivisor,
      height / topHeightDivisor,
      "tableSquares"
    );

    this.tableTwoSquares = this.add.image(
      width / rightWidthDivisor,
      height / topHeightDivisor,
      "tableSquares"
    );

    this.tableThreeSquares = this.add.image(
      width / leftWidthDivisor,
      height / bottomHeightDivisor,
      "tableSquares"
    );

    this.tableFourSquares = this.add.image(
      width / rightWidthDivisor,
      height / bottomHeightDivisor,
      "tableSquares"
    );

    this.tableOneSign = this.add.image(
      width / leftWidthDivisor,
      height / topHeightDivisor,
      "tableOneSign"
    );

    this.tableTwoSign = this.add.image(
      width / rightWidthDivisor,
      height / topHeightDivisor,
      "tableTwoSign"
    );

    this.tableThreeSign = this.add.image(
      width / leftWidthDivisor,
      height / bottomHeightDivisor,
      "tableThreeSign"
    );

    this.tableFourSign = this.add.image(
      width / rightWidthDivisor,
      height / bottomHeightDivisor,
      "tableFourSign"
    );

    //position of the top left cell of each table
    const { x: t1x, y: t1y } = table1TopLeftPosition;
    const { x: t2x, y: t2y } = table2TopLeftPosition;
    const { x: t3x, y: t3y } = table3TopLeftPosition;
    const { x: t4x, y: t4y } = table4TopLeftPosition;
    //x, y difference between each cell
    const { deltaX, deltaY } = tableCellDeltas;
    const iconMap = { 1: "bankerWinsIcon", 2: "playerWinsIcon", 3: "tieIcon" };
    const tableXY = [
      { x: t1x, y: t1y },
      { x: t2x, y: t2y },
      { x: t3x, y: t3y },
      { x: t4x, y: t4y }
    ];

    const loadingScene = this.scene.get("Loading");
    loadingScene.events.on(
      "tableHistoryLoadingComplete",
      drawHistoryOnTables,
      this
    );

    function drawHistoryOnTables(tables) {
      tables.forEach((table, tableIdx) => {
        table.forEach((col, colIdx) => {
          col.forEach((cell, rowIdx) => {
            this.add
              .image(
                tableXY[tableIdx].x + colIdx * deltaX,
                tableXY[tableIdx].y + rowIdx * deltaY,
                iconMap[cell]
              )
              .setScale(0.7);
          });
        });
      });
    }

    this.tableGroup = [
      this.tableOne,
      this.tableTwo,
      this.tableThree,
      this.tableFour
    ];

    this.tablePlusAccessoriesGroup = [
      this.tableOne,
      this.tableTwo,
      this.tableThree,
      this.tableFour,
      this.tableOneSquares,
      this.tableTwoSquares,
      this.tableThreeSquares,
      this.tableFourSquares,
      this.tableOneSign,
      this.tableTwoSign,
      this.tableThreeSign,
      this.tableFourSign
    ];

    this.tableGroup.forEach(table => {
      table.setInteractive({ pixelPerfect: true });
    });

    this.tablePlusAccessoriesGroup.forEach(item => {
      item.setScale(0.95, 0.9);
    });

    this.tableOne.on(
      "pointerdown",
      function() {
        this.nextScene = true;
        this.tablePicked = 0;

        var event = new CustomEvent("tablePicked", {
          detail: 0
        });

        window.dispatchEvent(event);
      }.bind(this)
    );

    this.tableTwo.on(
      "pointerdown",
      function() {
        this.nextScene = true;
        this.tablePicked = 1;

        var event = new CustomEvent("tablePicked", {
          detail: 1
        });

        window.dispatchEvent(event);
      }.bind(this)
    );

    this.tableThree.on(
      "pointerdown",
      function() {
        this.nextScene = true;
        this.tablePicked = 2;

        var event = new CustomEvent("tablePicked", {
          detail: 2
        });

        window.dispatchEvent(event);
      }.bind(this)
    );

    this.tableFour.on(
      "pointerdown",
      function() {
        this.nextScene = true;
        this.tablePicked = 3;

        var event = new CustomEvent("tablePicked", {
          detail: 3
        });

        window.dispatchEvent(event);
      }.bind(this)
    );
  }

  update() {
    //replace true with this.nextScene
    if (this.nextScene) {
      const event = new CustomEvent("fromTableToMain");
      window.dispatchEvent(event);
      this.scene.start("Main");
    }
  }
}

export default Tables;
