//World init

var world = new World(1000);

world.createLocalPlayer(1,0,1);

var reverb = new Reverb('/sounds/rev_saintsilvain.wav',masterGain,0.1);

//The Sounds

//Pseude Atmo first Room
//Generates Crash @ Wolf
//world.createAudioNode(65,-5,0,1,0,1,'/new_sounds/mainatmo1.ogg');
//Fire
world.createAudioNode(65,-5,0,1,0,1,'/new_sounds/fire1.ogg');
//Crickets
world.createAudioNode(-120,0,-90,1,0,1,'/cricket_sounds/cricket1.ogg');
world.createAudioNode(200,0,-90,1,0,1,'/cricket_sounds/cricket2.ogg');
world.createAudioNode(0,0,130,1,0,1,'/cricket_sounds/cricket3.ogg');


//Trees 1 and 2 (left side)
world.createAudioNode(70,0,400,1,0,1,'/new_sounds/tree1.ogg');
world.createAudioNode(45,0,290,1,0,1,'/new_sounds/tree2.ogg');
//Trees 3 and 4 (right side)
world.createAudioNode(255,0,200,1,0,1,'/sounds/birds1.ogg');
world.createAudioNode(235,0,455,1,0,1,'/sounds/birds2.ogg');



//var movingNode = new AudioNode(-200,-400,100,1,0,1,'/sounds/test2.ogg');
//world.audioNodes.push(movingNode);
//world.createMover(movingNode,100,0.3,true);

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
world.createRectangle(-130,-100,330,30,true,function(){
    GameCanvas.displayMessage("Das Gestrüpp ist hier zu dicht, ich komme nicht durch.$Vielleicht versuche ich es weiter rechts...");
});
world.createRectangle(-100,-70,70,30,true,function(){
    GameCanvas.displayMessage("Das Gestrüpp ist hier zu dicht, ich komme nicht durch.$Vielleicht versuche ich es weiter rechts...");
});
world.createRectangle(185,-70,15,200,true,function(){
    GameCanvas.displayMessage("Das Gestrüpp ist hier zu dicht, ich komme nicht durch.$Vielleicht versuche ich es weiter rechts...");
});
//In My Way
world.createRectangle(-130,-70,30,200,true,function(){
    GameCanvas.displayMessage("Ich kann hier nicht weiter. Etwas stacheliges versperrt mit den Weg.$Ich sollte es wo anders versuchen...");
});
//Go Left
world.createRectangle(-130,130,250,30,true,function(){
    GameCanvas.displayMessage("Ich kann nicht durch diese dichten Sträucher.$Aber nach links ist der Boden etwas abschüssig...");
});
world.createRectangle(-100,100,100,30,true,function(){
    GameCanvas.displayMessage("Ich kann nicht durch diese dichten Sträucher.$Aber nach links  ist der Boden etwas abschüssig...");
});

//Fire
//hier war WoodSound
world.createRectangle(50,-15,30,30,true,function(){
    GameCanvas.displayMessage("Was ist das? Hier brennt etwas. Ich spüre die Hitze$und höre das Feuer. Ich kann nicht näher ran gehen...")
});
//Pass to next Allee-Bay
world.createRectangle(120,145,80,15, false,function(){
    world.localPlayer.changeGroundType(GroundTypes.GRASS);
	GameCanvas.displayMessage("Der Boden ist hier anders...");
});
//Reverse to last Start-Bay
world.createRectangle(120,130,80,15, false,function(){
    world.localPlayer.changeGroundType(GroundTypes.NORMAL);
});
//Allee
world.createRectangle(200,-100,30,610,true,function(){
	GameCanvas.displayMessage("Bäume rauschen links und rechts von mir...$Eine Allee?");
});
world.createRectangle(90,160,30,350,true,function(){
	GameCanvas.displayMessage("Bäume rauschen auf beiden Seiten...$Ist das eine Allee?");
});
//Pass to next Town-Bay
world.createRectangle(120,525,80,15,false,function(){
    world.localPlayer.changeGroundType(GroundTypes.NORMAL);
	GameCanvas.displayMessage("Der Boden ist wieder anders.$Ich höre einen Kirchturm...");
});
//Reverse to last Allee-Bay
world.createRectangle(120,510,80,15,false,function(){
    world.localPlayer.changeGroundType(GroundTypes.GRASS);
});
//Upper Walls of Town
world.createRectangle(-130,510,250,30,true,function(){
	GameCanvas.displayMessage("Eine kalte Steinmauer...");
});
world.createRectangle(200,510,250,30,true,function(){
	GameCanvas.displayMessage("Eine steinige, kalte Mauer...");
});
world.createRectangle(-130,540,30,550,true,function(){
	GameCanvas.displayMessage("Eine kalte Mauer aus Stein...$Hier führt kein Weg entlang.");
});
world.createRectangle(420,540,30,350,true,function(){
	GameCanvas.displayMessage("Eine kalte Steinmauer...$Ich muss einen anderen Weg finden.");
});
//Tavern
world.createRectangle(-70,570,160,140,true,function(){
	GameCanvas.displayMessage("Dieses Haus stinkt nach Bier...$Die Fenster sind...vernagelt...");
});
//Shop
world.createRectangle(220,540,200,150,true,function(){
	GameCanvas.displayMessage("Hier ist ein Gebäude.$Es hat große Fensterscheiben, vielleicht Schaufenster?");
});
//MarketPlace
world.createRectangle(30,710,280,150,false,function(){
	GameCanvas.displayMessage("Der Boden ist hier gepflastert und es liegen Sachen herum.$ Die Kirchturm-Glocke ist lauter...");
});
//Church Part I
world.createRectangle(-50,860,200,200,true,function(){
	GameCanvas.displayMessage("Kalte Mauern, verziert mit Ornamenten.$Die Kirche...");
});
//Church Part II
world.createRectangle(150,900,140,140,true,function(){
	GameCanvas.displayMessage("Hier muss der Kirchturm sein.$Vielleicht finde ich hier noch etwas anderes...");
});
//Well
world.createRectangle(350,960,30,30,true,function(){
	GameCanvas.displayMessage("Steinig, rund, ich höre Wasser...");
});
//Lower Walls of Town
world.createRectangle(-130,1090,580,30,true,function(){
GameCanvas.displayMessage("Noch eine Steinmauer.$Ich höre die Kirchturm Glocke hier lauter.");
});
//Pass to next Farm-Bay
world.createRectangle(435,890,15,200,false,function(){
    world.localPlayer.changeGroundType(GroundTypes.GRASS);
GameCanvas.displayMessage("Der Boden hat sich wieder verändert...$Es ist auch ein anderer Geruch in der Luft.");
});
//Reverse to last Town-Bay
world.createRectangle(420,890,15,200,false,function(){
    world.localPlayer.changeGroundType(GroundTypes.NORMAL);
});
//Upper Farm Boundarys
world.createRectangle(450,860,330,30,true,function(){
GameCanvas.displayMessage("Ein verstärkter Zaun. Mit diesem Boden zusammen$könnten hier Tiere gehalten werden. Wo bin ich hier...");
});

world.createRectangle(750,890,30,350,true,function(){
GameCanvas.displayMessage("Ein starker Zaun.$Da kommt nicht mal ein Stier durch...");
});
//Stable
world.createRectangle(600,890,150,200,true,function(){
GameCanvas.displayMessage("Klingt, und riecht wie ein Stall...$Die Tiere sind unruhig...");
});
//ChickenCoop
world.createRectangle(675,1090,75,150,true,function(){
GameCanvas.displayMessage("Engmaschiger Zaun... Ein Hühnerstall.$Aber ich höre keine Hühner...?!$Hüüüüüüühner, Putt, Putt, Putt!");
});
//Lower Farm Boundarys
world.createRectangle(350,1240,430,30,true,function(){
GameCanvas.displayMessage("Wieder Steinmauern, diesmal aber noch kälter.$Was rauscht denn hier so seltsam...");
});
world.createRectangle(350,1120,30,30,true,function(){
GameCanvas.displayMessage("Mehr Steinmauern, diesmal aber noch kälter.$Ich höre etwas rauschen...");
});
//Exit Farm

//Pass to next Wood-Bay
world.createRectangle(350,1150,15,90,false,function(){
    world.localPlayer.changeGroundType(GroundTypes.GRASS);
GameCanvas.displayMessage("Ich fühle festen Waldboden unter meinen Füßen.$Hier scheint ein Weg zu beginnen,$ aber ich verlasse wohl das Dorf...");
});
//Reverse to last Farm-Bay
world.createRectangle(365,1150,15,90,false,function(){
    world.localPlayer.changeGroundType(GroundTypes.NORMAL);
	GameCanvas.displayMessage("Das Dorf scheint verlassen zu sein, aber warum $höre ich dann immernoch die Kirchturm-Glocke?!");
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
