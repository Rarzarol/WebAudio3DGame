//World init

var world = new World(1000);

world.createLocalPlayer(1,0,1);

var reverb = new Reverb('/sounds/rev_saintsilvain.wav',masterGain,0.1);

world.createAudioNode(50,0,100,1,0,1,'/sounds/test.ogg');

//Test Boden
world.createRectangle(10,0,50,50);
world.createRectangle(-120,30,11,70);
world.createRectangle(-290,0,111,320);

//Debug init

MyCanvas.refreshNodes();

//Create Input Object

var input = new Input();

//Start Loop

function gameLoop(){
    //Check for input
    if(input.wDown){
        world.localPlayer.moveInDirection(1);
    }
    if(input.sDown){
        world.localPlayer.moveInDirection(-1);
    }
    if(input.aDown){
        world.localPlayer.rotate(2);
    }
    if(input.dDown){
        world.localPlayer.rotate(-2);
    }

    //Mouse Movement
    var deltas = input.getMouseDeltas();

    world.localPlayer.rotate(deltas[0]*-1);
    world.localPlayer.rotate(deltas[1]*-1);

    //Check for collision
    //for each collidable object check for collision.

    //"Animate" walking nodes
    //for each animated node animate.

    //Debug
    world.drawState();

}

window.setInterval(gameLoop,1000/60);
