function Shape(x,y,width, height, colour)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.colour = colour;
}

function Square(x, y, width, height, colour) {
    this.parent.constructor.call(this, x, y, width, height, colour);
}

Square.prototype = Object.create(Shape.prototype);
Square.prototype.constructor = Square;
Square.prototype.parent = Shape.prototype;

Square.prototype.draw = function () {
    context.strokeStyle = this.colour;
    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
}