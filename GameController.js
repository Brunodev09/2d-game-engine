let _this;
window.references = {};
window.references.gc = {};

let xOffset = 0, yOffset = 0;

class GameController {
    constructor(renderInstance, worldInstance, viewInstance) {
        this.fps = 100;
        this.renderInstance = renderInstance;
        this.worldInstance = worldInstance;
        this.viewInstance = viewInstance;
        window.references.gc = this;
    }

    start() {
        setInterval(this.update, this.fps);
    }

    update() {
        window.references.gc.render();
    }

    render() {
        if (!this.renderInstance) console.log('GC | No instance of the Render class has been found!');
        this.renderInstance.clear();
        this.renderInstance.worldRender(this.worldInstance.map, this.worldInstance.wTileCount, this.worldInstance.hTileCount, this.viewInstance.x, this.viewInstance.y, this.worldInstance.tileDimension);
    }


}