
class View {

    constructor(x = 0, y = 0, radiusInTiles = 5, tileSize = 20) {
        this.x = x;
        this.y = y;
        this.speedX = 1;
        this.speedY = 1;
        this.radiusInTiles = 5;
        this.tileSize = tileSize;
        this.camera();
    }

    camera() {
        document.addEventListener('keyup', (event) => {
            if (event.keyCode === 37) {
                this.x += this.speedX * this.tileSize;
            }
            else if (event.keyCode === 39) {
                this.x -=  this.speedX * this.tileSize;
            }
            else if (event.keyCode === 40) {
                this.y -= this.speedY * this.tileSize;
            }
            else if (event.keyCode === 38) {
                this.y +=  this.speedY * this.tileSize;
            }

        });
    }

}