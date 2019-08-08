class Space {
    constructor(sizeX, sizeY) {
        this.matrix = [];
        for (let i = 0; i < sizeX; i++) this.matrix[i] = arr(sizeY);
    }

    merge(other, offset) {
        for (let iOther = 0, i = offset.x; iOther < other.matrix.length && i < this.matrix.length; iOther++, i++)
            for (let jOther = 0, j = offset.y; jOther < other.matrix[0].length && j < this.matrix[0].length; jOther++, j++) {
                this.matrix[i][j] = other.matrix[iOther][jOther];
            }
    }

    setBlock(point, type) {
        this.matrix[point.x][point.y] = type;
    }

    getBlock(point) {
        if (!this.matrix[point.x] || !this.matrix[point.y] || !this.matrix[point.x][point.y]) return "undefined";
        return this.matrix[point.x][point.y];
    }

    get width() {
        return this.matrix.length;
    }

    get height() {
        return this.matrix[0].length;
    }

}