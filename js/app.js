const game = {
  canvas: document.getElementById("canvas"),
  ctx: this.canvas.getContext("2d"),
  mouse: { x: 0, y: 0 },
  delta: { x: 0, y: 0 },
  canvas: { width: 1400, height: 800 },
  scale: 1,
  colors: ["white", "black", "red"],
  currentColor: 0,
  previousColor: 0,
  clicked: 0,

  initialize() {
    game.animate();
    //ON WINDOW RESIZE EVENT RE-CALL ANIMATION FUNCTION -------------
    window.addEventListener("resize", game.animate.bind(this));
    //---------------------------------------------------------------
    //ON MOUSE MOVE EVENT UPDATE COORDINATES IN GAME OBJECT----------
    document.onmousemove = evt => {
      game.mouse.x = this.getMousePos(canvas, evt).x;
      game.mouse.y = this.getMousePos(canvas, evt).y;
    };
    // ---------------------------------------------------------------
    window.addEventListener("click", () => {
      if (this.clicked === 0) {
        this.clicked = 1
        this.previousColor = this.currentColor
        this.currentColor = Math.abs(this.currentColor - 1)
        setTimeout( () => {
          if (this.clicked = 1){
            this.clicked = 0
          }
        }, 300);
      }
    });
    document.addEventListener("dblclick", () => {
      this.currentColor = 2;
    });
    //ON MOUSE WHEEL EVENT ZOOM CANVAS-------------------------------
    window.addEventListener(
      "wheel",
      evt => {
        evt.preventDefault();
        evt.stopPropagation();
        if (evt.ctrlKey) {
          game.scale -= evt.deltaY * 0.5;
        } else {
          game.mouse.x -= evt.deltaX * 2;
          game.mouse.y -= evt.deltaY * 2;
        }
        game.animate.bind(this);
      },
      {
        passive: false
      }
    );
    //---------------------------------------------------------------
  },
  getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  },
  clearCanvas() {
    game.ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
  animate() {
    //IN EVENT OF RESIZE -------------------------------------------
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //--------------------------------------------------------------
    game.clearCanvas();

    console.log(game.clicked)
    //MOVE THE TRANSFORMATION ORIGIN TO THE CENTER OF THE OBJECT----
    game.ctx.translate(game.mouse.x, game.mouse.y);
    game.ctx.scale(game.scale, game.scale);
    game.ctx.beginPath();
    game.ctx.arc(0, 0, 20, 0, 2 * Math.PI);

    game.ctx.fillStyle = game.colors[game.currentColor];
    game.ctx.fill();

    //ANIMATION (RECURSIVE FUNCTION CALL) AT 60 FPS
    window.requestAnimationFrame(game.animate);
  }
};

game.initialize();
