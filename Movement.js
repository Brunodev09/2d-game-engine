class Movement {

    static get FORWARD() {return 1;}
    static get BACKWARD() {return -1;}

    constructor(speed, direction) {
        this.speed = speed;
        this.direction = direction;
    }
}