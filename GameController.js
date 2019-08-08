let _this;
window.references = {};
window.references.gc = {};

class GameController {
    constructor(renderInstance, worldInstance) {
        this.fps = 100;
        this.renderInstance = renderInstance;
        this.worldInstance = worldInstance;
        window.references.gc = this;
    }

    start() {
        setInterval(this.update, this.fps);
    }

    update() {
        window.references.gc.render();
        window.references.gc.keyboardController();
    }

    render() {
        if (!this.renderInstance) console.log('GC | No instance of the Render class has been found!');
        this.renderInstance.clear();
        this.renderInstance.worldRender(this.worldInstance.map, this.worldInstance.wTileCount, this.worldInstance.hTileCount, 0, 0, this.worldInstance.tileDimension);
    }

    keyboardController() {
        document.addEventListener('keydown', (event) => {

        });

        document.addEventListener('keyup', (event) => {

        });
    }

}