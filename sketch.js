const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
let rope
let engine;
let world;
let ground;
let fruit;
let fruit_con
let backgroundimg
let food
let rabbit;
let bunny
var blink
var eat
var sad
function preload() {
backgroundimg=loadImage("background.png")
food=loadImage("melon.png")
rabbit=loadImage("Rabbit-01.png")
eat=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
blink=loadAnimation("blink_1.png","blink_2.png","blink_3.png")
sad=loadAnimation("sad_1.png","sad_2.png","sad_3.png")
blink.playing=true;
eat.playing=true;
sad.playing=true;
eat.looping=false;
sad.looping=false;
}
function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
  button=createImg("cut_button.png")
  button.position(210,30)
  button.size(50,50)
  button.mouseClicked(drop)
blink.frameDelay=20
sad.frameDelay=20
  bunny=createSprite(200,630,50,50)
 bunny.scale=0.2
 bunny.addAnimation("blinking",blink)
 bunny.addAnimation("crying",sad)
 bunny.addAnimation("eating",eat)
 bunny.changeAnimation("blinking")
  let options = {
    density:0.001
  }
 
 ground = new Ground(250,690,500,20)
 rope = new Rope(7,{x:245,y:30})
  rectMode(CENTER);
  fruit= Bodies.circle(300,300,20,options)

  Matter.Composite.add(rope.body,fruit)
  fruit_con=new Link(rope,fruit)
  ellipseMode(RADIUS);
  textSize(50)
}

function draw() 
{
  background(51);
  image(backgroundimg,0,0,displayWidth+80,displayHeight+80)
  imageMode(CENTER)
  Engine.update(engine);
   ground.display()
   rope.show();
   push()
   imageMode(CENTER)
   if(fruit!==null){
   image(food,fruit.position.x,fruit.position.y,70,70)
   pop()
}
if(collide(fruit,bunny)==true){
bunny.changeAnimation("eating")

}
if(collide(fruit,ground.body)==true){
bunny.changeAnimation("crying")

}
drawSprites();

}

function drop(){
rope.break()
fruit_con.detach()
fruit_con=null;
}
function collide(body,sprite){
if(body!=null){
  var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
if(d<=80){
World.remove(engine.world,fruit)
fruit=null
return true
}
else{
  return false
}
}

}