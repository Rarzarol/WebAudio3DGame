var romanMode = true;
//World init

var world = new World(1000);

world.createLocalPlayer(1,5,1);

var reverb = new Reverb('/sounds/rev_saintsilvain.wav',masterGain,0.1);

//Atmo, for change of File, Go To: index.html
document.getElementById('mainatmo').play();

//The Sounds - Blueprint:
//function AudioNode(x,y,z,orx,ory,orz,filename
//innerConeAngle,outerConeAngle,refDistance,maxDistance,rolloff,innerConeGain,outerConeGain,distanceModel) = 8 Params

world.createAudioNode(162,50,221,-0.19080899537654422,0,-0.9816271834476641,"/new_sounds/voice2.wav",12,14.3,3.026,10000,1.825,1,1,"linear",33);

//Fire
world.createAudioNode(65,0,-5,1,0,1,'/new_sounds/fire1.wav',360,360,5,645,5,1,3,"linear",4);
//Crickets
world.createAudioNode(-120,0,-90,1,0,1,"/cricket_sounds/cricket1.ogg",90,120,3,153,1,1,3,"linear",3);
world.createAudioNode(200,0,-90,-1,0,1,'/cricket_sounds/cricket2.ogg',90,120,3,153,1,1,3,"linear",3);
world.createAudioNode(0,0,130,1,0,-1,'/cricket_sounds/cricket3.ogg',90,120,3,153,1,1,3,"linear",3);

//Trees 1,2,3,4 (left side)
world.createAudioNode(70,20,400,1,0,0,'/new_sounds/tree1.wav',140,160,1,450,1,1,3,"linear",8);
world.createAudioNode(45,20,230,1,0,0,'/new_sounds/tree2.wav',140,160,1,450,1,1,3,"linear",8);
world.createAudioNode(50,20,320,1,0,0,'/new_sounds/tree1.wav',140,160,1,450,1,1,3,"linear",8);
world.createAudioNode(65,20,475,1,0,0,'/new_sounds/tree2.wav',140,160,1,450,1,1,3,"linear",8);

//Trees 5,6,7,8 (right side)
world.createAudioNode(230,20,300,-1,0,0,'/new_sounds/tree1.wav',140,160,1,450,1,1,3,"linear",8);
world.createAudioNode(255,20,500,-1,0,0,'/new_sounds/tree2.wav',140,160,1,450,1,1,3,"linear",8);
world.createAudioNode(280,20,210,-1,0,0,'/new_sounds/tree1.wav',140,160,1,450,1,1,3,"linear",8);
world.createAudioNode(295,20,400,-1,0,0,'/new_sounds/tree2.wav',140,160,1,450,1,1,3,"linear",8);

//Birds
//world.createAudioNode(255,0,200,1,0,1,'/sounds/birds1.wav',undefined,undefined,undefined,undefined,undefined,0.5,0.5,undefined);
//world.createAudioNode(235,0,455,1,0,1,'/sounds/birds2.wav',undefined,undefined,undefined,undefined,undefined,0.5,0.5,undefined);

//Churchbell-Test
world.createAudioNode(150,50,955,1,0,1,'/new_sounds/churchbell1.wav',360,360,1,1000,1.661,1,1,"linear",13);

//Well
world.createAudioNode(367,0,975,0.7071067811865475,0,0.7071067811865475,"/new_sounds/well1.wav",360,360,1,10000,1,1,1,"linear",3);

//Horses
world.createAudioNode(670,0,923,0.7071067811865475,0,0.7071067811865475,"/new_sounds/stable1.wav",360,360,1,10000,1,1,1,"linear",13);
world.createAudioNode(674,0,1036,0.7071067811865475,0,0.7071067811865475,"/new_sounds/horse1.wav",360,360,1,10000,1,1,1,"linear",12);

//Chckens
world.createAudioNode(719,0,1198,0.7071067811865475,0,0.7071067811865475,"/new_sounds/chicken1.wav",360,360,1,10000,1,1,1,"linear",6);

//var movingNode = new AudioNode(-200,0,100,1,0,1,'/sounds/test2.wav',undefined,undefined,undefined,undefined,undefined,0.5,0.5,undefined);
//world.audioNodes.push(movingNode);
//world.createMover(movingNode,100,0.3,true);


//Test Boden

callbackTest = function(){
    world.movers[0].start();
}

woodCollide = function(){
    world.localPlayer.playerSound.collideWood();
}
fireCollide = function(){
    world.localPlayer.playerSound.collideFire();
}
stoneCollide = function(){
    world.localPlayer.playerSound.collideStone();
}
fenceCollide = function(){
    world.localPlayer.playerSound.collideFence();
}
bushCollide = function(){
    world.localPlayer.playerSound.collideBush();
}
windowCollide = function(){
    world.localPlayer.playerSound.collideWindow();
}


//First Draft lvl
world.createRectangle(-10,-10,20,20,false,function(){
    GameCanvas.displayMessage("Wo...wo bin ich hier...?$Mein Kopf tut weh...");
});
//Top Left first Cage
//Go Right
world.createRectangle(-130,-100,330,30,true,function(){
    bushCollide();
    GameCanvas.displayMessage("Das Gestrüpp ist hier zu dicht, ich komme nicht durch.$Vielleicht versuche ich es weiter rechts...");
});
world.createRectangle(-100,-70,70,30,true,function(){
    bushCollide();
    GameCanvas.displayMessage("Das Gestrüpp ist sehr dicht, ich kann hier nicht weiter.$Ich versuche es weiter rechts...");
});
world.createRectangle(185,-70,15,200,true,function(){
    bushCollide();
    GameCanvas.displayMessage("Das Gestrüpp ist hier zu dicht, ich komme nicht durch.$Vielleicht versuche ich es weiter rechts...");
});
//In My Way
world.createRectangle(-130,-70,30,200,true,function(){
    bushCollide();
    GameCanvas.displayMessage("Ich kann hier nicht weiter. Etwas stacheliges versperrt mir den Weg.$Ich sollte es wo anders versuchen...");
});
//Go Left
world.createRectangle(-130,130,250,30,true,function(){
    bushCollide();
    GameCanvas.displayMessage("Ich kann hier nicht durch die dichten Sträucher.$Aber links ist der Boden etwas abschüssig...");
});
world.createRectangle(-100,100,100,30,true,function(){
    bushCollide();
    GameCanvas.displayMessage("Ich kann nicht durch diese dichten Sträucher.$Aber nach links  ist der Boden etwas abschüssig...");
});

//Fire
world.createRectangle(50,-15,30,30,true,function(){
    fireCollide();
    GameCanvas.displayMessage("Was ist das? Hier brennt etwas. Ich spüre die Hitze$und höre das Feuer. Ich kann nicht näher ran gehen...");
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
    bushCollide();
    GameCanvas.displayMessage("Bäume rauschen links und rechts von mir...$Eine Allee?");
});
world.createRectangle(90,160,30,350,true,function(){
    bushCollide();
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
    stoneCollide();
    GameCanvas.displayMessage("Eine kalte Steinmauer...");
});
world.createRectangle(200,510,250,30,true,function(){
    stoneCollide();
    GameCanvas.displayMessage("Eine steinige, kalte Mauer...");
});
world.createRectangle(-130,540,30,550,true,function(){
    stoneCollide();
    GameCanvas.displayMessage("Eine kalte Mauer aus Stein...$Hier führt kein Weg entlang.");
});
world.createRectangle(420,540,30,350,true,function(){
    stoneCollide();
    GameCanvas.displayMessage("Eine kalte Steinmauer...$Ich muss einen anderen Weg finden.");
});
//Tavern
world.createRectangle(-70,570,160,140,true,function(){
    woodCollide();
    GameCanvas.displayMessage("Dieses Haus stinkt nach Bier...$Die Fenster sind...vernagelt...");
});
//Shop
world.createRectangle(220,540,200,150,true,function(){
    windowCollide();
    GameCanvas.displayMessage("Hier ist ein Gebäude.$Es hat große Fensterscheiben, vielleicht Schaufenster?");
});
//MarketPlace
world.createRectangle(30,710,280,150,false,function(){
    GameCanvas.displayMessage("Der Boden ist hier gepflastert und es liegen Sachen herum.$Die Kirchturm-Glocke ist lauter...");
});
//Church Part I
world.createRectangle(-50,860,200,200,true,function(){
    stoneCollide();
    GameCanvas.displayMessage("Kalte Mauern, verziert mit Ornamenten.$Die Kirche...");
});
//Church Part II
world.createRectangle(150,900,140,140,true,function(){
    stoneCollide();
    GameCanvas.displayMessage("Hier muss der Kirchturm sein.$Vielleicht finde ich hier noch etwas anderes...");
});
//Well
world.createRectangle(350,960,30,30,true,function(){
    stoneCollide();
    GameCanvas.displayMessage("Steinig, rund, ich höre Wasser...");
});
//Lower Walls of Town
world.createRectangle(-130,1090,580,30,true,function(){
    stoneCollide();
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
    fenceCollide();
    GameCanvas.displayMessage("Ein verstärkter Zaun. Mit diesem Boden zusammen$könnten hier Tiere gehalten werden. Wo bin ich hier...");
});

world.createRectangle(750,890,30,350,true,function(){
    fenceCollide();
    GameCanvas.displayMessage("Ein starker Zaun.$Da kommt nicht mal ein Stier durch...");
});
//Stable
world.createRectangle(600,890,150,200,true,function(){
    woodCollide();
    GameCanvas.displayMessage("Klingt, und riecht wie ein Stall...$Die Tiere sind unruhig...");
});
//ChickenCoop
world.createRectangle(675,1090,75,150,true,function(){
    fenceCollide();
    GameCanvas.displayMessage("Engmaschiger Zaun... Ein Hühnerstall.$Die Hühner sind unruhig");
});
//Lower Farm Boundarys
world.createRectangle(350,1240,430,30,true,function(){
    stoneCollide();
    GameCanvas.displayMessage("Wieder Steinmauern, diesmal aber noch kälter.$Was rauscht denn hier so seltsam...");
});
world.createRectangle(350,1120,30,30,true,function(){
    stoneCollide();
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
