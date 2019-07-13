const game = {
  canvas: $("#canvas"),
  ctx: this.canvas.getContext("2d"),
  mouse: {x: 0,y: 0},
  delta: {x: 0,y: 0},
  canvas: {x: 1400, y: 800},
  initialize() {
  
    game.animate()

    $("window").resize(game.animate.bind(this));

    $("#canvas").mousemove( e => { 
      game.mouse.x = e.pageX
      game.mouse.y = e.clientY
    });

  },
  clearCanvas() {
    game.ctx.clearRect(0, 0, canvas.width, canvas.height)  
  },
  animate() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    game.clearCanvas()
    game.ctx.beginPath();
    game.ctx.arc(game.mouse.x, game.mouse.y, 20, 0, 2 * Math.PI);
    game.ctx.fillStyle = "white";
    game.ctx.fill();

    window.requestAnimationFrame(game.animate)
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