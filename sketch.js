//Global Variables
var monkey;
var stone,banana,ground,back;
var StoneGroup,stone;
var BananaGroup,banana;

function preload(){
jungleImg = loadImage("jungle.jpg");
monkey_running =  loadImage("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImg = loadImage ("Banana.png");
stoneImg = loadImage ("stone.png"); 
monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
}

function setup() {
  canvas = createCanvas(800,600);
  back = createSprite(0,0,800,600);
  back.addImage(jungleImg);
  back.scale = 1.5;
  back.velocityX = -4;
  back.x = back.width/2;
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  ground = createSprite (400,350,800,10);
  ground.visible = false;
  ground.velocityX = -4;
  ground.x = ground.width/2;
  BananaGroup = new Group();
  StoneGroup = new Group();
  score = 0;
  Lives = 0;
}


function draw(){
  textSize  (20);
  fill("red");
  stroke("blue");
  background(255);
  textSize  (20);
  fill("red");
  stroke("blue");
  background(255);
  if (ground.x<0){
  ground.x = ground.width/2;
  }
  
if(BananaGroup.isTouching(monkey)){
score = score+1;
}
  switch(score){
    case 10: monkey.scale = 0.12;
                 break;
    case 20: monkey.scale = 0.14;
                 break;   
    case 30: monkey.scale = 0.16;
                 break;             
    case 40: monkey.scale = 0.18;
                 break; 
  }
  switch(Lives){
    case 1: monkey.scale = 0.10;
            BananaGroup.scale = 0.10;
                 break;
  }     
  
  if(Lives<=1) {
if (back.x<100){
 back.x = back.width/2; 
} 
if(BananaGroup.isTouching(monkey)){ BananaGroup.destroyEach(); 
score = score + 2;
 } if(StoneGroup.isTouching(monkey)){ StoneGroup.destroyEach();
 Lives = Lives + 1; 
}
 if(keyDown("space")){ 
monkey.velocityY = -12;
 } 
monkey.velocityY = monkey.velocityY + 0.8; monkey.collide(ground); 
spawnStone();
 spawnBanana(); 
} 
else if (Lives>1){ 
monkey.visible = false; 
monkey.setVelocity(0,0); 
back.visible = false; 
BananaGroup.destroyEach(); StoneGroup.destroyEach(); 
textSize(30); 
fill("red"); 
stroke("black"); 
text("Game Over",300,200); 
} 
drawSprites();
text("Score:"+score,500,100); text("Lives:"+Lives,100,100); 

Camera();
}
function spawnStone() {
  if(frameCount % 230 === 0) {
    var stone = createSprite(600,350,10,40);
    stone.addImage(stoneImg);
    stone.velocityX = -6;
    //assign scale and lifetime to the obstacle           
    stone.scale = 0.1;
    stone.lifetime = 100;
    StoneGroup.add(stone);
  }
}

function spawnBanana() {
  if(frameCount % 80 === 0) {
    var banana = createSprite(600,100,10,40);
    banana.addImage(bananaImg);
    banana.y = random(120,200);
    //monkey.depth = banana.depth+1;
    banana.velocityX = -6;
    //assign scale and lifetime to the obstacle           
    banana.scale = 0.1;
    banana.lifetime = 100;
    BananaGroup.add(banana);
  }
}

function Camera(){
  camera.position.x = monkey.x;
  camera.position.y = displayHeight/2;
}