//Create variables here
var dog, dogImg1, dogImg2;

var foodS, foodStock;

var database;
var button1, button2;

var sadDog,happyDog;  
var fedTime,lastFed;
 var feed,addFood;
  var foodObj;

function preload() {
  //load images here
  dogImg1 = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
 foodObj = new Food();
  //create bodies here
  dog = createSprite(250, 300, 30, 10);
  dog.addImage("dogImage", dogImg1);
  dog.scale = 0.2;


  foodStock = database.ref('Food');
  foodStock.on("value", readStock, showError);

  button1 = createButton('Add Food');
  button2 = createButton('Feed the Dog');

  button1.position(700, 100);
  button2.position(600, 100);

  button2.mousePressed(feedDog);
  button1.mousePressed(addFoods);

  // console.log(foodS);
}

function draw() {
  background(rgb(46, 138, 87));



  drawSprites();

  //add styles here
  //textSize(17);
  //fill("white");
  //strokeWeight(1);
  //text("Note: Press UP ARROW key to feed the Drago Milk!",70,50);
  text("Food Remaining: " + foodS, 170, 180);

  background(46, 139, 87);
  foodObj.display();
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });
  fill(255, 255, 254); textSize(15);
  if (lastFed >= 12) {
    text("Last Feed : " + lastFed % 12 + " PM", 350, 30);
  } else if (lastFed == 0) {
    text("Last Feed : 12 AM", 350, 30);
  } else {
    text("Last Feed : " + lastFed + " AM", 350, 30);
  }
  drawSprites();




}

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}

function writeStock(x) {

  button2.mousePressed(() => {
    x = x - 1;
  })

  button1.mousePressed(() => {
    x = x + 5;
  })

  database.ref('/').update({
    Food: x
  })
}

function showError() {
  console.log("error");
}

function feedDog() {
  dog.addImage(dogImg2);
  if (foodObj.getFoodStock() <= 0) {
    foodObj.updateFoodStock(foodObj.getFoodStock() * 0);
  }
  else {
    foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  }
  database.ref('/').update({ Food: foodObj.getFoodStock(), FeedTime: hour() })
}
//function to add food in stock 
function addFoods() {
  foodS++;
  database.ref('/').update({ 
    Food: foodS 
  })
}












