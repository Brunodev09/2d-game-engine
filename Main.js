let c, cx;
let gc, world, renderInstance, land;

/*
    -Things to remember-
While the world space is measured in pixels when we first alocate it (eg c.width and c.height),
and then the positions are converted to tiles when we render it. 
And the subspaces that we merge in the world are always measured in tiles (eg width/tileSize). 

*/

window.onload = function () {

    c = document.getElementById('Game');
    cx = c.getContext('2d');

    renderInstance = render(c, cx);
    world = allocateSpace(c.width, c.height, 20, 20, renderInstance);
    allocateSpace = setWorld(100, 100, 1, 1, "sidescroller");
    world.apply(allocateSpace.data, new Point(0, 0));
    controller(renderInstance, world, new View(0, 0, 5));
};

function render(context, context2D) {
    return new Render(context, context2D);
}

function allocateSpace(worldWidth, worldHeight, tileSizeX, tileSizeY, render) {
    return new World(worldWidth, worldHeight, tileSizeX, tileSizeY, render);
}

function setWorld(width, height, wTileCount, hTileCount, engine) {
    let display = new DisplayController();
    display.appendLand(engine, width, height, wTileCount, hTileCount);
    return display.Game;
}

function controller(render, world, view) {
    gc = new GameController(render, world, view);
    gc.start();
}