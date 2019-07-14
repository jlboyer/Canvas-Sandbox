const game = {
  canvas: document.getElementById("canvas"),
  ctx: this.canvas.getContext("2d"),
  canvas: { width: 1400, height: 800 },
  mouse: { x: 0, y: 0 },
  delta: { x: 0, y: 0 },
  clicked: 0,
  isMousedown: false,
  scale: 1,
  circ: {},
  //TIME WHEN THE GAME IS INITIALIZED
  initTime: {date: {}, dateString: "", timeString: "", day: 0, hour: 0, minute: 0, second: 0, millisecond: 0},
  //THE CURRENT TIME, THE DELTA BETWEEN THIS AND INIT WILL ALLOW FOR FPS CALC AND MOUSEDRAG EVENT
  currentTime: {date: {}, dateString: "", timeString: "", day: 0, hour: 0, minute: 0, second: 0, millisecond: 0}, 
  //TIMER @ 60 FPS , RESET: FRAME EVERY SECOND, SECONDS & MINS EVERY 60, HRS EVERY 24, DAYS...REALLY?
  timer: {timeString: "", frame: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
  priorFrameTime: 0,
  currentFrameTime: 0,
  FPS: 0,
  initialize() {
    this.initTime.date = new Date()
    this.setGameTime(this.initTime)
    this.currentFrameTime = this.initTime.date.getTime()

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
        this.circ.previousColor = this.circ.currentColor
        this.circ.currentColor = Math.abs(this.circ.currentColor - 1)
        setTimeout( () => {
          if (this.clicked = 1){
            this.clicked = 0
          }
        }, 300);
      }
    });
    document.addEventListener("dblclick", () => {
      this.circ.currentColor = 2;
    });
    window.addEventListener("mousedown", () =>{
      setTimeout( () => {
        this.isMousedown = true
        })
      }, 300);
    window.addEventListener("mouseup", () =>{
      setTimeout( () => {
        this.isMousedown = false
        })
      }, 600);
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
    //UPDATE THE CURRENT GAME TIME AND TIMER------------------------
    game.currentTime.date = new Date()
    game.setGameTime(game.currentTime)
    game.timer.frame += 1  //UPDATE TIMER WILL RESET TO 0 AT 60
    game.updateTimer()
    game.calcFPS()
    //--------------------------------------------------------------


    game.writeTime()

    game.circ.draw()

    //ANIMATION (RECURSIVE FUNCTION CALL) AT APPROX. 60 FPS
    window.requestAnimationFrame(game.animate);
  },
  writeTime(){
    game.ctx.font = '12px monospace';
    game.ctx.fillStyle = 'white'
    game.ctx.beginPath()
    game.ctx.fillText(game.initTime.timeString, 10, 20);
    game.ctx.fillText(game.currentTime.timeString, 10, 40);
    game.ctx.fillText(game.timer.timeString, 10, 60)
    game.ctx.fillText(`FPS: ${game.FPS.toPrecision(2)}`, 10, 80)
    game.ctx.fillText
  },
  setGameTime(gameDateObject) {
    gameDateObject.dateString = gameDateObject.date.toDateString()
    gameDateObject.day = gameDateObject.date.getDay()                  //RETURNS (0 - 6)
    gameDateObject.hour = gameDateObject.date.getHours()               //RETURNS (0 - 23)
    gameDateObject.minute = gameDateObject.date.getMinutes()           //RETURNS (0 - 59)
    gameDateObject.second = gameDateObject.date.getSeconds()           //RETURNS (0 - 59)
    gameDateObject.millisecond = gameDateObject.date.getMilliseconds() //RETURNS (0 - 999)
    gameDateObject.timeString = `${gameDateObject.day.toString(10)}:${gameDateObject.hour.toString(10).padStart(2,'0')}:${gameDateObject.minute.toString(10).padStart(2,'0')}:${gameDateObject.second.toString(10).padStart(2,'0')}:${gameDateObject.millisecond.toString(10).padStart(4,'0')}`
    },
    updateTimer(){
      //RESET FRAMES AT 60
      if (game.timer.frame === 0) game.timer.frame = 0;

      let totalMilliseconds = game.currentTime.date.getTime() - game.initTime.date.getTime()

      game.timer.days = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24))

      game.timer.hours = Math.floor((totalMilliseconds - game.timer.days * (1000 * 60 * 60 * 24)) / (1000* 60 * 60))

      game.timer.minutes = Math.floor((totalMilliseconds - game.timer.days * (1000 * 60 * 60 * 24) - game.timer.hours * (1000 * 60 * 60 * 24))/(1000 * 60))

      game.timer.seconds = Math.floor((totalMilliseconds - game.timer.days * (1000 * 60 * 60 * 24) - game.timer.hours * (1000 * 60 * 60 * 24) - game.timer.minutes * (1000 * 60))/(1000))

      game.timer.milliseconds = Math.floor(totalMilliseconds - game.timer.days * (1000 * 60 * 60 * 24) - game.timer.hours * (1000 * 60 * 60 * 24) - game.timer.minutes * (1000 * 60) - game.timer.seconds * 1000)

      game.timer.timeString = `${game.timer.days.toString(10)}:${game.timer.hours.toString(10).padStart(2,'0')}:${game.timer.minutes.toString(10).padStart(2,'0')}:${game.timer.seconds.toString(10).padStart(2,'0')}:${game.timer.milliseconds.toString(10).padStart(4,'0')}`
    },
    calcFPS(){
      game.priorFrameTime = game.currentFrameTime
      game.currentFrameTime = game.currentTime.date.getTime()
      game.FPS = 1000 / (game.currentFrameTime - game.priorFrameTime) 
    }    
};

// timer: {frame: 0, milliseconds: 0, seconds: 0, mins: 0, hrs: 0, days: 0},

const circ = {
  center: {x: 0 , y: 0},
  radius: 20,
  colors: ["white", "black", "red"],
  currentColor: 0,
  previousColor: 0,
  orientation: false,
  rotationAngle: 0,
  draw(orientation = false) {
    this.updatePosition()
    this.orientation = orientation
    if (this.orientation === true) this.updateOrientation();

    //MOVE THE TRANSFORMATION ORIGIN TO THE CENTER OF THE OBJECT----
    game.ctx.translate(this.center.x , this.center.y)
    game.ctx.scale(game.scale , game.scale)
    game.ctx.beginPath();
    game.ctx.arc(0, 0, this.radius , 0, 2 * Math.PI);

    game.ctx.fillStyle = this.colors[this.currentColor];
    game.ctx.fill();
  },
  updatePosition(){
    this.center = {x: game.mouse.x + game.delta.x , y: game.mouse.y + game.delta.y}
  },
  updateOrientation(){
    //the mousedown and hold event will update rotation angle 
    //will need another method to draw vector after the circle is drawn from origin 
  }
}
game.initialize();
