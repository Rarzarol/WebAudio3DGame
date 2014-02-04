//World init

var world = new World(1000);

world.createLocalPlayer(1,0,1);

var reverb = new Reverb('/sounds/rev_saintsilvain.wav',masterGain,0.1);

//world.createAudioNode(50,0,100,1,0,1,'/sounds/test.ogg');
//world.createAudioNode(-50,0,100,1,0,1,'/sounds/test.ogg');
//world.createAudioNode(50,0,400,1,0,1,'/sounds/test.ogg');

world.createAudioNode(65,-5,0,1,0,1,'/new_sounds/fire1.ogg');
//Trees 1 and 2 (left side)
world.createAudioNode(70,0,400,1,0,1,'/new_sounds/tree1.ogg');
world.createAudioNode(45,0,290,1,0,1,'/new_sounds/tree2.ogg');
//Trees 3 and 4 (right side)
world.createAudioNode(255,0,200,1,0,1,'/sounds/birds1.ogg');
world.createAudioNode(235,0,455,1,0,1,'/sounds/birds2.ogg');

var movingNode = new AudioNode(-200,-400,100,1,0,1,'/sounds/test2.ogg');
world.audioNodes.push(movingNode);
world.createMover(movingNode,100,0.3,true);

//Test Boden

callbackTest = function(){
    world.movers[0].start();
}

woodSound = function(){
    world.localPlayer.playerSound.collideWood();
}

//First Draft lvl
world.createRectangle(-10,-10,20,20,false);
//Top Left first Cage
//Go Right
world.createRectangle(-130,-100,330,30,true);
world.createRectangle(-100,-70,70,30,true);
world.createRectangle(170,-70,30,170,true);
//In My Way
world.createRectangle(-130,-70,30,200,true);
//Go Left
world.createRectangle(-130,130,250,30,true);
world.createRectangle(-100,100,100,30,true);

//Fire
world.createRectangle(50,-15,30,30,true,woodSound);
//Allee-Entry-Walkover-Oneshot
world.createRectangle(120,130,80,30, false,function(){
    world.localPlayer.changeGroundType(GroundTypes.GRASS);
});
//Allee
world.createRectangle(200,-100,30,610,true);
world.createRectangle(90,160,30,350,true);
//Walls of Town
world.createRectangle(-130,510,250,30,true);
world.createRectangle(200,510,250,30,true);
world.createRectangle(-130,540,30,530,true);
world.createRectangle(420,540,30,530,true);
//Tavern
world.createRectangle(-70,570,180,180,true);

//Debug init
MyCanvas.initNodes();

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
    world.animateMovers();

    //Debug
    world.drawState();

}

window.setInterval(gameLoop,1000/60);
