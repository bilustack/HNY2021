let font1,font2,input,button,input_name,pts;
var vehicles = [];


function preload(){
  font1 = loadFont("assets/FUZZXL__.TTF");
  font2 = loadFont("assets/Ubuntu-Light.ttf");
}


let header;
function setup() {
  var cnv = createCanvas(windowWidth, 500)
  cnv.position(0,120);
  header = createGraphics(windowWidth, 450)
  //footer = createGraphics(windowWidth, 100)
 
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
  //console.log(name);
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
  
  var chText = document.getElementById("change-text");
  chText.innerHTML = "Now Touch or Hover";
  
}

function draw() {
  background(0);
  header.textFont(font1);
  header.textSize(30);
  header.fill(255);
  header.text("      2021      ",0,30);
  image(header, 0, 400, windowWidth, 500)

  for( var i=0;i<vehicles.length;i++ ){
    var v = vehicles[i];
    v.behaviour();
    v.update();
    v.show();
  }

  
}


//var Header = new p5(sketchHeader);
//var Body = new p5(sketchBody);
//var Footer = new p5(sketchFooter);
