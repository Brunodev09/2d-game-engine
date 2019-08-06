
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
        this.slopes();
        this.caves();
    }

    slopes() {

        let slopeX = 9;
        let slopeY = 7;
        // Dirt and top of the world
        for (let x = 0; x < this.worldSize.sizeY; x++) {
            let pos = r(this.tilesY);
            // Position cannot be zero (No dirt in the sky plz)
            if (!pos) pos = r(this.tilesY);
            if (pos >= 9) pos = slopeX - r(6, 1);
            if (pos <= 7) pos = slopeY + r(4, 1);
            this.topWorld[x] = pos;
        }
    }

    caves() {
        
        for (let i = 0; i < this.worldSize.sizeX; i++) {
            for (let j = 0; j < this.worldSize.sizeY; j++) {
            
                if (j > this.topWorld[i] + 5) {
                    
                    this.map[i][j] = r(10, 1);
                    this.room();

                    if (this.map[i][j] <= 5) this.map[i][j] = "stone";
                    else this.map[i][j] = "void";
                }
                else this.map[i][j] = "stone";
            }
        }
    }

    room() {
         
    }

    worldRender() {
        for (let i = 0; i < (this.worldSize.sizeX); i++) {
            for (let j = 0; j < (this.worldSize.sizeY); j++) {

                // if (j >= 0 && j <= (tilesY / 2)) drawRect(i * (tileW + 1), j * (tileH + 1), tileW, tileH, 'white');
                // else if (j > ((tilesY / 2) + 1) && map[i][j] >= 6) drawRect(i * (tileW + 1), j * (tileH + 1), tileW, tileH, 'black');
                // else drawRect(i * (tileW + 1), j * (tileH + 1), tileW, tileH, 'grey');

                if (j === this.topWorld[i]) {
                    render.rect(i * (this.tileW + 1), j * (this.tileH + 1), this.tileW, this.tileH, '#654321');
                }
                // Stone rendering after 5 blocks from stone (+5 couting in height)
                if (j > (this.topWorld[i])) {
                    if (this.map[i][j] === "stone") render.rect(i * (this.tileW + 1), j * (this.tileH + 1), this.tileW, this.tileH, 'grey');
                }
            }
        }
    }
}