

var objectContainer;
var bounds = [0,0,0,0];


function conflictCommand(index1, index2, dxdy1, dxdy2) {
    this.cmd = "Collision";
    this.c1Index = index1;
    this.c2Index = index2;
    this.c1Dxdy = dxdy1;
    this.c2Dxdy = dxdy2;
}

/*
 * Checks all components for collisions.
 */
function detectCollisions()
{
    var colliding = [];
    for (var i = 0, length = objectContainer.length; i < length; i++) {

        var object1 = objectContainer[i];

        //check against all others if it is colliding
        for (var j = i + 1; j < length; j++) {
            var object2 = objectContainer[j];
            if (object1.x < object2.x + object2.width && object1.x + object1.width > object2.x
                && object1.y < object2.y + object2.height && object1.height + object1.y > object2.y) {
                resolveImpulses(i, j);

                if (colliding.indexOf(i) == -1) {
                    colliding.push(i);
                }
                if (colliding.indexOf(j) == -1) {
                    colliding.push(j);
                }
            }
        }

        if (object1.x < bounds[0] || object1.x + object1.width > bounds[2] || object1.y < bounds[1] || object1.height + object1.y > bounds[2]) {
            //Bounds conflict
        }

        if (colliding.indexOf(i) == -1) {
            self.postMessage({ cmd: "No Collision", index: i });
        }
    }
}

function resolveImpulses(i, j) {
    var object1 = objectContainer[i];
    var object2 = objectContainer[j];
    var dxdy1 = [0, 0];
    var dxdy2 = [0, 0];

    dxdy1[0] = -object1.vx;
    dxdy1[1] = -object1.vy;
    dxdy2[0] = -object2.vx;
    dxdy2[1] = -object2.vy;
    self.postMessage(new conflictCommand(i, j, dxdy1, dxdy2));
}


self.addEventListener('message', function (event) {
    objectContainer = event.data.objects;
    bounds = event.data.bounds;
    detectCollisions();
},false);
