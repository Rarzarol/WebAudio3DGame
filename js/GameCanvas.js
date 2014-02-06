/**
 * Created by Roman on 04.02.14.
 */
var gameCanvas = document.getElementById('gameCanvas');
var gamectx = gameCanvas.getContext('2d');
var currentText = "";
var textAlpha = 1;
var textArray = {};
var TEXT_SPACING = 24;

function GameCanvas(){
}

GameCanvas.displayMessage = function(message) {
    textToBeSplit = String(message);
    textArray = textToBeSplit.split("$");
    textAlpha = 0;
};

GameCanvas.draw = function(){
    gamectx.clearRect(0,0,gameCanvas.width,gameCanvas.height);
    gamectx.font = '18pt Calibri';
    gamectx.fillStyle = "#333333";
    gamectx.globalAlpha = textAlpha;
    gamectx.textAlign = 'center';

    var txtX = gameCanvas.width/2;
    var txtY = gameCanvas.height/2;
    for(var i = 0; i < textArray.length; i++){
        gamectx.fillText(textArray[i],txtX,txtY);
        txtY+=TEXT_SPACING;
    }
    (textAlpha <= 1) ? textAlpha += 0.01 : textAlpha = 1;
};