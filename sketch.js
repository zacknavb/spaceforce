let data;
let bg;
let title, titlel;
let player, bullets, enemy, met, floor, wall, back, front;
let x, y;
let loopStart = 0.5;
let loopDuration = 0.2;
let seconds = 10;

var shoot, death, bgm;

var bgmv = 0.4;

var sfxv = 0.1;

var score = 0;

let scene = 0;

function preload() {
  data = canvas;
  soundFormats('mp3');
  bgm = loadSound('titlem.mp3');
  title = loadImage('title.png');
  titlel = loadImage('titlel.png');
  shoot = loadSound('shoot.mp3');
  death = loadSound('death.mp3');
}

function setup() {
  let canvas = new Canvas(600, 400);
  canvas.parent('data');
  
  switch(scene){
    case 0:
      bg = loadImage('bg.png');
      bgl = loadImage('bgl.png');
      //Player
      x = -50;
      y = height/2;
      player = new Sprite(x,y);
      player.img = 'player.png';
      player.scale = 1.4;
      player.rotationLock = true;
      player.h = 22;
      player.w = 38;
  
      //Game borders
      wall = new Sprite(width/2, -1, width, 1, 'static');
      base = new Sprite(width/2, height+1, width, 1, 'static');
      back = new Sprite(-50, height/2, 1, height, 'static');
      front = new Sprite(width+1, height/2, 1, height, 'static');
      
  
      //Bullets
      bullets = new Group();
      bullets.img = 'bullet.png';
      bullets.scale = 1.8;
      bullets.rotationLock = true;
  
      //Enemies
      enemy = new Group();
      enemy.img = 'enemy.png';
      enemy.scale = 1.4;
      enemy.rotationLock = true;
      
      enemy2 = new Group();
      enemy2.img = 'enemy2.png';
      enemy2.scale = 2;
      enemy2.rotationLock = true;
      
      met = new Group();
      met.img = 'meteor.png';
      met.scale = 1.8;
      met.rotationLock = true;
      
    }
  backgroundM();
}

function draw() {
  clear();
  switch(scene) {
    case 0:
      soundV()
      player.x = -50;
      background(bg);
      image(title, width/2-125, height/2-180);
      textFont('Pixelify Sans');
      textSize(12);
      textAlign(CENTER);
      fill(235, 130, 255);
      text('By Zachary Baker', width/2, height/2-78);
      
      //CONTROLS BUTTON
      if (mouseX >= 215 && mouseX <= 385 && mouseY >= 215 && mouseY <= 265) {
        fill(225, 176, 255);
      }
      else {
        fill("white");
      }
      textAlign(CENTER);
      rectMode(CENTER);
      rect(width/2, height/2+40, 170, 50, 20);
      textSize(28);
      fill('black');
      text('CONTROLS',width/2, height/2+48);
      
      //SETTINGS BUTTON
      if (mouseX >= 215 && mouseX <= 385 && mouseY >= 150 && mouseY <= 200) {
        fill(225, 176, 255);
      }
      else {
        fill("white");
      }
      rectMode(CENTER);
      rect(width/2, height/2-25, 170, 50, 20);
      textSize(28);
      fill('black');
      text('SETTINGS',width/2, height/2-16);
      
      //START BUTTON
      if (mouseX >= 215 && mouseX <= 385 && mouseY >= 280 && mouseY <= 330) {
        fill(225, 176, 255);
      }
      else {
        fill("white");
      }
      rectMode(CENTER);
      rect(width/2, height/2+105, 170, 50, 20);
      textSize(28);
      fill('black');
      text('START', width/2, height/2+115);

    break;
    case 1:
      soundV()
      background(bg);
      textSize(20);
      textFont('Pixelify Sans');
      textAlign(LEFT);
      fill(73, 209, 0);
      text('Score:',470, 20);
      text(score,540,20);
      player.x = 50;
      player.speed= 5;
      enemy.speed = 6;
      enemy.direction = 180;
      enemy2.speed = 4;
      enemy2.direction = 180;
      bullets.speed = 7;
      met.speed = 12;
      met.direction = 180;
  
    if(kb.pressing('up')) {
      player.direction= -90;
      player.x = 50;
    } else if (kb.pressing('down')) {
      player.direction= 90;
      player.x =50;
    } else {
      player.speed = 0;
    }
  
    if(kb.pressed('space')) {
      let b = new bullets.Sprite(player.x+10,player.y,5,5);
      b.direction = 0;
      shoot.play();
    }
    
    if(kb.pressed('escape')) {
      scene = 3;
    }
  
    if(enemy.collides(player)) {
      player.x = -200;
      death.play();
      scene = 2;
    }
    if(enemy2.collides(player)) {
      player.x = -200;
      death.play();
      scene = 2;
    }
    if(met.collides(player)) {
      player.x = -200;
      death.play();
      scene = 2;
    }
    
    spawn();
  
    for(i = 0; i < enemy.length; i++) {
      if(enemy[i].overlap(back)) {
        enemy[i].remove();
        return;
      }
    }
    
    for(i = 0; i < enemy2.length; i++) {
      if(enemy2[i].overlap(back)) {
        enemy2[i].remove();
        return;
      }
    }
      
    for(i = 0; i < bullets.length; i++) {
      if(bullets[i].overlap(front)) {
        bullets[i].remove();
        return;
      }
    }
      
    for(i = 0; i < met.length; i++) {
      if(met[i].overlap(back)) {
        met[i].remove();
        return;
      }
    }
      
    for(i = 0; i < enemy.length; i++) {
      for(j=0; j < bullets.length; j++) {
        if(bullets[j].overlap(enemy[i])) {
          bullets[j].remove();
          enemy[i].remove();
          score+=1;
          return;
      }
    }
   }
      for(i = 0; i < enemy2.length; i++) {
      for(j=0; j < bullets.length; j++) {
        if(bullets[j].overlap(enemy2[i])) {
          bullets[j].remove();
          enemy2[i].remove();
          score+=1;
          return;
      }
    }
   }
      for(i = 0; i < met.length; i++) {
      for(j=0; j < bullets.length; j++) {
        if(bullets[j].overlap(met[i])) {
          bullets[j].remove();
          return;
      }
    }
   }
      for(i = 0; i < met.length; i++) {
      for(j=0; j < enemy.length; j++) {
        if(enemy[j].overlap(met[i])) {
          enemy[j].remove();
          return;
      }
    }
   }
      for(i = 0; i < met.length; i++) {
      for(j=0; j < enemy2.length; j++) {
        if(enemy2[j].overlap(met[i])) {
          enemy2[j].remove();
          return;
      }
    }
   }
  break;
  case 2:
      soundV()
      background(bgl);
      image(titlel, width/2-125, height/2-180);
      textFont('Pixelify Sans');
      fill('white');
      textAlign(CENTER);
      textSize(30);
      fill('red');
      text('GAME OVER',width/2, height/2-40);
      textSize(26);
      fill(73, 209, 0);
      textAlign(LEFT);
      text('SCORE:',width/2-65,height/2+10);
      text(score, width/2+25, height/2+10)
      
      if (mouseX >= 215 && mouseX <= 385 && mouseY >= 235 && mouseY <= 285) {
        fill(94, 0, 0);
      }
      else {
        fill("red");
      }
      noStroke();
      rectMode(CENTER);
      rect(width/2, height/2+60, 170, 50, 20);
      textSize(28);
      textAlign(CENTER);
      fill('white');
      text('TITLE', width/2, height/2+68);
      
      if (mouseX >= 215 && mouseX <= 385 && mouseY >= 300 && mouseY <= 350) {
        fill(94, 0, 0);
      }
      else {
        fill("red");
      }
      noStroke();
      rectMode(CENTER);
      rect(width/2, height/2+125, 170, 50, 20);
      textSize(28);
      textAlign(CENTER);
      fill('white');
      text('PLAY AGAIN', width/2, height/2+133);
  break;   
  
  //Pause Screen
  case 3:
      soundV()
      background(bg);
      rectMode(CENTER);
      stroke(107, 3, 128);
      strokeWeight(3);
      fill(0,0,0, 60)
      rect(width/2, height/2, 300, 380);
      image(title, width/2-125, height/2-220)
      noStroke();
      textSize(26);
      fill(73, 209, 0);
      textAlign(LEFT);
      text('SCORE:',width/2-65,height/2-100);
      text(score, width/2+25, height/2-100)
      
      textSize(20);
      textAlign(CENTER);
      fill('white');
      text('Music Volume',width/2, height/2-55);
      text(bgmv,width/2, height/2-30);
      text('-',width/2-30, height/2-30);
      text('+',width/2+30, height/2-30);
      
      text('SFX Volume',width/2, height/2+5);
      text(sfxv,width/2, height/2+30);
      text('-',width/2-30, height/2+30);
      text('+',width/2+30, height/2+30);
      
      if (mouseX >= 215 && mouseX <= 385 && mouseY >= 260 && mouseY <= 310) {
        fill(225, 176, 255);
      }
      else {
        fill("white");
      }
      rectMode(CENTER);
      rect(width/2, height/2+85, 170, 50, 20);
      textSize(28);
      textAlign(CENTER);
      fill('black');
      text('RESUME', width/2, height/2+95);
      
      if (mouseX >= 215 && mouseX <= 385 && mouseY >= 320 && mouseY <= 370) {
        fill(225, 176, 255);
      }
      else {
        fill("white");
      }
      rectMode(CENTER);
      rect(width/2, height/2+145, 170, 50, 20);
      textSize(28);
      textAlign(CENTER);
      fill('black');
      text('TITLE', width/2, height/2+155);
      
      player.speed= 0;
      enemy.speed = 0;
      enemy2.speed = 0;
      bullets.speed = 0;
      met.speed = 0;
      
      if(kb.pressed('escape')) {
        scene = 1;
      }
  break;
  
  //Settings Screen
  case 4: 
      soundV()
      background(bg);
      image(title, width/2-125, height/2-180);
      fill('white');
      textAlign(CENTER);
      textSize(38);
      text('SETTINGS',width/2, height/2-60);
      
      textSize(20);
      text('Music Volume',width/2, height/2-35);
      text(bgmv,width/2, height/2-10);
      text('-',width/2-30, height/2-10);
      text('+',width/2+30, height/2-10);
      
      text('SFX Volume',width/2, height/2+25);
      text(sfxv,width/2, height/2+50);
      text('-',width/2-30, height/2+50);
      text('+',width/2+30, height/2+50);
      
      if (mouseX >= 215 && mouseX <= 385 && mouseY >= 280 && mouseY <= 330) {
        fill(225, 176, 255);
      }
      else {
        fill("white");
      }
      rectMode(CENTER);
      rect(width/2, height/2+105, 170, 50, 20);
      textSize(28);
      textAlign(CENTER);
      fill('black');
      text('BACK', width/2, height/2+115);
      
  break;
  
  //Controls Screen
  case 5:
      soundV()
      background(bg);
      image(title, width/2-125, height/2-180);
      fill('white');
      textAlign(CENTER);
      textSize(38);
      text('CONTROLS',width/2, height/2-60);
      
      textSize(20);
      text('-',width/2, height/2-20);
      text('-',width/2, height/2);
      text('-',width/2, height/2+20);
      text('-',width/2, height/2+40);
      
      textAlign(RIGHT);
      text('MOVE UP',width/2-10, height/2-20);
      text('MOVE DOWN',width/2-10, height/2);
      text('SHOOT',width/2-10, height/2+20);
      text('PAUSE',width/2-10, height/2+40);
      
      textAlign(LEFT);
      text('[W/⇧]',width/2+10, height/2-20);
      text('[S/⇩]',width/2+10, height/2);
      text('[SPACE]',width/2+10, height/2+20);
      text('[ESC]',width/2+10, height/2+40);
      
      if (mouseX >= 215 && mouseX <= 385 && mouseY >= 280 && mouseY <= 330) {
        fill(225, 176, 255);
      }
      else {
        fill("white");
      }
      rectMode(CENTER);
      rect(width/2, height/2+105, 170, 50, 20);
      textSize(28);
      textAlign(CENTER);
      fill('black');
      text('BACK', width/2, height/2+115);
  break;
  }
}


function spawn() {
  if (seconds <=60 && frameCount % 60 == 0) {
    new enemy.Sprite(width,random(height));
    new enemy2.Sprite(width,random(height));
  }
  if (seconds <=60 && frameCount % 60 == 0) {
    new met.Sprite(width,random(height));
  }
}

function backgroundM() {
  bgm.loop();
  userStartAudio();
}

function soundV() {
  bgm.setVolume(bgmv);
  shoot.setVolume(sfxv);
  death.setVolume(sfxv);
  if (bgmv <= 0) {
    bgmv = 0;
  }
  if (bgmv >= 1) {
    bgmv = 1;
  }
  if (sfxv <= 0) {
    sfxv = 0;
  }
  if (sfxv >= 1) {
    sfxv = 1;
  }
}

function mouseClicked() {
  //Title Screen Start Button
  if (mouseX >= 215 && mouseX <= 385 && mouseY >= 280 && mouseY <= 330 && scene == 0){
    player.x = 50;
    player.y = height/2;
    scene = 1;
  }
  //Title Screen Controls Button
  if(mouseX >= 215 && mouseX <= 385 && mouseY >= 215 && mouseY <= 265 && scene == 0){
    scene = 5;
  }
  
  //Title Screen Settings Button
  if(mouseX >= 215 && mouseX <= 385 && mouseY >= 150 && mouseY <= 200 && scene == 0){
    scene = 4;
  }
  
  //Controls Screen Back Button
  if (mouseX >= 215 && mouseX <= 385 && mouseY >= 280 && mouseY <= 330 && scene == 5){
    scene = 0;
  }
  
  //Settings Screen Back Button
  if (mouseX >= 215 && mouseX <= 385 && mouseY >= 280 && mouseY <= 330 && scene == 4){
    scene = 0;
  }
  
  //Settings Screen - bgmv Button
  if (mouseX >= 260 && mouseX <= 280 && mouseY >= 175 && mouseY <= 195 && scene == 4){
    bgmv -= 0.1;
  }
  
  //Settings Screen + bgmv Button
  if (mouseX >= 320 && mouseX <= 340 && mouseY >= 175 && mouseY <= 195 && scene == 4){
    bgmv += 0.1;
  }
  
  //Settings Screen + sfxv Button
  if (mouseX >= 260 && mouseX <= 280 && mouseY >= 240 && mouseY <= 260 && scene == 4){
    sfxv -= 0.1;
  }
  
  //Settings Screen + sfxv Button
  if (mouseX >= 320 && mouseX <= 340 && mouseY >= 240 && mouseY <= 260 && scene == 4){
    sfxv += 0.1;
  }
  
  //Lose Screen Title Button
  if (mouseX >= 215 && mouseX <= 385 && mouseY >= 235 && mouseY <= 285 && scene == 2){
    enemy.cull(-1000);
    enemy2.cull(-1000);
    bullets.cull(-1000);
    met.cull(-1000);
    score = 0;
    scene = 0;
  }
  
  //Lose Screen Play Again Button
  if (mouseX >= 215 && mouseX <= 385 && mouseY >= 300 && mouseY <= 350 && scene == 2){
    enemy.cull(-1000);
    enemy2.cull(-1000);
    bullets.cull(-1000);
    met.cull(-1000);
    score = 0;
    player.x = 50;
    player.y = height/2;
    scene = 1;
  }
  
  //Pause Screen Resume Button
  if (mouseX >= 215 && mouseX <= 385 && mouseY >= 260 && mouseY <= 310 && scene == 3){
    scene = 1;
  }
  
  //Pause Screen Title Button
  if (mouseX >= 215 && mouseX <= 385 && mouseY >= 320 && mouseY <= 370 && scene == 3){
    enemy.cull(-1000);
    enemy2.cull(-1000);
    bullets.cull(-1000);
    met.cull(-1000);
    score = 0;
    scene = 0;
  }
  
  //Pause Screen - bgmv Button
  if (mouseX >= 260 && mouseX <= 280 && mouseY >= 155 && mouseY <= 175 && scene == 3){
    bgmv -= 0.1;
  }
  
  //Pause Screen + bgmv Button
  if (mouseX >= 320 && mouseX <= 340 && mouseY >= 155 && mouseY <= 175 && scene == 3){
    bgmv += 0.1;
  }
  
  //Pause Screen + sfxv Button
  if (mouseX >= 260 && mouseX <= 280 && mouseY >= 220 && mouseY <= 240 && scene == 3){
    sfxv -= 0.1;
  }
  
  //Pause Screen + sfxv Button
  if (mouseX >= 320 && mouseX <= 340 && mouseY >= 220 && mouseY <= 240 && scene == 3){
    sfxv += 0.1;
  }
}

