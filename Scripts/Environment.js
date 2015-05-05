var objectContainer = new Array();
var timeElapsed = 0;
var time;
var worker;

var bounds = []


function PhysicsEnvironment() {
    this.initialise = function () {

        objectContainer.push(new Square(750, 500, 100, 100, "green"));
        objectContainer.push(new Square(500, 500, 100, 100, "green"));
        //objectContainer.push(new Square(750, 500, 100, 100, "green"));
        //objectContainer.push(new Square(500, 500, 100, 100, "green"));
        //objectContainer.push(new Square(750, 500, 100, 100, "green"));
        //objectContainer.push(new Square(500, 500, 100, 100, "green"));
        //objectContainer.push(new Square(750, 500, 100, 100, "green"));
        //objectContainer.push(new Square(500, 500, 100, 100, "green"));

        bounds = [0, 0, canvas.width, canvas.height];

        time = new Date().getSeconds();

        worker = new Worker('../Scripts/CollisionDetecter.js');
        worker.addEventListener('message', function (e) { workerReceiveMessage(e) }, false);

        gameLoop();
    }

    function workerReceiveMessage(e){
        switch(e.data.cmd)
        {
            case "Collision":
                objectContainer[e.data.c1Index].colour = "red";
                objectContainer[e.data.c2Index].colour = "red";
                objectContainer[e.data.c1Index].updateVelocity(e.data.c1Dxdy[0], e.data.c1Dxdy[1]);
                objectContainer[e.data.c2Index].updateVelocity(e.data.c2Dxdy[0], e.data.c2Dxdy[1]);
                break;
            case "No Collision":
                objectContainer[e.data.index].colour = "green";
        }
    }

    function updateObjectPositions() {
        for (var i = 0, length = objectContainer.length; i < length; i++) {
            var object = objectContainer[i];
            if (mouseDownLocationX > object.x && mouseDownLocationX < object.x + object.width && mouseDownLocationY > object.y && mouseDownLocationY < object.y + object.height && grabbedObject == -1) {
                grabbedObject = i;
                object.updateVelocity(0, 0);
            }
            
            object.resolveVelocity();         
        }
        worker.postMessage({ objects: objectContainer, bounds: bounds });
    }


    function drawObjects(){
        //Draw all components in array
        for (var i = 0, length = objectContainer.length; i < length; i++)
        {
            context.beginPath();
            objectContainer[i].draw();
        }
    }

    function gameLoop() {
        timeElapsed = new Date().getSeconds() - time;
        time = new Date().getSeconds();

        //Update Object Positions
        updateObjectPositions();
        
        render();

        requestAnimationFrame(gameLoop);        
    }

    function render() {
        //clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        //Render all the objects
        drawObjects();
    }
}




