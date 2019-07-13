const game = {
  ctx: document.getElementById("canvas").getContext("2d"),
  initialize() {
    game.resizeCanvas()
    window.addEventListener("resize", game.resizeCanvas, false);
  },
  resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    game.drawStuff()
  },
  drawStuff() {
    // do your drawing stuff here
    game.ctx.beginPath();
    game.ctx.arc(100, 100, 20, 0, 2 * Math.PI);
    game.ctx.fillStyle = "white";
    game.ctx.fill();
  },
};

game.initialize()