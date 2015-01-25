var objectContainer = new Array();
function PhysicsEnvironment() {
    this.initialise = function () {
        objectContainer.push(new Square(750, 500, 100, 100, "black"));
        objectContainer.push(new Square(500, 500, 100, 100, "red"));
        render();
    }

    function updateObjectPositions() {
        for (var i = 0, length = objectContainer.length; i < length; i++) {
            var object = objectContainer[i];
            if ((object.y + object.height) < canvas.height)
            {
                object.y += 2;
            }
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

    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        updateObjectPositions();
        drawObjects();
        requestAnimationFrame(render);        
    }
}


