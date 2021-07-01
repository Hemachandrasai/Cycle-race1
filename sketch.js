var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;


var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;


var distance=0;
var gameOver, restart,restartimg;

function preload(){
  pathImg = loadImage("track11.jpg");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
  
  restartimg = loadImage("restart_1.png");
  
 
  
}

function setup(){
  
createCanvas(600,400);
// Moving background
path=createSprite(200,205);
path.addImage(pathImg);
path.scale = 2.5;
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
mainCyclist.setCollider("rectangle",0,100,800,800);
//mainCyclist.debug = true;
  

gameOver = createSprite(320,180);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.7;
gameOver.visible = false;  
  
restart = createSprite(320,250);
restart.addImage(restartimg);
restart.scale = 0.080;
restart.visible = false;
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();

  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(22);
  stroke(0)
  fill("blue");
  text("Distance: "+ distance,400,30);
  fill ("gold")
  
    if(gameState===PLAY){
  distance = distance+Math.round(getFrameRate()/60)

   path.velocityX = -(6 + 2*distance/150);
 
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 100 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else  {
      redCyclists();
  
  }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    
    
  }
  
    
}else if (gameState === END) {
    gameOver.visible = true;
   restart.visible = true;
  
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
  
  if (mousePressedOver(restart)){
    reset();
  }
 
}
     
}

function pinkCyclists(){
        player1 =createSprite(600,Math.round(random(50, 350)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=120;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(600,Math.round(random(50, 350)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=120;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(600,Math.round(random(50, 350)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=120;
        redCG.add(player3);
}

function reset (){
  gameState = PLAY;
  pinkCG.destroyEach();
  redCG.destroyEach();
  yellowCG.destroyEach();
   gameOver.visible = false;
  restart.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  distance = 0;
}
