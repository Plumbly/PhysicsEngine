var collisionPoints = [];

/*
 * Checks all components for collisions.
 */
function detectCollisions() {
    collisionPoints.length = 0;
    for (var i = 0, length = objectContainer.length; i < length; i++) {
        var object1 = objectContainer[i];

        if ((object1.x - object1.radius) < bounds[0] || object1.x + object1.radius > bounds[2]) {
            object1.vx = -object1.vx;
        }

        if ((object1.y - object1.radius) < bounds[1] || (object1.y + object1.radius) > bounds[3]) {
            object1.vy = -object1.vy;
        }

        //check against all others if it is colliding
        for (var j = i + 1; j < length; j++) {
            var object2 = objectContainer[j];
            //if (object1.x < object2.x + object2.width && object1.x + object1.width > object2.x
            //    && object1.y < object2.y + object2.height && object1.height + object1.y > object2.y) {
            //    resolveImpulses(i, j);               
            //}

            var deltaXSquared = object1.x - object2.x; // calc. delta X
            deltaXSquared *= deltaXSquared; // square delta X
            var deltaYSquared = object1.y - object2.y; // calc. delta Y
            deltaYSquared *= deltaYSquared; // square delta Y

            // Calculate the sum of the radii, then square it
            var sumRadiiSquared = object1.radius + object2.radius; 
            sumRadiiSquared *= sumRadiiSquared;

            if (deltaXSquared + deltaYSquared <= sumRadiiSquared) {
                var collisionPointX = ((object1.x * object2.radius) + (object2.x * object1.radius)) / (object1.radius + object2.radius);
                var collisionPointY = ((object1.y * object2.radius) + (object2.y * object1.radius)) / (object1.radius + object2.radius);
                collisionPoints.push([collisionPointX, collisionPointY])

                //resolveImpulses(i, j);
            }

        }
    }
}

function resolveImpulses(i, j) {
    var object1 = objectContainer[i];
    var object2 = objectContainer[j];

    //var relative_velocity;

    //var dot_product = (object1.vx * object2.vx) + (object1.vy + object2.vy);
    

    //var dx1 = minRestitution * object1.vx;
    //var dx2 = minRestitution * object2.vx;
    //var dy1 = minRestitution * object1.vy;
    //var dy2 = minRestitution * object2.vy;

    //var dxdy1 = [0, 0];
    //var dxdy2 = [0, 0];

    var dx = object1.vx - object2.vx;
    var dy = object1.vy - object2.vy;

    var e = Math.min(object1.restitution, object2.restitution);

    var normal = (Math.pow(dx, 2) + Math.pow(dy, 2));
    var normalx = dx/normal;
    var normaly = dy/normal;

    var dot1 = (dx * normalx) + (dy * normaly);

        var j = -(1 + e) * dot1;
        j /= (1 / object1.mass) + (1 / object2.mass);

        var impulsex = j * normalx;
        var impulsey = j * normaly;

        object1.vx -= 1 / object1.mass * impulsex;
        object1.vy -= 1 / object1.mass * impulsey;

        object2.vx -= 1 / object2.mass * impulsex;
        object2.vy += 1 / object2.mass * impulsey;

    
    
}



