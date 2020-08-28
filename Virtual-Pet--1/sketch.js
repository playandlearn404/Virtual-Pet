//Create variables here
var database, dog, happyDog, foodS, foodStock;
function preload()
{
  //load images here
  normalDog = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250, 250, 50, 50);
  dog.addImage(normalDog);
  dog.scale= 0.2;
  foodStock = database.ref("Food");
  foodStock.on("value", readStock)  
}


function draw() {  
  background("lime");
  feedDog();
  drawSprites();
  //add styles here
  stroke("black");
  textSize(20)
  fill("red")
  text("Press UP_ARROW key to feed the dog.", 90, 50);
  text("Food Stock remaining =  " + foodS, 135, 100);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if (x <= 0) {
    x = 0
    alert("There is no food left.");
  } else{
    database.ref('/').update({
      Food:x - 1
    })
  }
}

function feedDog() {
  if (keyWentUp(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
  }
}