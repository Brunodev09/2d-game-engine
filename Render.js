class Render {

    constructor(context, canvas) {
        this.context = context;
        this.canvas = canvas;
        this.logger = false;
    }

    clear() {
        this.canvas.fillStyle = 'black';
        this.canvas.fillRect(0, 0, this.context.width, this.context.height);
    }
    rect(x, y, width, height, color) {
        if (!color) color = 'purple';
        this.canvas.fillStyle = color;
        this.canvas.fillRect(x, y, width, height);
        this.canvas.beginPath();
        this.canvas.lineWidth = "6";
        this.canvas.strokeStyle = color;
        this.canvas.rect(x, y, width, height);
        this.canvas.stroke();
        if (this.logger) console.log(`Renderer | Drawing rectangle of color ${color} in ${x}, ${y} of size ${width}, ${height}`);
    }
}