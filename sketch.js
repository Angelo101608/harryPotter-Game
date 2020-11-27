var PLAY = 1;
var END = 0;
var gameState = PLAY;

var harryPotter, harryPotterIMG;
var ground, invisibleGround, groundImage;

//var cloudsGroup, cloudImage;
var obstaclesGroup, obs1, obs2, obs3, obs4, obs5, obs6;

var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  
  harryPotterIMG = loadImage("harryPotter.png");

  // harryPotter_running =   loadAnimation( harryPotter1.png", harryPotter3.png", harryPotter4.png");
  // harryPotter_collided = loadAnimation( harryPotter_collided.png");
  
  groundImage = loadImage("ground1.png");
  
  // cloudImage = loadImage("cloud.png");
  

  obs1 = loadImage("obs1.png");
  obs2 = loadImage("obs2.png");
  obs3 = loadImage("obs3.png");
  obs4 = loadImage("obs4.png");
  obs5 = loadImage("obs5.png");
  obs6 = loadImage("obs6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart1.png");
}

function setup() {
  createCanvas(displayWidth - 20, displayHeight-30);
  
 
  harryPotter = createSprite(50, height/2,20,50);
  harryPotter.addImage(harryPotterIMG); 
  // harryPotter.addAnimation("running", harryPotter_running);
  // harryPotter.addAnimation("collided", harryPotter_collided);
 harryPotter.scale = 0.5;
 harryPotter.setCollider("rectangle",0, 0, 170, 170);
  
  ground = createSprite(displayWidth/2, displayHeight-300);
  ground.addImage("ground",groundImage);
  // ground.scale=0.5;
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
 
  // cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  harryPotter.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    // if (keyDown("left")) {
    //   // spaceShips[index-1].x=spaceShips[index-1].x-7;
    //   harryPotter.velocityX = -7;
    // }
  
    // if (keyDown("right")) {
    //   // spaceShips[index-1].x=spaceShips[index-1].x+7;
    //   harryPotter.velocityX = 7;

    // }
  
    if (keyDown("up")) {
      // spaceShips[index-1].y=spaceShips[index-1].y-7;
      harryPotter.velocityY = -7;

    }
  
    if (keyDown("down")) {
      // spaceShips[index-1].y=spaceShips[index-1].y+4;
      harryPotter.velocityY = 7;

    }
  
  
  //  harryPotter.velocityY = harryPotter.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
   harryPotter.collide(invisibleGround);
    // spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(harryPotter)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
   harryPotter.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
//    cloudsGroup.setVelocityXEach(0);
    
    //change the harryPotter animation
   //harryPotter.changeAnimation("collided",harryPotter_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
//    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

// function spawnClouds() {
//   //write code here to spawn the clouds
//   if (frameCount % 60 === 0) {
//     var cloud = createSprite(600,120,40,10);
//     cloud.y = Math.round(random(80,120));
//     cloud.addImage(cloudImage);
//     cloud.scale = 0.5;
//     cloud.velocityX = -3;
    
//      //assign lifetime to the variable
//     cloud.lifetime = 200;
    
//     //adjust the depth
//     cloud.depth = harryPotter.depth;
//    harryPotter.depth = harryPotter.depth + 1;
    
//     //add each cloud to the group
// //    cloudsGroup.add(cloud);
//   }
  
// }

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(3,8));
    switch(rand) {
      case 1: obstacle.addImage(obs1);
              break;
      case 2: obstacle.addImage(obs2);
              break;
      case 3: obstacle.addImage(obs3);
              break;
      case 4: obstacle.addImage(obs4);
              break;
      case 5: obstacle.addImage(obs5);
              break;
      case 6: obstacle.addImage(obs6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.25;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  // cloudsGroup.destroyEach();
  
//  harryPotter.changeAnimation("running",harryPotter_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}