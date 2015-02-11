

var objectContainer;
function command(cmd,index)
{
    this.cmd = cmd;
    this.index = index;
}
function detectCollisions()
{  
    for (var i = 0, length = objectContainer.length; i < length; i++) {
        var message = "No Collision";
            var object1 = objectContainer[i];
            for (var j = i+1; j < length; j++) {
                var object2 = objectContainer[j];
                if (object1.x < object2.x + object2.width && object1.x + object1.width > object2.x && object1.y < object2.y + object2.height && object1.height + object1.y > object2.y) {
                    message = "Collision"
                } 
            }
            self.postMessage(new command(message, i));
        }  
}
self.addEventListener('message', function (event) {
    objectContainer = event.data;
    detectCollisions();
},false);
