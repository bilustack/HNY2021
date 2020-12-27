let font1,font2,input,button,input_name,pts;
var vehicles = [];

/*
function preload(){
  font1 = loadFont("assets/FUZZXL__.TTF");
  console.log(font1);
  font2 = loadFont("Ubuntu-Light.ttf");
}*/

var sketchHeader = function(p){
  p.f = '';

  p.setup = function(){
    var cnv = p.createCanvas(400,200);
    p.f = p.loadFont("assets/FUZZXL__.TTF");
  }

  p.draw = function(){
    p.background(0);
    p.textFont(p.f);
    p.textSize(30);
    p.fill(255);
    p.text(" HAPPY NEW YEAR ",3,50);
  }

}

var sketchBody = function(p){
  p.font = '';
  let input = '';
  let button = '';
  let cnv = '';
  
  class Vehicle{
    constructor(x,y){
        this.pos = p.createVector(p.random(400),p.random(400));
        this.target = p.createVector(x,y);
        this.vel = p5.Vector.random2D();
        this.acc = p.createVector();
        this.r = 8;
        this.maxSpeed = 5;
        this.maxForce = 1;
        
    }

    behaviour() {
        var seek = this.arrive();
        var m = p.createVector(p.mouseX,p.mouseY);
        var flee = this.flee(m);

        seek.mult(1);
        flee.mult(2);

        this.applyForce(seek);
        this.applyForce(flee);

    }

    applyForce(f){
        this.acc.add(f);
    }

    update(){
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }

    show(){
        p.stroke(255);
        p.strokeWeight(2);
        p.point(this.pos.x, this.pos.y);
    }

    arrive(){
        var desired = p5.Vector.sub(this.target,this.pos);
        var d = desired.mag();
        var speed = this.maxSpeed;
        if (d<100){
            var speed = p.map(d,0,100,0,this.maxSpeed);
        }
        desired.setMag(speed);
        var steer = p5.Vector.sub(desired,this.vel);
        steer.limit(this.maxForce);
        return steer;
    }


    flee(target){
        var desired = p5.Vector.sub(target,this.pos);
        var d = desired.mag();
        if(d<50){
            desired.setMag(this.maxSpeed);
            desired.mult(-1);
            var steer = p5.Vector.sub(desired,this.vel);
            steer.limit(this.maxForce);
            return steer;
        }else{
            return p.createVector(0,0);
        }
        
    }
}

  p.setup = function() {
    cnv = p.createCanvas(400,300);
    p.font = p.loadFont("assets/Ubuntu-Light.ttf");
    cnv.position(0,150);
    cnv.background(0);
    input = p.createInput();
    input.size(230,30);
    input.position(30,230);
    
  
    button = p.createButton('submit');
    button.size(70,35)
    button.position(input.x+input.width,230);
    button.mousePressed(p.greet);
  
  }

  p.greet = function(){
    var input_name = input.value();
    var firstChar = input_name.slice(0,1);
    var otherChar = input_name.slice(1);
    firstChar = firstChar.toUpperCase();
    otherChar = otherChar.toLowerCase();
    p.input_name = firstChar + otherChar;
    //console.log(name);
    var font_x = 0;
    if(input_name.length<=10){
      font_x = (10-input_name.length)*20;
    }
  
    pts = p.font.textToPoints(input_name,font_x,150,70);
    //console.log(pts);
    for( var i=0;i<pts.length;i++ ){
      var pt = pts[i];
      var vehicle = new Vehicle(pt.x,pt.y,p);
      vehicles.push(vehicle);
    }
    
    input.remove();
    button.remove();
  }
  
  p.draw = function() {
    p.background(0);
    
  
    for( var i=0;i<vehicles.length;i++ ){
      var v = vehicles[i];
      v.behaviour();
      v.update();
      v.show();
    }
  }
  
}

var sketchFooter = function(p){
  p.font = '';

  p.setup = function(){
    var cnv = p.createCanvas(400,100);
    cnv.position(0,400);
    p.font = p.loadFont("../assets/FUZZXL__.TTF");
  }

  p.draw = function(){
    p.background(0);
    p.textFont(p.font);
    p.textSize(30);
    p.fill(255);
    p.text("      2021      ",0,90);
  }
}


/*
function setup() {
  createCanvas(400,400);
  background(0);
  input = createInput();
  input.size(230,30);
  input.position(30,230);
  

  button = createButton('submit');
  button.size(70,35)
  button.position(input.x+input.width,230);
  button.mousePressed(greet);

}


function greet(){
  input_name = input.value();
  var firstChar = input_name.slice(0,1);
  var otherChar = input_name.slice(1);
  firstChar = firstChar.toUpperCase();
  otherChar = otherChar.toLowerCase();
  input_name = firstChar + otherChar;
  console.log(name);
  var font_x = 0;
  if(input_name.length<=10){
    font_x = (10-input_name.length)*20;
  }

  pts = font2.textToPoints(input_name,font_x,200,70);

  for( var i=0;i<pts.length;i++ ){
    var pt = pts[i];
    var vehicle = new Vehicle(pt.x,pt.y);
    vehicles.push(vehicle);
  }

  input.remove();
  button.remove();
}

function draw() {
  background(0);
  

  for( var i=0;i<vehicles.length;i++ ){
    var v = vehicles[i];
    v.behaviour();
    v.update();
    v.show();
  }

  textFont(font1);
  textSize(30);
  fill(180,150,0);
  //text(" HAPPY NEW YEAR ",3,50);
  text("2021",110,290);
}*/

var Header = new p5(sketchHeader);
var Body = new p5(sketchBody);
var Footer = new p5(sketchFooter);