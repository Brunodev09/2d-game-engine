let r = window.tools.rand;
let f = window.tools.floor;
let arr = window.tools.array;

class Dimension {

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

}

class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Scale {

    constructor(w = 1, h = 1) {
        this.w = w;
        this.h = h;
    }

    apply(dimension, h) {
        if(typeof dimension === "object") return new Dimension(dimension.width * this.w, dimension.height * this.h);
    
        return new Dimension(dimension * this.w, h * this.h);
    }

}

class Space {
    constructor(sizeX, sizeY) {
        this.matrix = [];
        for(let i = 0; i < sizeX; i++) this.matrix[i] = arr(sizeY);
    }

    merge(other, offset) {
        for (
            let iOther = 0, i = offset.x; 
            iOther < other.matrix.length && i < this.matrix.length; 
            iOther++, i++
        ) for (
            let jOther = 0, j = offset.y; 
            jOther < other.matrix[0].length && j < this.matrix[0].length; 
            jOther++, j++
        ) {
            this.matrix[i][j] = other.matrix[iOther][jOther];
        }
    }

    setBlock(point, type) {
        this.matrix[point.x][point.y] = type;
    }

    getBlock(point) {
        return this.matrix[point.x][point.y];
    }

    get width() {
        return this.matrix.length;
    }

    get height() {
        return this.matrix[0].length;
    }



}

class Landscape {

    constructor(width, height, tileSizeX, tileSizeY) {
        
        this.width = width;
        this.height = height;
        this.tileSizeX = tileSizeX;
        this.tileSizeY = tileSizeY;
        this.data = new Space(width, height);

        this.topWorld = arr(width);

        // Initial generation
        this.slopes();
        // Second iteration of spawns
        this.caves();
        this.rooms();
    }

    slopes() {

        let minPos = 9;
        let maxPos = 7;
        // Dirt and top of the world - Time of iteractions must be defined by the width
        // Since I'm selecting the top n times, I need it to fill at least the whole width
        for (let x = 0; x < this.data.width; x++) {
            let pos = r(this.tileSizeY);
            // Position cannot be zero (No dirt in the sky plz)
            if (!pos) pos = r(this.tileSizeY);
            if (pos >= maxPos) pos = maxPos - r(6, 1);
            if (pos <= minPos) pos = minPos + r(4, 1);
            this.topWorld[x] = pos;
        }

        this.flatWorld();
        this.caves();
        this.rooms();
    }

    flatWorld() {
        for (let i = 0; i < this.data.width; i++) {
            console.log(i);
            for (let j = 0; j < this.data.height; j++) {
                if (j < this.topWorld[i]) continue;
                if (j === this.topWorld[i]) this.data.setBlock(new Point(i, j), 'grass');
                else if (j > this.topWorld[i] + 1) this.data.setBlock(new Point(i, j), 'dirt');
                else if (j > this.topWorld[i] + 2) this.data.setBlock(new Point(i, j), 'stone');
            }
        }
    }

    caves() {

        for (let i = 0; i < this.data.width; i++) {
            for (let j = 0; j < this.data.height; j++) {

                if (j > this.topWorld[i] + 5) {

                    let rand = r(10, 1);
                    if (rand <= 5) continue;

                }
            }
        }
    }


    rooms() {
        for (let i = 0; i < this.data.matrix.length; i++) {
            for (let j = 0; j < this.data.matrix[0].length; j++) {
                if (j > this.topWorld[i] + 5) {
                    if (!isNaN(this.data.getBlock(new Point(i, j)))) {
                        this.room(i, j);
                    }
                }
            }
        }
    }

    room(vecX, vecY) {
        if (!this.data.getBlock(vecX, 0) || (!this.data.getBlock(vecX + 1, 0)) || (!this.data.getBlock(vecX - 1, 0))) return;
        if (!this.data.getBlock(0, vecY) || (!this.data.getBlock(0, vecY + 1)) || (!this.data.getBlock(0, vecY - 1))) return;
        if (!(r(10, 1) === 3)) {
            this.data.setBlock(new Point(vecX, vecY), 'stone');
            return;
        }
        this.data.setBlock(new Point(vecX, vecY), 'room');
        this.data.setBlock(new Point(vecX + 1, vecY), 'room');
        this.data.setBlock(new Point(vecX - 1, vecY), 'room');
        this.data.setBlock(new Point(vecX - 1, vecY - 1), 'room');
        this.data.setBlock(new Point(vecX, vecY - 1), 'room');
        this.data.setBlock(new Point(vecX, vecY + 1), 'room');
        this.data.setBlock(new Point(vecX + 1, vecY - 1), 'room');
        this.data.setBlock(new Point(vecX + 1, vecY + 1), 'room');
    }

}

class World {

    static get DEFAULT_SCALE() {return new Scale();}

    constructor(width, height, scaleW, scaleY) {
        // this.view = new View();
        this.dimension = World.DEFAULT_SCALE.apply(width, height);
        this.tileDimension = new Dimension(20, 20);

        this.map = new Space(width, height);

    }

    get wTileCount() {
        return f(this.dimension.width / this.tileDimension.width);
    }

    get hTileCount() {
        return f(this.dimension.height / this.tileDimension.height);
    } 

    worldRender() {
        // Rate of movement is obviously increasing because this.right/left is always increasing
        for (let i = 0; i <= (this.worldSize.sizeX); i++) {
            for (let j = 0; j <= (this.worldSize.sizeY); j++) {
                
                if (this.leftFlag) {
                    // this.move = f(i - this.left/100);
                    this.xPos += f(this.movementSpeed);
                }
                else if (this.rightFlag) {
                    // this.move = f(i + this.right/100);
                    this.xPos -= -f(this.movementSpeed);
                }

                if (j === this.topWorld[i]) this.addTexture(i, j, "grass");

                if (j === (this.topWorld[i] + 1)) this.addTexture(i, j, "dirt");
                
                // Stone rendering after 5 blocks from stone (+5 couting in height)
                if (j > (this.topWorld[i])) {
                    if (this.map[i][j] === "stone") this.addTexture(i, j, "stone");
                    // else if (this.map[i][j] === "room") World.addTexture("room", i * (this.tileW + 1), j * (this.tileH + 1), this.tileW, this.tileH);
                }
            }
        }
    }

    addTexture(xp, yp, tex) {

        let xPos = (this.xPos || 0) + (xp * this.tileW);
        let yPos = (this.yPos || 0) + (yp * this.tileH);

        switch (tex) {
            case "dirt":
                render.rect(xPos, yPos, this.tileW, this.tileH, "#654321");
                break;
            case "stone":
                render.rect(xPos, yPos, this.tileW, this.tileH, "grey");
                break;
            case "room":
                render.rect(xPos, yPos, this.tileW, this.tileH, "yellow");
                break;
            case "grass":
                render.rect(xPos, yPos, this.tileW, this.tileH, "green");
                break;
            default:
                render.rect(xPos, yPos, this.tileW, this.tileH, "purple");
                break;
        }
    }

    apply(space, point) {
        this.space.merge(space, point);
    }
}


