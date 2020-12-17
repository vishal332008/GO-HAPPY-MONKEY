
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground , groundImage , invisibleGround;
var restart , restartImage;
gameState = "play";
score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  groundImage = loadImage("ground.jpg");
  
  restartImage = loadImage("download (1).jpg");
 
}



function setup() {
  createCanvas(600,600);
  
  ground = createSprite(555,300,100,100);
  ground.addImage("ground", groundImage);
  ground.scale = 0.8;
  
  monkey = createSprite(50,550,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.16;
  
  invisibleGround = createSprite(300,590,600,20);
  invisibleGround.visible = false;
  
      
  restart = createSprite(300,300,20,20);
  restart.addImage(restartImage);
  
  obstacleGroup = new Group();
  foodGroup = new Group();
  
  monkey.setCollider("rectangle",0,0,350,500);
  
}


function draw() {
 background("black");
  
  if(gameState === "play"){
    ground.velocityX = -6;
  
    if(ground.x<35){
     ground.x = 555;
   } 
    
    restart.visible = false;
  
   if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
     score = score + 1;
   }
  
   if(keyDown("space") && monkey.y > 520){
    monkey.velocityY = -20;
   }  
    
    monkey.velocityY =  monkey.velocityY + 1;
    
   if(monkey.isTouching(obstacleGroup)){
    gameState = "over";
   }
  
  spawnFood();
  spawnObstacles();
  
  }
  
  monkey.collide(invisibleGround);
  
  if(gameState === "over"){
    obstacle.lifetime = -1;
    banana.lifetime = -1;
    
    obstacle.velocityX = 0;
    banana.velocityX = 0;
    
    ground.velocityX = 0;
    
    restart.visible = true;
    
    if(mousePressedOver(restart)){
     reset();
    }
  }
  
  drawSprites();
  text("SCORE : " + score,500,100);
}

function spawnFood(){
 if (frameCount % 120 === 0){
   banana = createSprite(650,300,20,20);
   banana.addImage("food", bananaImage);
   banana.velocityX = -6;
   banana.lifetime = 300;
   banana.scale = 0.1;
   
   
   //add each obstacle to the group
    foodGroup.add(banana);
   
 }
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   obstacle = createSprite(650,525,20,20);
   obstacle.addImage("obstacle", obstacleImage);
   obstacle.velocityX = -6;
   obstacle.lifetime = 300;
   obstacle.scale = 0.25;
   
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
   
 }
}

function reset(){
  gameState = "play";
  
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  
  score = 0;
}





