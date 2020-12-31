let font1,font2,input,button,input_name,pts;
var vehicles = [];


function preload(){
  font1 = loadFont("assets/FUZZXL__.TTF");
  font2 = loadFont("assets/Ubuntu-Light.ttf");
}


let footer;
function setup() {
  var cnv = createCanvas(windowWidth, 500)
  cnv.position(0,120);
  footer = createGraphics(windowWidth, 450)
  
 
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
  footer.textFont(font1);
  footer.textSize(30);
  footer.fill(255, 215, 0);
  footer.text("      2021      ",0,30);
  image(footer, 0, 400, windowWidth, 500)

  for( var i=0;i<vehicles.length;i++ ){
    var v = vehicles[i];
    v.behaviour();
    v.update();
    v.show();
  }

  
}
