// setting up necessary variables  
let bg;
let characterSelection;
let player1;
let canvas;
let x =0;
let y = 0;
const bugs = []
let bugsCount = 0;
const skills = []
let skillsCount = 0;
let score = 0;
let count= 30;

let skillSound = new Audio('/sounds/skill.mp3');
let youWonSound = new Audio('/sounds/you-won.wav');
let bugSound = new Audio('/sounds/bug1.wav');
let mainSong = new Audio('/sounds/password-infinity-123276.mp3');


// character button
let characterButton = document.getElementById("player1");
characterButton.onclick = function() {
  characterSelection = "player1";
  window.open("http://127.0.0.1:5500/game.html?");
  console.log('HAHAHAHAHHAH');
};



// theme song
mainSong.play();
mainSong.loop = true;
mainSong.volume = 0.2;

function setup() {
    canvas = createCanvas(1000,601);
    textSize(width/30);
    fill(255,255,255);
    textFont('Andale Mono');
}

function preload() {
    bg = loadImage("img/bg-black.jpg");
    player1 = loadImage("img/char1.png");
}

function draw() {
  background(220);
  image(bg, 0, 0,);
  image(player1, 30 + x, 450 +y, 50,150);

      if (random(1) < 0.01) { //  frequency 
        let obs = new Bug();
        bugs.push(obs);
      }

      // update and draw existing bugs
      for (let i = bugs.length - 1; i >= 0; i--) {
        bugs[i].update();
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
        fill("#f91304")
        bugs.splice(i, 1)
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
text(`らㄈØ尺Ɛ  ${score}%`, 50, 80);
text(`Ťɪ௱Ɛ ${count}`, 820, 80);

if(score<0 || count===0){
  fill("#f91304");
  text(`
  ███ ███ █╬█ ██ ╬╬ ███ █▄█ ██ ███
  █╬▄ █▄█ █V█ █▄ ╬╬ █╬█ ███ █▄ █▄╬
  █▄█ █╬█ █╬█ █▄ ╬╬ █▄█ ╬█╬ █▄ █╬█`, 130, 220);
  //screenshot of canvas: saveCanvas(canvas, 'myCanvas', 'jpg');
  noLoop();
}
if (score===100) {
  fill("#a804fc");
  text(`
  █╬█ ███ █╬█ ╬╬ █╬╬╬█ ███ █╬╬█ ╬╬<3
  █▄█ █╬█ █╬█ ╬╬ █╬█╬█ █╬█ ██▄█ ╬╬<3
  ╬█╬ █▄█ ███ ╬╬ █▄█▄█ █▄█ █╬██ ╬╬<3`, 130, 220);
  //screenshot of canvas: saveCanvas(canvas, 'myCanvas', 'jpg');
  youWonSound.play();
  noLoop();
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
    this.y += this.speed; // move down screen
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
    // when count reaches 0 clear the timer, hide oprah and
    // finish the game
      if (count <= 0)
      {
        // stop the timer
         clearInterval(counter);
         // set game to finished
         //finished = true;
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




/*
// 1st HTML: character choice from previous html 
let characterSelectButton = document.getElementById("character-select-button");
characterSelectButton.addEventListener("click", function() {
let characterChoice = document.getAttributeNode(button>id).value;
localStorage.setItem("characterChoice", characterChoice);
});


// 2nd HTML: add character image based on choice from 1st html 
window.onload = function() {
  let characterChoice = localStorage.getItem("characterChoice");

  if (characterChoice === "player1") {
    characterImage.src = "img/char1.png";
  } else if (characterChoice === "player2") {
    characterImage.src = "img/char2.png";
  } else if (characterChoice === "player3") {
    characterImage.src = "img/char3.png";
  }
};
*/




    /*

    /*rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.h + rect1.y > rect2.y*/
