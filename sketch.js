let img;
let x = 400;
let y = 575;
let speed = 5;
let enemyspeed = 2;
let direction = 1;
let shootaxis = [0, 1];
let shoot = false;
let position2 = [0, 0];
let enemies = [];
//enemy bullet variable
let eb = [];
let tempGameover = false;

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

  //enemy render
  fill(255, 0, 0);
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
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

    // hit moment
    if (
      shoot === true &&
      enemy[4] === true &&
      shootaxis[0] >= enemy[0] &&
      shootaxis[0] <= enemy[0] + enemy[2] &&
      shootaxis[1] >= enemy[1] &&
      shootaxis[1] <= enemy[1] + enemy[3]
    ) {
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
  if (shoot === true) {
    fill(100, 255, 100);
    rect(shootaxis[0] - 1, shootaxis[1], 2, 20);
    shootaxis[1] = shootaxis[1] - 20;

    if (shootaxis[1] < -20) {
      shoot = false;
    }
  }

  // upper random() chooses if enemy is allowed to shoot
  // lower random() chooses which enemy is allowed to shoot

  if (random() < 0.01) {
    let enemy = enemies[Math.round(random(0, 4))];
    if (enemy[4] === true) {
      eb.push([...enemy]);
    }
  }

  for (let i = 0; i < eb.length; i++) {
    let enemybullet = eb[i];
    fill(255, 0, 0);

    rect(enemybullet[0], enemybullet[1], 2, 20);
    enemybullet[1] = enemybullet[1] + 10;
    if (enemybullet[1] > 620) {
      eb.splice(i, 1);
    }

    if (
      enemybullet[0] >= x - 30 &&
      enemybullet[0] <= x + 30 &&
      enemybullet[1] >= y &&
      enemybullet[1] <= y + 20
    ) {
      tempGameover = true;
    }
  }
}
