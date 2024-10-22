let img;
let shieldImage;
let ufoImage;
let enemybulletImage;
let spaceshipbulletImage;
let enemy1Image;
let enemy2Image;
let spaceshipImage;
let x;
let y;
let speed;
let enemyspeed;
let direction;
let shootaxis;
let shoot;
let position2;
let enemies;
//enemy bullet variable
let eb;
let tempGameover;
let count;
let ShieldXaxis;
let shieldy;
let ShieldExistence1;
let ShieldExistence2;
let ShieldExistence3;
let ShieldExistence4;
let existence;
//good variable name
let enemyExists;
let shootingTick;
let shootingThreshold;
let ShieldWidth;
let ShieldHeight;
let score;
let ShieldHP1;
let ShieldHP2;
let ShieldHP3;
let ShieldHP4;
let ufo;
let music;
let isGameStarted = false;

class UFO {
  constructor() {
    this.x = 4000;
    this.y = 20;
    this.width = 80;
    this.height = 20;
    this.isDead = false;
  }

  kill() {
    this.isDead = true;
  }

  isColliding(x, y) {
    if (
      x >= this.x &&
      y >= this.y &&
      x <= this.x + this.width &&
      y <= this.y + this.height
    ) {
      return true;
    } else {
      return false;
    }
  }

  move() {
    this.x = this.x - 5;
  }

  show() {
    if (this.isDead === false) {
      noStroke();
      fill(235, 52, 210);
      image(ufoImage, this.x, this.y, this.width, this.height);
    }
  }
}

// Load the image.
function preload() {
  img = loadImage("assets/Planet-hell-background2.jpg");
  enemy1Image = loadImage("assets/Enemy1.png");
  spaceshipImage = loadImage("assets/Spaceship2.png");
  spaceshipbulletImage = loadImage("assets/spaceshipbullet.png");
  enemy2Image = loadImage("assets/enemy2.png");
  enemybulletImage = loadImage("assets/enemybullet.png");
  ufoImage = loadImage("assets/UFO.png");
  shieldImage = loadImage("assets/shield.png");
  music = loadSound("assets/Planet-hell2.mp3");
}

function enemySpawn() {
  ufo = new UFO();
  enemies = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 5; j++) {
      enemies.push([
        position2[0] + j * 70,
        position2[1] + i * 70,
        50,
        50,
        true,
      ]);
    }
  }
}

function setup() {
  createCanvas(800, 600);
  x = 400;
  y = 555;
  speed = 5;
  enemyspeed = 3;
  direction = 1;
  shootaxis = [0, 1];
  shoot = false;
  position2 = [0, 40];
  //enemy bul variable
  eb = [];
  tempGameover = false;
  count = 3;
  ShieldXaxis = [570, 420, 270, 120];
  shieldy = 490;
  ShieldExistence1 = true;
  ShieldExistence2 = true;
  ShieldExistence3 = true;
  ShieldExistence4 = true;
  existence = true;
  //good variable name
  enemyExists = false;
  shootingTick = 0;
  shootingThreshold = 60;
  ShieldWidth = 70;
  ShieldHeight = 25;
  score = 0;
  ShieldHP1 = 4;
  ShieldHP2 = 4;
  ShieldHP3 = 4;
  ShieldHP4 = 4;

  enemySpawn();
}

function draw() {
  background(0, 0, 0);

  if (!isGameStarted) {
    fill(255, 255, 255);
    textSize(40);
    let content = "Press Space to start the game";
    let contentWidth = textWidth(content);
    text(content, width / 2 - contentWidth / 2, height / 2 - 10);

    if (keyIsDown(32) === true) {
      isGameStarted = true;
      music.loop();
    }

    return;
  }

  // Draw the image and scale it to fit within the canvas.
  image(img, 0, 0, width, height, 0, 0, img.width, img.height, CONTAIN);
  fill(0, 0, 0, 100);
  rect(0, 0, width, height);
  if (enemyExists === true) {
    ufo.move();
    ufo.show();
  }

  //shields
  if (ShieldExistence1 === true) {
    fill(213, 245, 221);
    image(shieldImage, ShieldXaxis[0], shieldy, ShieldWidth, ShieldHeight);
    //rect(ShieldXaxis[0], shieldy, ShieldWidth, ShieldHeight);
    textSize(20);
    strokeWeight(2);
    stroke(0, 0, 0);
    fill(255, 255, 255);
    text(ShieldHP1, ShieldXaxis[0] + 30, shieldy + 20);
  }

  if (ShieldExistence2 === true) {
    fill(213, 245, 221);
    image(shieldImage, ShieldXaxis[1], shieldy, ShieldWidth, ShieldHeight);

    textSize(20);
    strokeWeight(2);
    stroke(0, 0, 0);
    fill(255, 255, 255);
    text(ShieldHP2, ShieldXaxis[1] + 30, shieldy + 20);
  }

  if (ShieldExistence3 === true) {
    fill(213, 245, 221);
    image(shieldImage, ShieldXaxis[2], shieldy, ShieldWidth, ShieldHeight);
    textSize(20);
    strokeWeight(2);
    stroke(0, 0, 0);
    fill(255, 255, 255);
    text(ShieldHP3, ShieldXaxis[2] + 30, shieldy + 20);
  }

  if (ShieldExistence4 === true) {
    fill(213, 245, 221);
    image(shieldImage, ShieldXaxis[3], shieldy, ShieldWidth, ShieldHeight);
    textSize(20);
    strokeWeight(2);
    stroke(0, 0, 0);
    fill(255, 255, 255);
    text(ShieldHP4, ShieldXaxis[3] + 30, shieldy + 20);
  }

  // the value of enemy existence is being reset
  enemyExists = false;

  //here is being checked if the enemy exists or not
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    if (enemy[4] === true) {
      enemyExists = true;
    }
  }

  if (enemyExists === false && tempGameover === false) {
    // continue button
    if (keyIsDown(67) === true) {
      enemySpawn();
      enemyspeed = enemyspeed + 1;
    }
    // win transparent rect
    fill(0, 0, 0, 200);
    rect(400 / 2, height / 2 - 125, 400, 250);
    fill(0, 255, 0);
    textStyle(BOLD);
    textSize(40);
    text("You win", width / 2 - 80, height / 2 - 90);
    textSize(20);
    fill(255, 255, 255);
    text("Press C to continue", width / 2 - 100, height / 2 + 30);
    textSize(40);
    fill(245, 170, 10);
    let content = "score: " + score;
    let tWidth = textWidth(content);
    text(content, width / 2 - tWidth / 2, height / 2 - 40);
    fill(255, 255, 255);
    textSize(20);
    text("Press R to restart the game", width / 2 - 125, height / 2 + 60);
  }

  //enemy render
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];

    if (enemy[4] === true) {
      if (i < 5) {
        image(enemy2Image, enemy[0], enemy[1], 50, 50);
        // fill(0, 0, 255);
      } else {
        // fill(255, 0, 0);
        image(enemy1Image, enemy[0], enemy[1], 50, 50);
        // rect(enemy[0], enemy[1], enemy[2], enemy[3]);
      }
    }
    enemy[0] = enemy[0] + direction * enemyspeed;
  }
  // enemy direction
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    if (enemy[4] === true) {
      if (enemy[0] + enemy[2] > width) {
        direction = -1;
      } else if (enemy[0] < 0) {
        direction = 1;
      }
    }
  }

  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    // when enemy touches player and kills
    if (enemy[4] === true && enemy[1] >= y - 30) {
      tempGameover = true;
    }

    if (enemy[4] === true) {
      if (enemy[0] + enemy[2] > width) {
        for (let j = 0; j < enemies.length; j++) {
          let enemy = enemies[j];
          enemy[1] = enemy[1] + 20;
        }
        break;
      } else if (enemy[0] < 0) {
        for (let k = 0; k < enemies.length; k++) {
          let enemy = enemies[k];
          enemy[1] = enemy[1] + 20;
        }
        break;
      }
    }
  }
  for (let l = 0; l < enemies.length; l++) {
    let enemy = enemies[l];

    //when enemy is being hit
    if (
      shoot === true &&
      enemy[4] === true &&
      shootaxis[0] >= enemy[0] &&
      shootaxis[0] <= enemy[0] + enemy[2] &&
      shootaxis[1] >= enemy[1] &&
      shootaxis[1] <= enemy[1] + enemy[3]
    ) {
      if (tempGameover == false) {
        score = score + 50;
      }
      shoot = false;
      enemy[4] = false;
    }
  }

  //reset button
  if (keyIsDown(82) === true) {
    setup();
    music.stop();
    music.loop();
  }

  //spaceship movement
  if (keyIsDown(LEFT_ARROW) === true && x > 30) {
    x -= speed;
  }

  if (keyIsDown(RIGHT_ARROW) === true && x < 775) {
    x += speed;
  }

  //shoot button
  if (keyIsDown(32) === true && shoot === false) {
    shoot = true;
    shootaxis[1] = y;
    shootaxis[0] = x;
  }
  //spaceship
  noStroke();
  if (tempGameover === false) {
    fill(0, 190, 0);
    image(spaceshipImage, x - 30, y, 60, 60);
    //rect(x - 30, y, 60, 20);
  }

  //spaceship shooting
  if (shoot === true && tempGameover === false && enemyExists === true) {
    fill(0, 251, 255);
    image(spaceshipbulletImage, shootaxis[0] - 5, shootaxis[1], 10, 20);
    //rect(shootaxis[0] - 1, shootaxis[1], 2, 20);
    shootaxis[1] = shootaxis[1] - 20;

    if (shootaxis[1] < -20) {
      shoot = false;
    }

    if (ufo.isColliding(shootaxis[0], shootaxis[1]) === true) {
      shoot = false;
      ufo.kill();
      score = score + 1000;
    }
  }

  // upper random() chooses if enemy is allowed to shoot
  // lower random() chooses which enemy is allowed to shoot
  /*
  if (random() < 0.01) {
    let enemy = enemies[...Math.round(random(0, 4))];
    if (enemy[4] === true) {
      eb.push([...enemy]);
    }
  }
    */
  if (tempGameover === false) {
    if (shootingTick >= shootingThreshold) {
      let enemy = enemies[round(random(0, 4))];
      if (enemy[4] === true) {
        eb.push([enemy[0] + enemy[2] / 2, enemy[1] + enemy[3] / 2]);
        shootingTick = random(0, shootingThreshold / 2);
      }
    } else {
      shootingTick += 1;
    }
  }

  for (let i = 0; i < eb.length; i++) {
    let enemybullet = eb[i];

    if (enemyExists === false) {
      eb.splice(i, 1);
    }

    fill(250, 250, 250);
    //enemy shoot rect
    if (existence === true) {
      image(enemybulletImage, enemybullet[0], enemybullet[1], 6, 18);
      //rect(enemybullet[0], enemybullet[1], 2, 15);
    }
    enemybullet[1] = enemybullet[1] + 10;
    if (enemybullet[1] > 620) {
      eb.splice(i, 1);
    }

    // enemy shoots shield

    if (ShieldExistence1 === true) {
      if (
        enemybullet[0] >= ShieldXaxis[0] &&
        enemybullet[0] <= ShieldXaxis[0] + ShieldWidth &&
        enemybullet[1] >= shieldy
      ) {
        eb.splice(i, 1);
        ShieldHP1 = ShieldHP1 - 1;
      }
      if (ShieldHP1 === 0) {
        ShieldExistence1 = false;
      }
    }

    if (ShieldExistence2 === true) {
      if (
        enemybullet[0] >= ShieldXaxis[1] &&
        enemybullet[0] <= ShieldXaxis[1] + ShieldWidth &&
        enemybullet[1] >= shieldy
      ) {
        eb.splice(i, 1);
        ShieldHP2 = ShieldHP2 - 1;
      }

      if (ShieldHP2 === 0) {
        ShieldExistence2 = false;
      }
    }

    if (ShieldExistence3 === true) {
      if (
        enemybullet[0] >= ShieldXaxis[2] &&
        enemybullet[0] <= ShieldXaxis[2] + ShieldWidth &&
        enemybullet[1] >= shieldy
      ) {
        eb.splice(i, 1);
        ShieldHP3 = ShieldHP3 - 1;
      }
      if (ShieldHP3 === 0) {
        ShieldExistence3 = false;
      }
    }

    if (ShieldExistence4 === true) {
      if (
        enemybullet[0] >= ShieldXaxis[3] &&
        enemybullet[0] <= ShieldXaxis[3] + ShieldWidth &&
        enemybullet[1] >= shieldy
      ) {
        eb.splice(i, 1);
        ShieldHP4 = ShieldHP4 - 1;
      }
      if (ShieldHP4 === 0) {
        ShieldExistence4 = false;
      }
    }
   

    // enemy shoots me
    if (
      enemybullet[0] >= x - 30 &&
      enemybullet[0] <= x + 30 &&
      enemybullet[1] >= y + 10 &&
      enemybullet[1] <= y + 30
    ) {
      eb.splice(i, 1);
      count = count - 1;
    }
    if (count < 1) {
      eb.splice(i, 1);
      tempGameover = true;
    }
  }



 // spacship shoots shields

 if (ShieldExistence1 === true) {
  if (
    shootaxis[0] >= ShieldXaxis[0] &&
    shootaxis[0] <= ShieldXaxis[0] + ShieldWidth &&
    shootaxis[1] <= shieldy + ShieldHeight / 2
  )
    if (shoot === true) {
      {
        shoot = false;
        ShieldHP1 = ShieldHP1 - 1;
      }
    }

    if (ShieldHP1 === 0) {
      ShieldExistence1 = false;
    }
}

if (ShieldExistence2 === true) {
  if (
    shootaxis[0] >= ShieldXaxis[1] &&
    shootaxis[0] <= ShieldXaxis[1] + ShieldWidth &&
    shootaxis[1] <= shieldy + ShieldHeight / 2
  )
    if (shoot === true) {
      {
        shoot = false;
        ShieldHP2 = ShieldHP2 - 1;
      }
    }
    if (ShieldHP2 === 0) {
      ShieldExistence2 = false;
    }
}

if (ShieldExistence3 === true) {
  if (
    shootaxis[0] >= ShieldXaxis[2] &&
    shootaxis[0] <= ShieldXaxis[2] + ShieldWidth &&
    shootaxis[1] <= shieldy + ShieldHeight / 2
  )
    if (shoot === true) {
      {
        shoot = false;
        ShieldHP3 = ShieldHP3 - 1;
      }
    }
    if (ShieldHP3 === 0) {
      ShieldExistence3 = false;
    }
}

if (ShieldExistence4 === true) {
  if (
    shootaxis[0] >= ShieldXaxis[3] &&
    shootaxis[0] <= ShieldXaxis[3] + ShieldWidth &&
    shootaxis[1] <= shieldy + ShieldHeight / 2
  )
    if (shoot === true) {
      {
        shoot = false;
        ShieldHP4 = ShieldHP4 - 1;
      }
    }
    if (ShieldHP4 === 0) {
      ShieldExistence4 = false;
    }
}


  if (tempGameover === true) {
    // lose transparent rect
    fill(0, 0, 0, 200);
    rect(400 / 2, height / 2 - 125, 400, 250);
    textSize(40);
    fill(245, 170, 10);
    let content = "score: " + score;
    let tWidth = textWidth(content);
    text(content, width / 2 - tWidth / 2, height / 2 - 20);
    fill(255, 0, 0);

    textStyle(BOLD);
    textSize(40);
    text("You lose", width / 2 - 80, height / 2 - 90);

    fill(255, 255, 255);
    textStyle(BOLD);
    textSize(20);
    // text("Press C to continue", width / 2 - 100, (height / 2) + 30);
    text("Press R to restart the game", width / 2 - 125, height / 2 + 50);
  }

  if (tempGameover === false) {
    //HUD
    textStyle(NORMAL);
    fill(0, 255, 0);
    textSize(20);
    text("score: " + score, 200, 15);
    text("HP: " + count, 0, 15);
  }
}
