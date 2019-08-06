let c, cx;
let gc, world, render;

window.onload = function () {

    c = document.getElementById('Game');
    cx = c.getContext('2d');

    render = new Render(c, cx);

    world = new World(c.width, c.height, render);
    world.fillMatrixes();
    world.generator();
    
    gc = new GameController(world, render);
    gc.start();

};


