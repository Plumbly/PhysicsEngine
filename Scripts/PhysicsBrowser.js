var canvas, context;
var env;
var mouseDownLocationX;
var mouseDownLocationY;
var mouseTravelx = 0;
var mouseTravely = 0;
var mouseX;
var mouseY;
var mouseButton = 0;


var grabbedObject = -1;


window.onload = function () {
    canvas = document.getElementById("physicsCanvas");
    context = canvas.getContext("2d");
    canvas.height = 900;
    canvas.width = 1500;

  
    $("#physicsCanvas").mousedown(function (event) { doMouseDown(event) });
    $("#physicsCanvas").mousemove(function (event) { doMouseMove(event) });
    $("#physicsCanvas").mouseup(function (event) { doMouseUp(event) });
    var env = new PhysicsEnvironment();
    env.initialise();
}

function doMouseMove(event) {
    
    if (mouseButton == 1 && grabbedObject != -1)
    {        
        mouseTravelx = event.offsetX - mouseX;
        mouseTravely = event.offsetY - mouseY;
        objectContainer[grabbedObject].updatePosition(mouseTravelx, mouseTravely);
    }
    mouseX = event.offsetX;
    mouseY = event.offsetY;
    worker.postMessage(objectContainer);
}
function doMouseDown(event) {
    mouseButton = event.which || event.button;
    if (mouseButton == 1)
    {
        mouseDownLocationX = event.offsetX;
        mouseDownLocationY = event.offsetY;
    }    
}
function doMouseUp(event) {
    if (grabbedObject != -1)
    {
        objectContainer[grabbedObject].updateVelocity(mouseTravelx, mouseTravely);
    }

    grabbedObject = -1;
    mouseDownLocationX = -1;
    mouseDownLocationY = -1;
    mouseTravelx = 0;
    mouseTravely = 0;
    mouseButton = 0;
}