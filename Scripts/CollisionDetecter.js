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

                resolveImpulses(i, j);
            }

        }
    }
}

function resolveImpulses(i, j) {
    var object1 = objectContainer[i];
    var object2 = objectContainer[j];

    var relative_velocity = [object1.vx - object2.vx, object1.vy - object2.vy];

    var n = [object1.x - object2.x, object1.y - object2.y];


    var vectorlength = Math.sqrt(Math.pow(n[0], 2) + Math.pow(n[1], 2));

    var x = n[0] / vectorlength;
    var y = n[1] / vectorlength;

    var dot_productnorm1 = (relative_velocity[0] * x) + (relative_velocity[1] * y);

    if (dot_productnorm1 > 0) {
        return;
    }

    var e = Math.min(object1.restitution, object2.restitution);

    var j = -(1 + e) * dot_productnorm1
    j /= 1 / object1.mass + 1 / object2.mass;

    // Apply impulse
    var impulse = [j * x, j * y];

    object1.vx += (1 / object1.mass * impulse[0]);
    object1.vy += (1 / object1.mass * impulse[1]);

    object2.vx -= (1 / object2.mass * impulse[0]);
    object2.vy -= (1 / object2.mass * impulse[1]);

    //var x = n[0] / vectorlength;
    //var y = n[1] / vectorlength;

    //var cpx = [-y, x];

    //var dot_productnorm1= (object1.vx * x) + (object1.vy * y);
    //var dot_productnorm2 = (object2.vx * x) + (object2.vy * y);

    //var n_vel1_after = ((dot_productnorm1 * (object1.mass - object2.mass)) + (2 * object2.mass * dot_productnorm2)) / (object2.mass + object1.mass);
    //var n_vel2_after = ((dot_productnorm2 * (object2.mass - object1.mass)) + (2 * object1.mass * dot_productnorm1)) / (object2.mass + object1.mass);

    //// Convert the scalers to vectors by multiplying by the normalised plane vectors.
    //var vec_n_vel2_after = [n_vel2_after * x, n_vel2_after * y];
    //var vec_n_vel1_after = [n_vel1_after * x, n_vel1_after * y];

    //object1.vx -= vec_n_vel1_after[0];
    //object1.vy -= vec_n_vel1_after[1];

    //object2.vx += vec_n_vel2_after[0];
    //object2.vy += vec_n_vel2_after[1];


    

    
    
}



