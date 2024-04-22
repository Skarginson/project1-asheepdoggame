class Game {
  // code to be added
  constructor() {
    this.dogWidth = 80;
    this.dogHeight = 80;
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameEndScreen = document.querySelector("#game-end");
    this.height = 700;
    this.width = 700;
    this.sheeps = [];
    this.player = new Player(
      this.gameScreen,
      this.width / 2 - this.dogWidth / 2,
      this.height / 2 - this.dogHeight / 2,
      this.dogWidth,
      this.dogHeight,
      this.width,
      this.height
    );
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = Math.floor(1000 / 60);
    console.log("Player position:", this.width / 2 - this.dogWidth / 2, this.height / 2 - this.dogHeight / 2);
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.addSheep();

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    this.update();
  }

  update() {
    this.player.move();
  }

  addSheep() {
    const sheepX = Math.floor(Math.random() * (this.width));
    const sheepY = Math.floor(Math.random() * (this.height));

    this.sheeps.push(
      new Sheep(
        this.gameScreen,
        sheepX,
        sheepY,
        this.dogWidth,
        this.dogHeight,
        this.width,
        this.height
      )
    );
  console.log("Sheep Position", sheepX, sheepY)
  }
}
