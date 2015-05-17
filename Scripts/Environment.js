var objectContainer = new Array();
var timeElapsed = 0;
var time;
var worker;

var bounds = []


function PhysicsEnvironment() {
    var renderEngine = new renderingEngine();
    

    this.initialise = function () {
        objectContainer.push(new Circle(750, 500, 40, "green", 40, 0.6));
        objectContainer.push(new Circle(500, 500, 40, "green", 40, 0.8));
        objectContainer.push(new Circle(400, 500, 40, "green", 40, 0.5));
        objectContainer.push(new Circle(550, 100, 20, "green", 20, 1.0));
        objectContainer.push(new Circle(800, 200, 40, "green", 40, 0.5));
        objectContainer.push(new Circle(100, 200, 100, "green", 1000, 0.1));
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

 

    function gameLoop() {
        timeElapsed = new Date().getSeconds() - time;
        time = new Date().getSeconds();

        //Update Object Positions
        updateObjectPositions();
        
        detectCollisions();

        renderEngine.render();

        requestAnimationFrame(gameLoop);        
    }

    
}




