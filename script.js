let matrix = [];
let side = 10;
var grassArr = []; 
var eatersArr = []; 
 var gishatichArr = [] ;
 var virusArr = [];
 var antivirusArr = [];

    function setup() {
        matrixGenerator(80, 200, 100, 30, 20, 25);
        createCanvas(matrix[0].length * side, matrix.length * side);
        background('grey');
        frameRate(8);

        noStroke();

        function matrixGenerator(matrixSize, grassCount, eatersCount, gishatichCount, virusCount, antivirusCount) {
            for (let index = 0; index < matrixSize; index++) {
                matrix[index] = [];
                for (let i = 0; i < matrixSize; i++) {
                    matrix[index][i] = 0;
                }
            }
            for (let index = 0; index < grassCount; index++) {
                let x = Math.floor(random(0, matrixSize));
                let y = Math.floor(random(0, matrixSize));
                matrix[y][x] = 1;
            }
            for (let index = 0; index < eatersCount; index++) {
                let x = Math.floor(random(0, matrixSize));
                let y = Math.floor(random(0, matrixSize));
                matrix[y][x] = 2;
            }
            for (let index = 0; index < gishatichCount; index++) {
                let x = Math.floor(random(0, matrixSize));
                let y = Math.floor(random(0, matrixSize));
                matrix[y][x] = 3;
            }
            for (let index = 0; index < virusCount; index++) {
                let x = Math.floor(random(0, matrixSize));
                let y = Math.floor(random(0, matrixSize));
                matrix[y][x] = 4;
            }
            for (let index = 0; index < antivirusCount; index++) {
                let x = Math.floor(random(0, matrixSize));
                let y = Math.floor(random(0, matrixSize));
                matrix[y][x] = 5;
            }
        }
    
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
    
                if (matrix[y][x] == 1) {
                    var grass = new Grass(x, y);
                    grassArr.push(grass);
                }
    
                else if (matrix[y][x] == 2) {
                    var eater = new GrassEater(x, y);
                    eatersArr.push(eater);
                }

                else if (matrix[y][x] == 3){
                    var gishatich = new Gishatich(x,y);
                    gishatichArr.push(gishatich);
                }
                else if (matrix[y][x] == 4){
                    var virus = new Virus(x,y);
                    virusArr.push(virus);
                }
                else if (matrix[y][x] == 5){
                    var antivirus = new Antivirus(x,y);
                    antivirusArr.push(antivirus);
                }
                            
            }
        }
    }
    
    function draw() {

        for (var y = 0; y < matrix.length; y++) {
            const element =matrix[y];
            for (var x = 0; x < element.length; x++) {

                if (matrix[y][x] == 1) {
                    fill("green");
                } 
    
                else if (matrix[y][x] == 2) {
                    fill("yellow");
                }

                else if (matrix[y][x] == 3){
                    fill("black");
                }
                else if (matrix[y][x] == 4){
                    fill("red");
                }
                else if (matrix[y][x] == 5) {
                    fill('blue');
                }

                else {
                    fill('#acacac');
                
                    }
            rect(x * side, y * side, side, side);
                } 
        }
        for (let index = 0; index < grassArr.length; index++) {
            grassArr[index].mul();
        }
        for (let index = 0; index < eatersArr.length; index++) {
            eatersArr[index].eat();
        }
        for (let index = 0; index < gishatichArr.length; index++) {
            gishatichArr[index].eat();
        }
        for (let index = 0; index < virusArr.length; index++) {
           virusArr[index].mul();
        }
        for (let index = 0; index < antivirusArr.length; index++) {
            antivirusArr[index].eat();
         }
    }