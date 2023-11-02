let data;
let bg;
let title, titlel;
let player, floor, wall;
let x, y;
let soundFile
let loopStart = 0.5;
let loopDuration = 0.2;
let bullets;
let enemy;
let seconds = 10;
let shoot, death;

var score = 0;

let scene = 0;

function preload() {
  data = canvas;
  soundFormats('mp3');
  soundFile = loadSound('titlem.mp3');
  title = loadImage('title.png');
  titlel = loadImage('titlel.png');
  shoot = loadSound('shoot.mp3');
  death = loadSound('death.mp3');
}

function setup() {
  let canvas = new Canvas(600, 400);
  canvas.parent('data');
  
  soundFile.loop();
  
  switch(scene){
    case 0:
      bg = loadImage('bg.png');
      bgl = loadImage('bgl.png');
      //Player
      x = -50;
      y = height/2;
      player = new Sprite(x,y);
      player.img = 'player.png';
      player.scale = 0.07;
      player.rotationLock = true;
  
      //Game borders
      wall = new Sprite(width/2,-1,width,1,'static');
      base = new Sprite(width/2,height+1,width,1,'static');
  
      //Bullets
      bullets = new Group();
      bullets.speed = 5;
      bullets.color='white';
      bullets.stroke='white';
      bullets.rotationLock = true;
  
      //Enemies
      enemy = new Group()
      enemy.img = 'enemy.png';
      enemy.scale = 0.03;
      enemy.rotationLock = true;
    }
}

function draw() {
  clear();
  switch(scene) {
    case 0:
      background(bg);
      image(title, width/2-125, height/2-150);
      textFont('Couriier New');
      fill('white');
      textAlign(CENTER);
      textSize(26);
      text('CONTROLS',width/2, height/2-20);
      textSize(12);
      text('[UP/W] TO MOVE UP',width/2, height/2);
      text('[DOWN/S] TO MOVE DOWN',width/2, height/2+20);
      text('[SPACE] TO SHOOT',width/2, height/2+40);
      
      fill("white");
      rectMode(CENTER);
      rect(width/2, height/2+105, 130, 50, 20);
      textSize(28);
      fill('black');
      text('START', width/2, height/2+115);
      if(mouseX >= 225 && mouseX <= 375 && mouseY >= 280 && mouseY <= 330 && mouseIsPressed == true){
        player.x = 50;
        player.y = height/2;
        scene++;
      }
    break;
    case 1:
      background(bg);
      fill('white');
      textSize(20);
      text('Score:',500, 20);
      text(score,540,20);
      player.speed= 5;
  
    if(kb.pressing('up')) {
      player.direction= -90;
    } else if (kb.pressing('down')) {
      player.direction= 90;
    } else {
      player.speed = 0;
    }
  
    if(kb.pressed('space')) {
      let b = new bullets.Sprite(player.x+10,player.y,5,5);
      b.direction = 0;
      shoot.play();
    }
  
    if(enemy.collides(player)) {
      death.play();
      scene++;
    }
    
    spawn();
  
    for(i = 0; i < enemy.length; i++) {
      enemy[i].direction = 180;
      enemy[i].speed = 2;
    for(j=0; j < bullets.length; j++) {
      if(bullets[j].collides(enemy[i])) {
        enemy[i].remove();
        bullets[j].remove();
        score+=1;
      }
    }
   }
  break;
  case 2:
      background(bgl);
      image(titlel, width/2-125, height/2-180);
      textFont('Couriier New');
      fill('white');
      textAlign(CENTER);
      textSize(30);
      fill('red');
      text('GAME OVER',width/2, height/2-40);
      textSize(26);
      fill(73, 209, 0);
      textAlign(RIGHT);
      text('SCORE:',width/2+20,height/2+10);
      text(score, width/2+50, height/2+10)
      
      fill(112, 0, 13);
      noStroke();
      rectMode(CENTER);
      rect(width/2, height/2+60, 130, 30, 20);
      textSize(20);
      textAlign(CENTER);
      fill('black');
      text('TITLE', width/2, height/2+68);
      if(mouseX >= 225 && mouseX <= 375 && mouseY >= 245 && mouseY <= 275 && mouseIsPressed == true){
        enemy.cull(-1000);
        score = 0;
        scene = 0;
      }
  }
}


function spawn() {
  if (seconds <=60 && frameCount % 60 == 0) {
    new enemy.Sprite(600,random(400));
    new enemy.Sprite(600,random(400));
  }
}

