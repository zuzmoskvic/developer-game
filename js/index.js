// setting up necessary variables  
let bg, characterSelection, player, player1, player2, player3, canvas, x = 0, y = 0, bugs = [], bugsCount = 0, skills = [], skillsCount = 0, score = 0, count = 30, fallingSpeed = 3, scoreGoal = 100, bugFrequency = 0.02;

// sounds 
let skillSound = new Audio('/sounds/skill.mp3');
let youWonSound = new Audio('/sounds/you-won.wav');
let bugSound = new Audio('/sounds/bug1.wav');
let mainSong = new Audio('/sounds/password-infinity-123276.mp3');
let gameOver = new Audio('/sounds/game-over.wav');

// mute button
const muteButton = document.getElementById("soundoff-button");
muteButton.onclick = function(){
  if (mainSong.volume === 0) {
    mainSong.volume = 0.2;
    skillSound.volume = 1;
    youWonSound.volume = 1;
    bugSound.volume = 1;
    gameOver.volume = 1;
    muteButton.innerHTML = "Mute";
  } else {
    mainSong.volume = 0;
    skillSound.volume = 0;
    youWonSound.volume = 0;
    bugSound.volume = 0;
    gameOver.volume = 0;
    muteButton.innerHTML = "Unmute";
  }
}



// intro screen and bottom text set up 
const introScreen = document.getElementById("start-page-div");
const screenshottext= document.getElementById("screenshot-text");
screenshottext.style.display="none";


// set up of the 3 character selection buttons 
const player1btn = document.getElementById("player1");
player1btn.onclick = function(){
  player = player1;
  introScreen.style.display = "none";
  screenshottext.style.display="block";
  canvas.show();
  loop();
  // play theme song
  mainSong.play();
  mainSong.loop = true;
  mainSong.volume = 0.2;
};

const player2btn = document.getElementById("player2");
player2btn.onclick = function(){
  player = player2;
  introScreen.style.display = "none";
  screenshottext.style.display="block";
  canvas.show();
  loop();
  // play theme song
  mainSong.play();
  mainSong.loop = true;
  mainSong.volume = 0.2;
};

const player3btn = document.getElementById("player3");
player3btn.onclick = function(){
  player = player3;
  introScreen.style.display = "none";
  screenshottext.style.display="block";
  canvas.show();
  loop();
  // play theme song
  mainSong.play();
  mainSong.loop = true;
  mainSong.volume = 0.2;
};

// new game button 
const newGame = document.getElementById("new-game-button");
newGame.onclick = function(){
  if (player === undefined) 
    {player=player1} 
  introScreen.style.display = "none";
  screenshottext.style.display="block";
  canvas.show();
  score=0;
  count=30;
  scoreGoal = 100;
  fallingSpeed = 3;
  fill(255,255,255);
  // char position
  x = 0;
  y = 0;
  // bugs 
  bugs = [];
  bugsCount = 0;
  skills = [];
  skillsCount = 0;
  bugFrequency = 0.02;
  // text
  loop();
}


// setup function 
function setup() {
    canvas = createCanvas(1000,601);
    canvas.hide();
    //canvas.show();
    textSize(width/30);
    fill(255,255,255);
    textFont('Andale Mono');
    noLoop();
}

// preload  function 
function preload() {
    bg = loadImage("img/bg-black.jpg");
    player1 = loadImage("img/char1.png");
    player2 = loadImage("img/char2.png");
    player3 = loadImage("img/char5.png");
}

// draw function 
function draw() {

  background(220);
  image(bg, 0, 0,);


  if (player === player1) {
    image(player1, 30 + x, 450 +y, 50,150);
  }

  if (player === player2) {
    image(player2, 30 + x, 450 +y, 50,150);
  }

  if (player === player3) {
    image(player3, 30 + x, 450 +y, 50,150);
    
  }

  

      if (random(1) < bugFrequency) { //  frequency 
        let obs = new Bug();
        bugs.push(obs);
      }

      // update and draw existing bugs
      for (let i = bugs.length - 1; i >= 0; i--) {
        bugs[i].update(fallingSpeed);
        bugs[i].draw();
        // remove bug if it's off screen
        if (bugs[i].offScreen()) {
          bugs.splice(i, 1);
        }
      }

      if (random(1) < 0.02) { //  frequency 
        let skill = new Skill();
        skills.push(skill);
      }

      // update and draw existing skills
      for (let i = skills.length - 1; i >= 0; i--) {
        skills[i].update();
        skills[i].draw();
        // remove skills if it's off screen
        if (skills[i].offScreen()) {
            skills.splice(i, 1);
        }
      }

    // Check for collisions with bugs
    for (let i = bugs.length - 1; i >= 0; i--) {
     let obs = bugs[i];

      if (
        30 + x < obs.x + 50 &&
        30 + x + 50 > obs.x &&
        450 + y < obs.y + 50 &&
        150 + 450 + y > obs.y 
      ) {
        score -= 20;
        bugSound.play();
        fill("#f91304");
        bugs.splice(i, 1);
      }
    }

// Check for collisions with skills
  for (let i = skills.length - 1; i >= 0; i--) {
    let skill = skills[i];
    if (
      30 + x < skill.x + 50 &&
      30 + x + 50 > skill.x &&
      450 + y < skill.y + 50 &&
      150 + 450 + y > skill.y 
    ) {
      score += 10;
      skillSound.play();
      fill("#17fd9e");
      skills.splice(i, 1)
    }
  }

// Update score
text(`らㄈØ尺Ɛ  ${score} pnts`, 50, 80);
text(`Ťɪ௱Ɛ ${count}`, 820, 80);

if(score<-1 || count===0){
  fill("#f91304");
  text(`
  ███ ███ █╬█ ██ ╬╬ ███ █▄█ ██ ███
  █╬▄ █▄█ █V█ █▄ ╬╬ █╬█ ███ █▄ █▄╬
  █▄█ █╬█ █╬█ █▄ ╬╬ █▄█ ╬█╬ █▄ █╬█`, 130, 220);
  bugSound.pause();
  gameOver.play();
  noLoop();
}

if (score===scoreGoal) {
  fill("#a804fc");  
  text(`
  █┼┼█ ███ █┼█ ███ ┼┼ █┼┼ ███ █▄█ ███ █┼┼
  ██▄█ █▄┼ ┼█┼ ┼█┼ ┼┼ █┼┼ █▄┼ ███ █▄┼ █┼┼
  █┼██ █▄▄ █┼█ ┼█┼ ┼┼ █▄█ █▄▄ ┼█┼ █▄▄ █▄█`, 80, 220);
  youWonSound.play();
  fallingSpeed +=2;
  count=30;
  scoreGoal+=100;
  bugFrequency+=0.01;
  noLoop();
  setTimeout(loop,2000);
//screenshot of canvas: saveCanvas(canvas, 'myCanvas', 'jpg');
}
}

class Bug {
  constructor() {
    this.x = random(width); // random x position within canvas width
    this.y = -50; // start off screen
    this.speed = random(3, 5); // random falling speed
    this.img = loadImage('img/bug.png'); // load image
  }
  update() {
    this.x += random(-2, 2);
    this.y += random(-2, 2) + this.speed;
    
  }
  draw() {
    image(this.img, this.x, this.y, 50, 50); // draw image at current position
  }
  offScreen() {
    return this.y > height; // check if bug is off bottom of screen
  }
}

class Skill {
    constructor() {
      this.x = random(width); // random x position within canvas width
      this.y = -50; // start off screen
      this.speed = random(1, 3); // random falling speed
      this.img = loadImage('img/skill.png'); // load image
    }
    update() {
      this.y += this.speed; // move down screen
    }
    draw() {
      image(this.img, this.x, this.y, 50, 50); // draw image at current position
    }
    offScreen() {
      return this.y > height; // check if bug is off bottom of screen
    }
  }

  let counter =function(){
    count=count-1; // countown by 1 every second
    // finish the game
      if (count <= 0)
      {
        // stop the timer
         clearInterval(counter);
         count=0;
      }
  }
  
  setInterval(counter, 1000);

// keypress function  
function keyPressed() {
    if (keyCode === RIGHT_ARROW && x < 905) {
        x += 40;   
    }
    if (keyCode === LEFT_ARROW && x > -5 ) {
        x -= 40;
    }
    if (keyCode === UP_ARROW && y > -430) {
        y -= 40;   
    }
    if (keyCode === DOWN_ARROW && y < 0) {
        y += 40;
    }
  }


  
  // screenshot
const takeScreenshot = document.getElementById("screenshot");
takeScreenshot.onclick = function(){
  saveCanvas(canvas, 'myHighScore', 'jpg');
}