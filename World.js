let r = window.tools.rand;
let f = window.tools.floor;
let arr = window.tools.array;


class World {

    static get DEFAULT_SCALE() {
        return new Scale();
    }

    static get DOUBLE_SCALE() {
        return new Scale(5, 5);
    }

    constructor(width, height, tileSizeX, tileSizeY, render) {
        // this.view = new View();
        this.dimension = World.DOUBLE_SCALE.applyScale(width, height);
        this.tileDimension = new Dimension(tileSizeX, tileSizeY);

        this.map = new Space(width, height);

        this.render = render;

    }

    get wTileCount() {
        return f(this.dimension.width / this.tileDimension.width);
    }

    get hTileCount() {
        return f(this.dimension.height / this.tileDimension.height);
    }

    worldRender() {
        // Rate of movement is obviously increasing because this.right/left is always increasing
        for (let i = 0; i <= this.wTileCount; i++) {
            for (let j = 0; j <= this.hTileCount; j++) {
                this.addTexture(i, j, this.map.getBlock(new Point(i, j)));
            }
        }
    }

    addTexture(xp, yp, tex) {

        let xPos = (this.xPos || 0) + (xp * this.tileDimension.width);
        let yPos = (this.yPos || 0) + (yp * this.tileDimension.height);

        switch (tex) {
            case "dirt":
                this.render.rect(xPos, yPos, this.tileDimension.width, this.tileDimension.height, "#654321");
                break;
            case "stone":
                this.render.rect(xPos, yPos, this.tileDimension.width, this.tileDimension.height, "grey");
                break;
            case "room":
                this.render.rect(xPos, yPos, this.tileDimension.width, this.tileDimension.height, "black");
                break;
            case "grass":
                this.render.rect(xPos, yPos, this.tileDimension.width, this.tileDimension.height, "green");
                break;
            case "void":
                this.render.rect(xPos, yPos, this.tileDimension.width, this.tileDimension.height, "black");
                break;
            default:
                this.render.rect(xPos, yPos, this.tileDimension.width, this.tileDimension.height, "black");
                break;
        }
    }

    apply(space, point) {
        this.map.merge(space, point);
    }
}