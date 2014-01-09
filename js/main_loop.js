//World init

var world = new World(1000);

world.createLocalPlayer(1,0,1);

var audio1 = new AudioNode(50,0,100,1,0,1);
world.addAudioNode(audio1);
audio1.startAsSample('/sounds/test.wav');

var audio2 = new AudioNode(22,0,3,1,0,1);
world.addAudioNode(audio2);
audio2.startAsSample('/sounds/test2.wav');

//Debug init

MyCanvas.refreshNodes();

/*var audio3 = new AudioNode(-111,0,-122);
audio3.startAsSample('/sounds/test3.wav');
world.addAudioNode(audio3);*/

/*//Display Loop
function updateDisplay(){

}

//MAIN LOOP
var mainloop = function() {
        updateDisplay();
        //drawGame();
    };

    var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null ;

    var recursiveAnim = function() {
        mainloop();
        animFrame( recursiveAnim );
    };

    // start the mainloop
    animFrame( recursiveAnim );*/