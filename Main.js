let c, cx;
let gc, world, renderInstance, land;

window.onload = function () {

    c = document.getElementById('Game');
    cx = c.getContext('2d');

    renderInstance = render(c, cx);
    world = alocateWorldSpace(c.width, c.height, 20, 20, renderInstance);
    mergeInWorld = setWorld(100, 100, 1, 1, "sidescroller");
    world.apply(mergeInWorld.data, new Point(0, 0));
    controller(renderInstance, world);
};

function render(context, context2D) {
    return new Render(context, context2D);
}

function alocateWorldSpace(worldWidth, worldHeight, tileSizeX, tileSizeY, render) {
    return new World(worldWidth, worldHeight, tileSizeX, tileSizeY, render);
}

function setWorld(width, height, tileSizeX, tileSizeY, engine) {
    let display = new DisplayController();
    display.appendLand(engine, width, height, tileSizeX, tileSizeY);
    return display.Game;
}

function controller(render, world) {
    gc = new GameController(render, world);
    gc.start();
}