
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/Predator.js");
var Virus = require("./modules/Virus.js");
var Antivirus = require("./modules/Antivirus.js");
var Fire = require("./modules/Fire.js");
var Water = require("./modules/Water.js");
let random = require('./modules/random');

//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
predatorArr = [];
virusArr = [];
antivirusArr = [];
fireArr = [];
waterArr = [];
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
predatorHashiv = 0;
virusHashiv = 0;
antivirusHashiv = 0;
fireHashiv = 0;
waterHashiv = 0;

weather = "";
counther = 0;



//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, predator,virus,antivirus, water, fire) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < virus; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < antivirus; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    
    for (let i = 0; i < fire; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
    for (let i = 0; i < water; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 7;
    }
}
matrixGenerator(30, 25, 8, 6, 3, 8, 15, 3);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 7) {
                var water = new Water(x, y);
                waterArr.push(water);
                waterHashiv++;           
            }
            else if (matrix[y][x] == 6) {
                var fire = new Fire(x, y);
                fireArr.push(fire);
                fireHashiv++;
            }
            else if (matrix[y][x] == 5) {
                var antivirus = new Antivirus(x, y);
                antivirusArr.push(antivirus);
                antivirusHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var virus = new Virus(x, y);
                virusArr.push(virus);
                virusHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
                predatorHashiv++;
            }
            else if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            }
            else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
        }
    }
}
creatingObjects();

function game() {
    counther++;
    if(counther >= 0 && counther <= 20){
        weather = "spring";
        
    }
    else if(counther >= 20 && counther <=40){
        weather = "summer";
    }
    else if(counther >= 40 && counther <=60){
        weather = "outhemn"
    }
    else if(counther >=60 && counther <=80){
        weather = "winther"
    }
    else{
        counther = 0;
    }
    console.log(weather);
    
    
    
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (predatorArr[0] !== undefined) {        
        for (var i in predatorArr) {
            predatorArr[i].eat();
        }
    }
    if (virusArr[0] !== undefined) {
        for (var i in virusArr) {
            virusArr[i].eat();
        }
    }
    if (antivirusArr[0] !== undefined) {
        for (var i in antivirusArr) {
            antivirusArr[i].eat();
        }
    }
    if (fireArr[0] !== undefined) {
        for (var i in fireArr) {
            fireArr[i].mul();
       }
    }
    if (waterArr[0] !== undefined) {
        for (var i in waterArr) {
            waterArr[i].eat();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        predatorCounter: predatorHashiv,
        virusCounter: virusHashiv,
        antivirusCounter: antivirusHashiv,
        fireCounter: virusHashiv,
        waterCounter: waterHashiv,
        weather: weather
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}




setInterval(game, 500)
