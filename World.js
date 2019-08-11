let r = window.tools.rand;
let f = window.tools.floor;
let arr = window.tools.array;


class World {

    static get DEFAULT_SCALE() {
        return new Scale();
    }

    static get DOUBLE_SCALE() {
        return new Scale(2, 2);
    }

    constructor(width, height, tileSizeX, tileSizeY, render) {
        // this.view = new View();
        this.dimension = World.DOUBLE_SCALE.applyScale(width, height);
        this.tileDimension = new Dimension(tileSizeX, tileSizeY);

        this.tileCountX = f(this.dimension.width/this.tileDimension.width);
        this.tileCountY = f(this.dimension.width/this.tileDimension.height);

        this.map = new Space(this.tileCountX, this.tileCountY);

        this.render = render;

    }

    get wTileCount() {
        return f(this.dimension.width / this.tileDimension.width);
    }

    get hTileCount() {
        return f(this.dimension.height / this.tileDimension.height);
    }

    apply(space, point) {
        this.map.merge(space, point);
    }
}