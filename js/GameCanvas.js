/**
 * Created by Roman on 04.02.14.
 */
var gameCanvas = document.getElementById('gameCanvas');
var gamectx = gameCanvas.getContext('2d');
var currentText = "";
var textAlpha = 1;

function GameCanvas(){
}

GameCanvas.displayMessage = function(message) {
    GameCanvas.eraseMessage();
    currentText = String(message);
    console.log("message SET to "+currentText);
    textAlpha =0;
};

GameCanvas.eraseMessage = function(){
    currentText = "";
};

GameCanvas.draw = function(){
    gamectx.clearRect(0,0,gameCanvas.width,gameCanvas.height);
    gamectx.font = '18pt Calibri';
    gamectx.fillStyle = "#333333";
    gamectx.globalAlpha = textAlpha;
    gamectx.textAlign = 'center';
    gamectx.fillText(currentText, gameCanvas.width/2, gameCanvas.height/2);
    (textAlpha <= 1) ? textAlpha += 0.01 : textAlpha = 1;
};