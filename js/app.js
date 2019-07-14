const game = {
  canvas: document.getElementById("canvas"),
  ctx: this.canvas.getContext("2d"),
  canvas: { width: 1400, height: 800 },
  mouse: { x: 0, y: 0 },
  delta: { x: 0, y: 0 },
  clicked: 0,
  isMousedown: false,
  scale: 1,
  colors: ["white", "black", "red"],
  currentColor: 0,
  previousColor: 0,
  circ: {},
  
  initialize() {
    this.circ = circ
    game.animate();
    //ON WINDOW RESIZE EVENT RE-CALL ANIMATION FUNCTION -------------
    window.addEventListener("resize", game.animate.bind(this));
    //---------------------------------------------------------------
    //ON MOUSE MOVE EVENT UPDATE COORDINATES IN GAME OBJECT----------
    document.onmousemove = evt => {
      if (!this.isMousedown){
        game.mouse.x = this.getMousePos(canvas, evt).x;
        game.mouse.y = this.getMousePos(canvas, evt).y;
      }
    };
    // ---------------------------------------------------------------
    //ON MOUSE CLICK AND DOUBLE CLICK EVENTS--------------------------
    window.addEventListener("click", () => {
      if (this.clicked === 0 && this.isMousedown === false) {
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
    window.addEventListener("mousedown", () =>{
      setTimeout( () => {
        this.isMousedown = true
        })
      }, 2000);
    window.addEventListener("mouseup", () =>{
      this.isMousedown = false
    })
    //ON MOUSE WHEEL EVENT ZOOM CANVAS-------------------------------
    window.addEventListener(
      "wheel",
      evt => {
        evt.preventDefault();
        evt.stopPropagation();
        if (evt.ctrlKey) {
          game.scale -= evt.deltaY * 0.5;
        } else {
          game.delta.x -= evt.deltaX * 2; //just change delta and draw cmd responds
          game.delta.y -= evt.deltaY * 2;
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

    game.circ.draw()

    //ANIMATION (RECURSIVE FUNCTION CALL) AT 60 FPS
    window.requestAnimationFrame(game.animate);
  }
};

const circ = {
  center: {x: 0 , y: 0},
  radius: 20,
  draw() {
    this.updatePosition()
    //MOVE THE TRANSFORMATION ORIGIN TO THE CENTER OF THE OBJECT----
    game.ctx.translate(this.center.x , this.center.y)
    game.ctx.scale(game.scale , game.scale)
    game.ctx.beginPath();
    game.ctx.arc(0, 0, this.radius , 0, 2 * Math.PI);

    game.ctx.fillStyle = game.colors[game.currentColor];
    game.ctx.fill();
  },
  updatePosition(){
    this.center = {x: game.mouse.x + game.delta.x , y: game.mouse.y + game.delta.y}
  }
}
game.initialize();
