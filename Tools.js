
class Tools {
    rand(num, sum) {
        if (!sum) sum = 0;
        return Math.floor((Math.random() * num) + sum);
    }

     floor(num) {
        return Math.floor(num);
    }

     array(size) {
        return new Array(size);
    }
}

window.tools = new Tools();
