var ball;
var database;
var position;

function setup(){
    createCanvas(500,500);
    database = firebase.database();

    var ballPositionRef = database.ref("ball/position");
    ballPositionRef.on("value", readPosition);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y) {
    database.ref("ball/position").update({
        x: position.x + x,
        y: position.y + y
    })
}

function readPosition(data) {
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}