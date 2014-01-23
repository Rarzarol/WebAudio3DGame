window.addEventListener('keydown', function (e) {
	//d
    if (e.keyCode === 68) { input.dDown = true; }
    //a
    if (e.keyCode === 65) { input.aDown = true; }
    //w
    if (e.keyCode === 87) { input.wDown = true; }
    //s
    if (e.keyCode === 83) { input.sDown = true; }

    //TODO: woanders hin
    MyCanvas.resetText();
}, false);

window.addEventListener('keyup', function (e) {
    //d
    if (e.keyCode === 68) { input.dDown = false; }
    //a
    if (e.keyCode === 65) { input.aDown = false; }
    //w
    if (e.keyCode === 87) { input.wDown = false; }
    //s
    if (e.keyCode === 83) { input.sDown = false; }
},false);

/////////////////////////////////////////////////////////////////////
// Mouse Capture Code
/////////////////////////////////////////////////////////////////////

canvas.addEventListener('mousedown', function(evt) {
    mousePos = MyCanvas.getMousePos(evt);
    Debug.chooseNodeByCoords(mousePos.x,mousePos.y);

},false);

function moveCallback(e){
    var canvas = $("#pointerLock").get()[0];
    var ctx = canvas.getContext('2d');

    var movementX = (e.movementX || e.mozMovementX || e.webkitMovementX || 0) / 10;
    var movementY = (e.movementY || e.mozMovementY || e.webkitMovementY || 0) / 10;
    input.setMouseDeltas(movementX,movementY);
}

// called when the pointer lock has changed. Here we check whether the
// pointerlock was initiated on the element we want.
function changeCallback(e){
    var canvas = $("#pointerLock").get()[0];
    if (document.pointerLockElement === canvas ||
            document.mozPointerLockElement === canvas ||
            document.webkitPointerLockElement === canvas) {

        // we've got a pointerlock for our element, add a mouselistener
        document.addEventListener("mousemove", moveCallback, false);
    } else {

        // pointer lock is no longer active, remove the callback
        document.removeEventListener("mousemove", moveCallback, false);
        // and reset the entry coordinates
        entryCoordinates = {x:-1, y:-1};
    }
};

// Hook pointer lock state change events
document.addEventListener('pointerlockchange', changeCallback, false);
document.addEventListener('mozpointerlockchange', changeCallback, false);
document.addEventListener('webkitpointerlockchange', changeCallback, false);

// when element is clicked, we're going to request a pointerlock
$("#pointerLock").click(function () {
    var canvas = $("#pointerLock").get()[0];
    canvas.requestPointerLock = canvas.requestPointerLock ||
            canvas.mozRequestPointerLock ||
            canvas.webkitRequestPointerLock;

    // Ask the browser to lock the pointer)
    canvas.requestPointerLock();
});

