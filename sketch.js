let img;
let x = 400;
let y = 575;
let speed = 5;
let enemyspeed = 1;
let direction = 1;
let shootaxis = [0, 1];
let shoot = false;
let position2 = [0, 40];
let enemies = [];
//enemy bullet variable
let eb = [];
let tempGameover = false;
let count = 3;
let ShieldXaxis = [570, 420, 270, 120];
let shieldy = 490;
let existence = true;
let enemyExists = false;
let shootingTick = 0;
let shootingThreshold = 60;
let ShieldWidth = 70;
let ShieldHeight = 25;
let score = 0;

// Load the image.
function preload() {
  img = loadImage("/assets/Background.png");
}

function setup() {
  createCanvas(800, 600);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 5; j++) {
      enemies.push([
        position2[0] + j * 70,
        position2[1] + i * 70,
        35,
        35,
        true,
      ]);
    }
  }
}

function draw() {
  background(0, 0, 0);

  // Draw the image and scale it to fit within the canvas.
  image(img, 0, 0, width, height, 0, 0, img.width, img.height, CONTAIN);

  //shields
  fill(213, 245, 221);
  rect(ShieldXaxis[0], shieldy, ShieldWidth, ShieldHeight);

  fill(213, 245, 221);
  rect(ShieldXaxis[1], shieldy, ShieldWidth, ShieldHeight);

  fill(213, 245, 221);
  rect(ShieldXaxis[2], shieldy, ShieldWidth, ShieldHeight);

  fill(213, 245, 221);
  rect(ShieldXaxis[3], shieldy, ShieldWidth, ShieldHeight);

  // the value of enemy existence is being reset
  enemyExists = false;

  //here is being checked if the enemy exists or not
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    if (enemy[4] === true) {
      enemyExists = true;
    }
  }

  if (enemyExists === false) {
    fill(0, 255, 0);
    textStyle(BOLD);
    text("You Win", width / 2 - 50, height / 2);
  }

  //enemy render
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];

    if (i < 1) {
      fill(0, 0, 255);
    } else if (i > 4) {
      fill(255, 0, 0);
    }

    if (enemy[4] === true) {
      rect(enemy[0], enemy[1], enemy[2], enemy[3]);
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

    // when enemy is being hit
    if (
      shoot === true &&
      enemy[4] === true &&
      shootaxis[0] >= enemy[0] &&
      shootaxis[0] <= enemy[0] + enemy[2] &&
      shootaxis[1] >= enemy[1] &&
      shootaxis[1] <= enemy[1] + enemy[3]
    ) {
      score = score + 50;
      shoot = false;
      enemy[4] = false;
    }
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
    rect(x - 30, y, 60, 20);
  }

  //bullet
  if (shoot === true && tempGameover === false) {
    fill(0, 251, 255);
    rect(shootaxis[0] - 1, shootaxis[1], 2, 20);
    shootaxis[1] = shootaxis[1] - 20;

    if (shootaxis[1] < -20) {
      shoot = false;
    }
  }

  // upper random() chooses if enemy is allowed to shoot
  // lower random() chooses which enemy is allowed to shoot
  /*
  if (random() < 0.01) {
    let enemy = enemies[Math.round(random(0, 4))];
    if (enemy[4] === true) {
      eb.push([...enemy]);
    }
  }
    */

  if (shootingTick >= shootingThreshold) {
    let enemy = enemies[Math.round(random(0, 4))];
    if (enemy[4] === true) {
      eb.push([...enemy]);
      shootingTick = random(0, shootingThreshold / 2);
    }
  } else {
    shootingTick += 1;
  }

  for (let i = 0; i < eb.length; i++) {
    let enemybullet = eb[i];
    fill(250, 250, 250);
    //enemy rect
    if (existence === true) {
      rect(enemybullet[0], enemybullet[1], 2, 15);
    }
    enemybullet[1] = enemybullet[1] + 10;
    if (enemybullet[1] > 620) {
      eb.splice(i, 1);
    }

    // enemy shoots me

    if (
      enemybullet[0] >= x - 30 &&
      enemybullet[0] <= x + 30 &&
      enemybullet[1] >= y &&
      enemybullet[1] <= y + 20
    ) {
      eb.splice(i, 1);
      count = count - 1;
    }
    if (count < 1) {
      eb.splice(i, 1);
      tempGameover = true;
    }
  }
  if (tempGameover === true) {
    fill(237, 30, 26);
    textStyle(BOLD);
    text("Game Over", width / 2 - 50, height / 2);
  }

  //HUD
  textStyle(NORMAL);
  fill(0, 255, 0);
  textSize(20);
  text("score:" + score, 200, 15);
  text("HP: " + count, 0, 15);
}
