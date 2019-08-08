let c, cx;
let gc, world, renderInstance, land;

window.onload = function () {

    c = document.getElementById('Game');
    cx = c.getContext('2d');

    renderInstance = render(c, cx);
    world = alocateWorldSpace(c.width, c.height, 20, 20, renderInstance);
    land = setWorld(30, 30, 1, 1);
    world.apply(land.data, new Point(15, 0));
    controller(world, renderInstance);
};

function render(context, context2D) {
    return new Render(context, context2D);
}

function alocateWorldSpace(worldWidth, worldHeight, tileSizeX, tileSizeY, render) {
    return new World(worldWidth, worldHeight, tileSizeX, tileSizeY, render);
}

function setWorld(width, height, tileSizeX, tileSizeY) {
    return new Landscape(width, height, tileSizeX, tileSizeY);
}

function controller(world, render) {
    gc = new GameController(world, render);
    gc.start();
}