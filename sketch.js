let img;
let x = 400;
let y = 575;
let speed = 5;
let enemyspeed = 3;
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
let ShieldExistence1 = true;
let ShieldExistence2 = true;
let ShieldExistence3 = true;
let ShieldExistence4 = true;
let existence = true;
let enemyExists = false;
let shootingTick = 0;
let shootingThreshold = 60;
let ShieldWidth = 70;
let ShieldHeight = 25;
let score = 0;
let ShieldHP1 = 4;
let ShieldHP2 = 4;
let ShieldHP3 = 4;
let ShieldHP4 = 4;
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
  if (ShieldExistence1 === true) {
    fill(213, 245, 221);
    rect(ShieldXaxis[0], shieldy, ShieldWidth, ShieldHeight);
    textSize(20);
    fill(37, 35, 122);
    text(ShieldHP1, ShieldXaxis[0] + 30, shieldy + 20);
  }

  if (ShieldExistence2 === true) {
    fill(213, 245, 221);
    rect(ShieldXaxis[1], shieldy, ShieldWidth, ShieldHeight);
    textSize(20);
    fill(37, 35, 122);
    text(ShieldHP2, ShieldXaxis[1] + 30, shieldy + 20);
  }

  if (ShieldExistence3 === true) {
    fill(213, 245, 221);
    rect(ShieldXaxis[2], shieldy, ShieldWidth, ShieldHeight);
    textSize(20);
    fill(37, 35, 122);
    text(ShieldHP3, ShieldXaxis[2] + 30, shieldy + 20);
  }

  if (ShieldExistence4 === true) {
    fill(213, 245, 221);
    rect(ShieldXaxis[3], shieldy, ShieldWidth, ShieldHeight);
    textSize(20);
    fill(37, 35, 122);
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
      score = score + 1;
      score = score * 2;
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

  //spaceship shooting
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
      eb.push([enemy[0] + enemy[2] / 2, enemy[1] + enemy[3] / 2]);
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
  text("score: " + score, 200, 15);
  text("HP: " + count, 0, 15);
}
