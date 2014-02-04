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
world.createRectangle(-130,-100,330,30,false,function(){
    GameCanvas.displayMessage("Hahaha Ich bin ein munterer Herr");
});
world.createRectangle(-100,-70,70,30,false,function(){
    GameCanvas.displayMessage("Und ich auuuuch! hahaha");
});
world.createRectangle(170,-70,30,170,true);
//In My Way
world.createRectangle(-130,-70,30,200,true);
//Go Left
world.createRectangle(-130,130,250,30,true);
world.createRectangle(-100,100,100,30,true);

//Fire
world.createRectangle(50,-15,30,30,true,woodSound);
//Pass to next Allee-Bay
world.createRectangle(120,145,80,15, false,function(){
    world.localPlayer.changeGroundType(GroundTypes.GRASS);
});
//Reverse to last Start-Bay
world.createRectangle(120,130,80,15, false,function(){
    world.localPlayer.changeGroundType(GroundTypes.NORMAL);
});
//Allee
world.createRectangle(200,-100,30,610,true);
world.createRectangle(90,160,30,350,true);
//Pass to next Town-Bay
world.createRectangle(120,525,80,15,false,function(){
    world.localPlayer.changeGroundType(GroundTypes.NORMAL);
});
//Reverse to last Allee-Bay
world.createRectangle(120,510,80,15,false,function(){
    world.localPlayer.changeGroundType(GroundTypes.GRASS);
});
//Upper Walls of Town
world.createRectangle(-130,510,250,30,true);
world.createRectangle(200,510,250,30,true);
world.createRectangle(-130,540,30,550,true);
world.createRectangle(420,540,30,350,true);
//Tavern
world.createRectangle(-70,570,160,140,true);
//Shop
world.createRectangle(220,540,200,150,true);
//MarketPlace
world.createRectangle(30,710,280,150,false);
//Church Part I
world.createRectangle(-50,860,200,200,true);
//Church Part II
world.createRectangle(150,900,140,140,true);
//Well
world.createRectangle(350,960,30,30,true);
//Lower Walls of Town
world.createRectangle(-130,1090,580,30,true);
//Pass to next Farm-Bay
world.createRectangle(435,890,15,200,false,function(){
    world.localPlayer.changeGroundType(GroundTypes.GRASS);
});
//Reverse to last Town-Bay
world.createRectangle(420,890,15,200,false,function(){
    world.localPlayer.changeGroundType(GroundTypes.NORMAL);
});
//Upper Farm Boundarys
world.createRectangle(450,860,330,30,true);
world.createRectangle(750,890,30,350,true);
//Stable
world.createRectangle(600,890,150,200,true);
//ChickenCoop
world.createRectangle(675,1090,75,150,true);
//Lower Farm Boundarys
world.createRectangle(350,1240,430,30,true);
world.createRectangle(350,1120,30,30,true);
//Exit Farm

//Pass to next Wood-Bay
world.createRectangle(350,1150,15,90,false,function(){
    world.localPlayer.changeGroundType(GroundTypes.GRASS);
});
//Reverse to last Farm-Bay
world.createRectangle(365,1150,15,90,false,function(){
    world.localPlayer.changeGroundType(GroundTypes.NORMAL);
});

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

    //
    GameCanvas.draw();

}

window.setInterval(gameLoop,1000/60);
