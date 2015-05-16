﻿var objectContainer = new Array();
var timeElapsed = 0;
var time;
var worker;

var bounds = []


function PhysicsEnvironment() {
    var renderGrid = false;
    var renderCollisionPoints = true;

    this.initialise = function () {
        objectContainer.push(new Circle(750, 500, 40, "green"));
        objectContainer.push(new Circle(500, 500, 40, "green"));
        bounds = [0, 0, canvas.width, canvas.height];

        time = new Date().getSeconds();

        gameLoop();
    }
    
    function updateObjectPositions() {
        for (var i = 0, length = objectContainer.length; i < length; i++) {
            var object = objectContainer[i];
            if (object.checkHit() && grabbedObject == -1) {
                grabbedObject = i;
                object.updateVelocity(0, 0);
            }  
            //if(i != grabbedObject) {
            //    object.updateVelocity(object.vx, object.vy + 0.5);
            //}
            
            object.resolveVelocity();         
        }
    }

    function drawObjects(){
        //Draw all components in array
        for (var i = 0, length = objectContainer.length; i < length; i++)
        {
            context.beginPath();
            objectContainer[i].draw();
        }
    }

    function drawGrid() {
        var squareSize = 50;
        context.strokeStyle = "#000";
        context.beginPath();
        for (var i = 50; i < canvas.width; i += squareSize) {            
            context.moveTo(i, 0);
            context.lineTo(i, canvas.height);
        }
        for (var i = 50; i < canvas.height; i += squareSize) {
            context.moveTo(0, i);
            context.lineTo(canvas.width, i);
        }
        context.stroke();
    }

    function drawCollisionPoints() {
        context.beginPath();
        context.fillStyle = "blue";
        for (var i = 0; i < collisionPoints.length; i++) {
            var point = collisionPoints[i];            
            context.arc(point[0], point[1], 5, 0, 2 * Math.PI);           
        }
        context.fill();
    }

    function drawComponentVectors() {
        context.strokeStyle = "#000";
        for (var i = 0, length = objectContainer.length; i < length; i++) {            
            var object = objectContainer[i];
            context.beginPath()
            context.moveTo(object.x, object.y);
            context.lineTo(object.x + (object.vx*4), object.y);
            context.stroke();
            context.moveTo(object.x, object.y);
            context.lineTo(object.x, object.y + (object.vy*4));
            context.stroke();
        }

        
    }

    function gameLoop() {
        timeElapsed = new Date().getSeconds() - time;
        time = new Date().getSeconds();

        //Update Object Positions
        updateObjectPositions();
        
        detectCollisions();

        render();

        requestAnimationFrame(gameLoop);        
    }

    function render() {
        //clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (renderGrid) { drawGrid(); }

        //Render all the objects
        drawObjects();

        if (renderCollisionPoints) { drawCollisionPoints() }

    }
}




