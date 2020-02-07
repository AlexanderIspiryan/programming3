var LiveForm = require("./LiveForm");
var random = require("./random.js");




module.exports = class Predator extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.energy = 40;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            let predator = new Predator(x, y);
            predatorArr.push(predator);
            this.life = 10;
        }
    }


    eat() {
        var grassCells = this.chooseCell(2);
        var newCell = random(grassCells);

        if (newCell) {
            this.life++;
            var x = newCell[0];
            var y = newCell[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            for (var i in grassEaterArr) {
                if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                }
            }
            this.x = x;
            this.y = y;
            let a;

            if(weather == "spring"){
                a = 4; 
               }
               else if(weather == "summer"){
                a = 6;
               }
               else if(weather == "outhemn"){
               a = 8;
               }
               else if(weather == "winther"){
                a = 12;   
               }
            if (this.multiply >= a) {
                this.mul()
            }
        } else {
            this.move();
        }
    }
    move() {
        this.life--;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.life < 0) {
            this.die();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;

        for (var i in predatorArr) {
            if (this.x == PredatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);

            }
        }
    }
}
