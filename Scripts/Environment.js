var objectContainer = new Array();
var timeElapsed = 0;
var time;
var worker;


function PhysicsEnvironment() {
    this.initialise = function () {
        objectContainer.push(new Square(750, 500, 100, 100, "green"));
        objectContainer.push(new Square(500, 500, 100, 100, "green"));
        objectContainer.push(new Square(750, 500, 100, 100, "green"));
        objectContainer.push(new Square(500, 500, 100, 100, "green"));
        objectContainer.push(new Square(750, 500, 100, 100, "green"));
        objectContainer.push(new Square(500, 500, 100, 100, "green"));
        objectContainer.push(new Square(750, 500, 100, 100, "green"));
        objectContainer.push(new Square(500, 500, 100, 100, "green"));
        time = new Date().getSeconds();
        worker = new Worker('../Scripts/CollisionDetecter.js');
        worker.postMessage(objectContainer);
        worker.addEventListener('message', function (e) {
            switch(e.data.cmd)
            {
                case "Collision":
                    objectContainer[e.data.index].colour = "red";
                    break;
                case "No Collision":
                    objectContainer[e.data.index].colour = "green";
            }
        }, false);
        render();
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
        worker.postMessage(objectContainer);
    }


    function drawObjects(){
        //Draw all components in array
        for (var i = 0, length = objectContainer.length; i < length; i++)
        {
            context.beginPath();
            objectContainer[i].draw();
        }
    }

    function render() {
        timeElapsed = new Date().getSeconds() - time;
        time = new Date().getSeconds();

        //clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        //Update Object Positions
        updateObjectPositions();
        //Render all the objects
        drawObjects();
        requestAnimationFrame(render);        
    }
}




