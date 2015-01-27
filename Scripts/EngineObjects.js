function Shape(x,y,width, height, colour)
{
    //Physical Properties
    this.width = width;
    this.height = height;
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
    this.parent.constructor.call(this, x, y, width, height, colour);
    this.grabbed = false;
}

Square.prototype = Object.create(Shape.prototype);
Square.prototype.constructor = Square;
Square.prototype.parent = Shape.prototype;

Square.prototype.draw = function () {
    context.strokeStyle = this.colour;
    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
}