function Shape(x,y, colour)
{
    //Physical Properties
    this.mass = 0.5;
    this.restitution = 1.0;
    this.colour = colour;

    //Current Position
    this.x = x;
    this.y = y;
    
    //velocity
    this.vx = 0;
    this.vy = 0;
}

Shape.prototype.updateVelocity = function (vx, vy)
{
    this.vx = vx;
    this.vy = vy;
}

Shape.prototype.updatePosition = function (dx, dy) {
    this.x += dx;
    this.y += dy;
}

Shape.prototype.resolveVelocity = function()
{
    this.updatePosition(this.vx, this.vy);
}


function Square(x, y, width, height, colour) {
    this.parent.constructor.call(this, x, y, colour);
    this.width = width;
    this.height = height;
    this.grabbed = false;
}

Square.prototype = Object.create(Shape.prototype);
Square.prototype.constructor = Square;
Square.prototype.parent = Shape.prototype;

Square.prototype.draw = function () {
    context.filleStyle = this.colour;
    context.rect(this.x, this.y, this.width, this.height);
    context.fill();
}

Square.prototype.checkHit = function () {
    return (mouseDownLocationX > this.x && mouseDownLocationX < this.x + this.width && mouseDownLocationY > this.y && mouseDownLocationY < this.y + this.height);
}

function Circle(x, y, radius, colour) {
    this.parent.constructor.call(this, x, y, colour);
    this.radius = radius;
    this.grabbed = false;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Square;
Circle.prototype.parent = Shape.prototype;

Circle.prototype.draw = function () {
    context.strokestyle = "#000";
    context.fillStyle = this.colour;
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
}

Circle.prototype.checkHit = function () {
    return Math.pow((mouseDownLocationX - this.x), 2) + Math.pow((mouseDownLocationY - this.y), 2) < Math.pow(this.radius, 2); 
}