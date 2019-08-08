class Scale {

    constructor(w = 1, h = 1) {
        this.w = w;
        this.h = h;
    }

    applyScale(dimension, h) {
        if (typeof dimension === "object") return new Dimension(dimension.width * this.w, dimension.height * this.h);

        return new Dimension(dimension * this.w, h * this.h);
    }

}