// setting up necessary variables  
let bg;
let player1;
let canvas;
let x =0;
let y = 0;
const obstacles = []
let obstaclesCount = 0;
const skills = []
let skillsCount = 0;

function setup() {
    canvas = createCanvas(1000,601);
}

function preload() {
    bg = loadImage("img/bg-black.jpg");
    player1 = loadImage("img/char1.png");
}

function draw() {
    image(bg, 0, 0,);
    image(player1, 30 + x, 230 +y, 50,150);

    
    
      if (random(1) < 0.01) { //  frequency 
        let obs = new Obstacle();
        obstacles.push(obs);
        obstaclesCount ++;
      }
      // update and draw existing obstacles
      for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].update();
        obstacles[i].draw();
        // remove obstacle if it's off screen
        if (obstacles[i].offScreen()) {
          obstacles.splice(i, 1);
        }
      }

      if (random(1) < 0.01) { //  frequency 
        let skill = new Skill();
        skills.push(skill);
        skillsCount ++;
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
      // Check for collisions with obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    let obs = obstacles[i];
    if (collides(player1, 30 + x, 230 + y, obs, obs.x, obs.y)) {
      obstacles.splice(i, 1);
      score -= 10;
    }
  }

  // Check for collisions with skills
  for (let i = skills.length - 1; i >= 0; i--) {
    let skill = skills[i];
    if (collides(player1, 30 + x, 230 + y, skill, skill.x, skill.y)) {
      skills.splice(i, 1);
      score += 20;
    }
  }
}

function collides(obj1, x1, y1, obj2, x2, y2) {
    return (
      x1 + obj1.width > x2 &&
      x1 < x2 + obj2.width &&
      y1 + obj1.height > y2 &&
      y1 < y2 + obj2.height
    );
  }

class Obstacle {
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
    return this.y > height; // check if obstacle is off bottom of screen
  }
}

class Skill {
    constructor() {
      this.x = random(width); // random x position within canvas width
      this.y = -50; // start off screen
      this.speed = random(3, 5); // random falling speed
      this.img = loadImage('img/skill.png'); // load image
    }
  
    update() {
      this.y += this.speed; // move down screen
    }
  
    draw() {
      image(this.img, this.x, this.y, 50, 50); // draw image at current position
    }
  
    offScreen() {
      return this.y > height; // check if obstacle is off bottom of screen
    }
  }


/*// setting up obstacles 
function addObstacles(){
    obstacles.push({x: random(0, width - 50), y:-50, w:random(20, 80), h:20});
    obstaclesCount ++;
  }
  const obstaclesIntervalId = setInterval(addObstacles, 2000);
*/




// keypress function  
function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        x += 30;   
    }
    if (keyCode === LEFT_ARROW) {
        x -= 30;
    }
    if (keyCode === UP_ARROW) {
        y -= 30;   
    }
    if (keyCode === DOWN_ARROW) {
        y += 30;
    }
}




  // PARKING LOT 
    //bg.position(100,100);
    //player1.size(50,100)
    //if (frameCount == 300)frameCount = 10
    //bg.size(1000,601);
    //if (frameCount == 300)frameCount = 10
    //image(bg, 0, 0);



        //obstacles, collission course & game over 
    /*obstacles.forEach(function(obstacle){
        rect(obstacle.x, obstacle.y+=2, obstacle.w, obstacle.h);
        if(
      rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.h + rect1.y > rect2.y
    
          obstacle.x < 30 + x + 50 &&
          obstacle.x + obstacle.w > 30 + x &&
          obstacle.y <  230 +y + 150 &&
          obstacle.h + obstacle.y >  230 +y
        ) {
          fill(255, 204, 0);
          text(`Game Over! Score: ${obstaclesCount}`,400, 400);
          console.log("YES")
          fill(white);
          noLoop();
        } 
        else {
          console.log("Nope")
        }
      });*/