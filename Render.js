class Render {

    constructor(context, canvas) {
        this.context = context;
        this.canvas = canvas;
        this.logger = false;
    }

    static get COLOR_BROWN() {return "#654321"}
    static get COLOR_GREY() {return "grey"}
    static get COLOR_BLACK() {return "black"}
    static get COLOR_GREEN() {return "green"}

    worldRender(map, wTileCount, hTileCount, xOffset, yOffset, tileDimension) {
        for (let i = 0; i <= wTileCount; i++) {
            for (let j = 0; j <= hTileCount; j++) {
                this.addTexture(i, j, map.getBlock(new Point(i, j)), xOffset, yOffset, tileDimension);
            }
        }
    }

    addTexture(xp, yp, tex, xOffset, yOffset, tileDimension) {

        let xPos = (xOffset || 0) + (xp * tileDimension.width);
        let yPos = (yOffset || 0) + (yp * tileDimension.height);

        switch (tex) {
            case "dirt":
                this.rect(xPos, yPos, tileDimension.width, tileDimension.height, Render.COLOR_BROWN);
                break;
            case "stone":
                this.rect(xPos, yPos, tileDimension.width, tileDimension.height, Render.COLOR_GREY);
                break;
            case "room":
                this.rect(xPos, yPos, tileDimension.width, tileDimension.height, Render.COLOR_BLACK);
                break;
            case "grass":
                this.rect(xPos, yPos, tileDimension.width, tileDimension.height, Render.COLOR_GREEN);
                break;
            case "void":
                this.rect(xPos, yPos, tileDimension.width, tileDimension.height, Render.COLOR_BLACK);
                break;
            default:
                this.rect(xPos, yPos, tileDimension.width, tileDimension.height, Render.COLOR_BLACK);
                break;
        }
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