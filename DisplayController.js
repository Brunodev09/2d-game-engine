class DisplayController {

    constructor() {
        this.instance;
    }

    appendLand(engine, width, height, tileSizeX, tileSizeY) {
        switch (engine) {
            case "sidescroller":
                this.instance = new Sidescroller(new Space(width, height), tileSizeX, tileSizeY);
                break;
            case "topdown":
                throw new Error('DC | Not implemented yet!');
            default:
                this.instance = new Sidescroller(new Space(width, height), tileSizeX, tileSizeY);
                break;
        }
    }

    get Game() {
        return this.instance;
    }


}