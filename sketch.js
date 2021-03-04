var balloon
var database;
function preload(){
balloonImage = loadAnimation("images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png");
backgroundImage = loadImage("images/Hot Air Ballon-01.png");
}
function setup() {
  createCanvas(500,500);
  database = firebase.database();
  balloon = createSprite(250, 250, 50, 50);
  balloon.addAnimation("Balloon",balloonImage);
  balloon.scale = 0.4;
  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", readHeight, showError);
}

function draw() {
  background(backgroundImage);  
  if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
  }
  else if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,10);
  }
  drawSprites();
}
function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}
function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

function showError(){
  console.log("Error");
}