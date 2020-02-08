var LiveForm = require("./LiveForm");
var random = require("./random.js");


module.exports = class Antivirus extends LiveForm {
    constructor(x, y) {
        super(x,y)
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
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell) {
            antivirusHashiv++;
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 5;
            var newantivirus = new Antivirus(x, y);
            antivirusArr.push(newantivirus)
            this.life = 15;            
        }

    }
eat() {
        var virusCells = this.chooseCell(4);
        var newCell = random(virusCells);

        if (newCell) {

            this.life++;
            var x = newCell[0];
            var y = newCell[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            for (var i in virusArr) {
                if (x == virusArr[i].x && y == virusArr[i].y) {
                    virusArr.splice(i, 1);
                }
            }
             this.x = x;
            this.y = y;
            let a;
            if(weather =="spring"){
                a = 4
            }
            else if(weather == "summer"){
                a = 6
            }
            else if(weather == "outhemn"){
                a = 8
            }
            else if(weather== "winther"){
                a = 10
                console.log("grass");
                
            }
            if (this.life >= a) {
                this.mul();
            }

        } else {
            this.move();
        }
    }
    move() {
        this.life--;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
        if (this.life < 0){
            this.die();
        }
    }   
    die() {
        matrix[this.y][this.x] = 0;

        for (var i in antivirusArr) {
            if (this.x == antivirusArr[i].x && this.y == antivirusArr[i].y) {
                antivirusArr.splice(i, 1);
            }
        }
    }

}