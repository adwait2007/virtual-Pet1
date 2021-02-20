var database,dog,happydog,dogIMG,foodS,foodStock;

function preload(){
  dogIMG=loadImage("images/dogImg.png");
  happydog=loadImage("images/dogImg1.png");
}

function setup(){
  createCanvas(500,500);

  database=firebase.database();

  dog=createSprite(250,270,20,20);
  dog.addImage(dogIMG);
  dog.scale=0.2;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

}

function draw(){
  background(46,139,73);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydog);
  }
  drawSprites();

  textSize(15);
  fill("white");
  text("Food Remaining:"+foodS,200,200)

  textSize(15);
  fill("white");
  text(" Note:Press UP_ARROW Key To Feed Drago Milk! ",100,50);

}

function readStock(data){
   foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  });
}