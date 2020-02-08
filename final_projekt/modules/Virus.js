var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Virus extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 10;
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
            virusHashiv++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            let virus = new Virus(x, y);
            virusArr.push(virus);
            this.life = 5;
        }
    }
    eat() {
        let a;

        if(weather == "spring"){
            a = 1; 
           }
           else if(weather == "summer"){
            a = 2;
           }
           else if(weather == "outhemn"){
           a = 3;
           }
           else if(weather == "winther"){
            a = 1;   
           }
        let emptyCells = this.chooseCell(a);
        let newCell = random(emptyCells);

        if (newCell) {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            if(weather == "spring" || weather == "winther"){
                for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }

            }
            else if(weather == "summer"){
                 for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }
            }
            else if (weather == "outhemn"){
                for (let i in predatorArr) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1)
                }
            }
            }

            this.x = x;
            this.y = y;
            let b;

            if(weather == "spring"){
                b = 15; 
               }
               else if(weather == "summer"){
                b = 20;
               }
               else if(weather == "outhemn"){
               b = 26;
               }
               else if(weather == "winther"){
                b = 30;   
               }
            if (this.life >= b) {
                this.mul();
            }
        }
        else {
            this.move()
        }
    }
    move() {
        this.life--;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
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

        for (let i in virusArr) {
            if (virusArr[i].x == this.x && virusArr[i].y == this.y) {
                virusArr.splice(i, 1)
            }
        }
    }
}