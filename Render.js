class Render {

    constructor(context, canvas) {
        this.context = context;
        this.canvas = canvas;
        this.logger = true;
    }

    clear() {
        this.canvas.fillStyle = 'black';
        this.canvas.fillRect(0, 0, this.context.width, this.context.height);
    }
    rect(x, y, width, height, color) {
        if (!color) color = 'purple';
        this.canvas.fillStyle = color;
        this.canvas.fillRect(x, y, width, height);
        if (this.logger) console.log(`Renderer | Drawing rectangle of color ${color} in ${x}, ${y} of size ${width}, ${height}`);
    }
}