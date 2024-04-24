class Game {
  constructor(gameScreen) {
    this.dogWidth = 80;
    this.dogHeight = 80;
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = gameScreen;
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
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.visibility = "visible";
    this.addSheep();

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
      
    }, this.gameLoopFrequency);
  }
  
  gameLoop() {
    this.update();
    if (this.sheeps.length > 0) {
      this.sheeps.forEach(sheep => {
          sheep.escapeFromPlayer(this.player);
      });
    }
    this.sheeps.forEach(sheep => {
      if (sheep.isOutOfGameScreen()) {
        this.endGame();
      }
    });
  }
  
  endGame() {
    clearInterval(this.gameIntervalId);
    this.gameIsOver = true;
    this.gameEndScreen.style.display = "block";
    this.gameScreen.style.visibility = "hidden";
    this.gameScreen.innerHTML = "";
  }

  restart() {
    this.gameIsOver = false;
    this.sheeps = [];
    this.startScreen.style.display = "block";
    this.gameEndScreen.style.display = "none";
    this.start();
  }
  update() {
    this.player.move();
  }

  addSheep() {
    const sheepX = Math.floor(Math.random() * (this.width - this.dogWidth));
    const sheepY = Math.floor(Math.random() * (this.height - this.dogHeight));

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
  }
}
