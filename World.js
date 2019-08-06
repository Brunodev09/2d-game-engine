let r = window.tools.rand;
let f = window.tools.floor;
let arr = window.tools.array;

class World {

    constructor(width, height, render) {
        this.width = width;
        this.height = height;
        this.renderInstance = render;

        this.tileW = 20;
        this.tileH = 20;

        // Tile sizes
        this.tilesX = f(this.width / this.tileW);
        this.tilesY = f(this.height / this.tileH);

        this.map = [];

        // How many times bigger than the screen
        this.worldOffset = {
            x: 1,
            y: 1
        }

        this.worldSize = {
            sizeX: this.tilesX * this.worldOffset.x,
            sizeY: this.tilesY * this.worldOffset.y
        }

        // How many positions will be sorted to be the top of the world --> Must have width size
        this.topWorld = arr(this.worldSize.sizeX);
    }

    fillMatrixes() {
        for (let i = 0; i < this.worldSize.sizeX; i++) {
            this.map[i] = arr(this.worldSize.sizeY);
        }
    }

    generator() {
        // Initial generation
        this.slopes();
        this.caves();

        // Second iteration of spawns
        this.rooms();
    }

    slopes() {

        let minPos = 9;
        let maxPos = 7;
        // Dirt and top of the world - Time of iteractions must be defined by the width
        // Since I'm selecting the top n times, I need it to fill at least the whole width
        for (let x = 0; x < this.worldSize.sizeX; x++) {
            let pos = r(this.tilesY);
            // Position cannot be zero (No dirt in the sky plz)
            if (!pos) pos = r(this.tilesY);
            if (pos >= maxPos) pos = maxPos - r(6, 1);
            if (pos <= minPos) pos = minPos + r(4, 1);
            this.topWorld[x] = pos;
        }
        for (let i = 0; i < this.worldSize.sizeX; i++) {
            for (let j = 0; j < this.worldSize.sizeY; j++) {
                if (j > this.topWorld[i] + 1) this.map[i][j] = "stone";
            }
        }
    }

    caves() {

        for (let i = 0; i < this.worldSize.sizeX; i++) {
            for (let j = 0; j < this.worldSize.sizeY; j++) {

                if (j > this.topWorld[i] + 5) {

                    this.map[i][j] = r(10, 1);
                    if (this.map[i][j] <= 5) this.map[i][j] = null;
                    
                } 
            }
        }
    }

    rooms() {
        for (let i = 0; i < this.worldSize.sizeX; i++) {
            for (let j = 0; j < this.worldSize.sizeY; j++) {
                if (j > this.topWorld[i] + 5) {
                    if (!isNaN(this.map[i][j])) this.room(i, j);
                }
            }
        }
    }
                

    room(vecX, vecY) {
        if (!this.map[vecX] || (!this.map[vecX + 1]) || (!this.map[vecX - 1])) return;
        if (!this.map[vecY] || (!this.map[vecY + 1]) || (!this.map[vecY - 1])) return;
        if (!(r(10, 1) === 3)) {
            this.map[vecX][vecY] = "stone";
            return;
        }
        this.map[vecX][vecY] = "room";
        this.map[vecX + 1][vecY] = "room";
        this.map[vecX - 1][vecY - 1] = "room";
        this.map[vecX][vecY - 1] = "room";
        this.map[vecX][vecY + 1] = "room";
        this.map[vecX - 1][vecY - 1] = "room";
        this.map[vecX + 1][vecY - 1] = "room";
        this.map[vecX + 1][vecY + 1] = "room";

    }

    worldRender() {
        for (let i = 0; i < (this.worldSize.sizeX); i++) {
            for (let j = 0; j < (this.worldSize.sizeY); j++) {

                if (j === this.topWorld[i]) World.addTexture("grass", i * (this.tileW + 1), j * (this.tileH + 1), this.tileW, this.tileH);

                if (j === (this.topWorld[i] + 1)) World.addTexture("dirt", i * (this.tileW + 1), j * (this.tileH + 1), this.tileW, this.tileH);

                // Stone rendering after 5 blocks from stone (+5 couting in height)
                if (j > (this.topWorld[i])) {
                    if (this.map[i][j] === "stone") World.addTexture("stone", i * (this.tileW + 1), j * (this.tileH + 1), this.tileW, this.tileH);
                    // else if (this.map[i][j] === "room") World.addTexture("room", i * (this.tileW + 1), j * (this.tileH + 1), this.tileW, this.tileH);
                }
            }
        }
    }

    static addTexture(tex, x, y, w, h) {
        switch (tex) {
            case "dirt":
                render.rect(x, y, w, h, "#654321");
                break;
            case "stone":
                render.rect(x, y, w, h, "grey");
                break;
            case "room":
                render.rect(x, y, w, h, "yellow");
                break;
            case "grass":
                render.rect(x, y, w, h, "green");
                break;    
            default:
                render.rect(x, y, w, h, "purple");
                break;
        }
    }
}