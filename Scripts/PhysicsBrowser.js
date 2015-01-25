var canvas, context;
var env;
window.onload = function () {
    canvas = document.getElementById("physicsCanvas");
    context = canvas.getContext("2d");
    canvas.height = 900;
    canvas.width = 1500;
    var env = new PhysicsEnvironment();
    env.initialise();
}