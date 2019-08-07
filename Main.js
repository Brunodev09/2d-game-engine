let c, cx;
let gc, world, render, land;

window.onload = function () {

    c = document.getElementById('Game');
    cx = c.getContext('2d');

    render = new Render(c, cx);

    world = new World(c.width, c.height, render);
    land = new Landscape(20, 20, 1, 1);
    
    gc = new GameController(world, render);
    gc.start();

};


