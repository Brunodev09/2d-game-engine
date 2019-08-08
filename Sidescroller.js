class Sidescroller {

    constructor(space, tileSizeX, tileSizeY) {
        this.data = space;
        this.tileSizeX = tileSizeX;
        this.tileSizeY = tileSizeY;

        this.topWorld = arr(this.data.width);
        
        this.slopes();
        this.flatWorld();
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
    }

    flatWorld() {
        for (let i = 0; i < this.data.width; i++) {
            for (let j = 0; j < this.data.height; j++) {
                if (j === this.topWorld[i]) {
                    this.data.setBlock(new Point(i, j), 'grass');
                } else if (j === this.topWorld[i] + 1) {
                    this.data.setBlock(new Point(i, j), 'dirt');
                } else if (j >= this.topWorld[i] + 2) {
                    this.data.setBlock(new Point(i, j), 'stone');
                }
            }
        }
    }

    caves() {

        for (let i = 0; i < this.data.width; i++) {
            for (let j = 0; j < this.data.height; j++) {

                if (j > this.topWorld[i] + 5) {

                    let rand = r(10, 1);
                    if (rand < 8) {
                        this.data.setBlock(new Point(i, j), 'void');
                    }

                }
            }
        }
    }


    rooms() {
        for (let i = 0; i < this.data.width; i++) {
            for (let j = 0; j < this.data.height; j++) {
                if (j > this.topWorld[i] + 8) {
                    if ((this.data.getBlock(new Point(i, j))) === "stone" || this.data.getBlock(new Point(i, j)) === "void") {
                        this.room(i, j);
                    }
                }
            }
        }
    }

    room(vecX, vecY) {

        let arr = [        
            this.data.getBlock(new Point(vecX, vecY)),
            this.data.getBlock(new Point(vecX + 1, vecY)),
            this.data.getBlock(new Point(vecX - 1, vecY)),
            this.data.getBlock(new Point(vecX - 1, vecY - 1)),
            this.data.getBlock(new Point(vecX, vecY - 1)),
            this.data.getBlock(new Point(vecX, vecY + 1)),
            this.data.getBlock(new Point(vecX + 1, vecY - 1)),
            this.data.getBlock(new Point(vecX + 1, vecY + 1))
        ];

        if(arr.find(block => block === "undefined") === "undefined") return;
       
        if ((r(10, 1) !== 3)) {
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

    forests() {
        for (let i = 0; i < this.data.width; i++) {
            for (let j = 0; j < this.data.height; j++) {

            }
        }
    }

}