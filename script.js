var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");

var color = "red";
var size = 5;

// Set some pen boundaries to reduce bugs
var maxPenSize = 25;
var minPenSize = 1;

canvas.addEventListener("mousemove", setMousePosition, false);
function setMousePosition(e) {
  context.beginPath();
  context.arc(e.clientX, e.clientY, size, 0, 2 * Math.PI, true);
  context.fillStyle = color;
  context.fill();
}  

document.onkeydown = function(evt) {
  var key = evt.key;
  switch(key) {
    case "b":
    case "B":
      color = "blue";
      break;
    
    case "g":
    case "G":
      color = "green";
      break;
    
    case "r":
    case "R":
      color = "red";
      break;

    case "y":
    case "Y":
      color = "yellow";
      break;

    case "ArrowUp":
      if (size < maxPenSize)
        size += 1;
      break;
    
    case "ArrowDown":
      if (size > minPenSize)
        size -= 1;
      break;

    case " ":
      context.clearRect(0, 0, canvas.width, canvas.height);
  }
};

// Touch Functionality
// Code used from https://gist.github.com/rjrodger/1011032 

var lastx;
var lasty;

context.strokeStyle = "#000000";
context.lineCap = 'round';
context.lineJoin = 'round';
context.lineWidth = 5;

function dot(x,y) {
  context.beginPath();
  context.fillStyle = "#000000";
  context.arc(x,y,1,0,Math.PI*2,true);
  context.fill();
  context.stroke();
  context.closePath();
}

function line(fromx,fromy, tox,toy) {
  context.beginPath();
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.stroke();
  context.closePath();
}

canvas.ontouchstart = function(event){                   
  event.preventDefault();                 
  
  lastx = event.touches[0].clientX;
  lasty = event.touches[0].clientY;

  dot(lastx,lasty);
}

canvas.ontouchmove = function(event){                   
  event.preventDefault();                 

  var newx = event.touches[0].clientX;
  var newy = event.touches[0].clientY;

  line(lastx,lasty, newx,newy);
  
  lastx = newx;
  lasty = newy;
}