//World init

var world = new World(1000);

world.createLocalPlayer(1,0,1);

var reverb = new Reverb('/sounds/rev_saintsilvain.wav',masterGain,0.1);

var audio1 = new AudioNode(50,0,100,1,0,1);
world.addAudioNode(audio1);
audio1.startAsSample('/sounds/test.ogg');

//Test Boden
world.createRectangle(10,0,50,50);

/*var audio2 = new AudioNode(22,0,3,1,0,1);
world.addAudioNode(audio2);
audio2.startAsSample('/sounds/test2.ogg');


var audio3 = new AudioNode(-200,0,-170,-1,0,-1);
world.addAudioNode(audio3);
audio3.startAsSample('/sounds/waterfall2.ogg');

var audio4 = new AudioNode(200,0,-170,1,0,-1);
world.addAudioNode(audio4);
audio4.startAsSample('/sounds/birds1.ogg');

var audio5 = new AudioNode(-200,0,170,-1,0,1);
world.addAudioNode(audio5);
audio5.startAsSample('/sounds/birds2.ogg');

var audio6 = new AudioNode(200,0,170,1,0,1);
world.addAudioNode(audio6);
audio6.startAsSample('/sounds/birds3.ogg');*/


//Debug init

MyCanvas.refreshNodes();

//Create Input Object

var input = new Input();

//Start Loop

function gameLoop(){
    //Check for input
    if(input.wDown){
        console.log("w pressed");
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
