const game = {
  ctx: document.getElementById("canvas").getContext("2d"),
  mouseX: 0,
  mouseY: 0, 
  initialize() {
    game.resizeCanvas()
    window.addEventListener("resize", game.resizeCanvas, false);
    document.onmousemove = (evt) => {
      game.mouseX = this.getMousePos(canvas, evt).x
      game.mouseY= this.getMousePos(canvas, evt).y
    }
  },
  resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    game.drawStuff()
  },
  clearCanvas() {
    game.ctx.clearRect(0, 0, canvas.width, canvas.height)  
  },
  drawStuff() {
    // do your drawing stuff here
    game.clearCanvas()
    game.ctx.beginPath();
    game.ctx.arc(game.mouseX, game.mouseY, 20, 0, 2 * Math.PI);
    game.ctx.fillStyle = "white";
    game.ctx.fill();

    window.requestAnimationFrame(game.drawStuff)
  },
  getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    }
  }
};

game.initialize()