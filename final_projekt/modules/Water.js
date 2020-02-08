var LiveForm = require("./LiveForm");
var random = require("./random.js");


module.exports = class Water extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 25;
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
            waterHashiv++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 7;
            let water = new Water(x, y);
            waterArr.push(water);
            this.life = 15;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(6);
        let newCell = random(emptyCells);

        if (newCell) {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 7;
            matrix[this.y][this.x] = 0;

            for (let i in fireArr) {
                if (fireArr[i].x == x && fireArr[i].y == y) {
                    fireArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;
            let a;

            if(weather == "spring"){
                a = 2; 
               }
               else if(weather == "summer"){
                a = 6;
               }
               else if(weather == "outhemn"){
               a = 8;
               }
               else if(weather == "winther"){
                a = 10;   
               }
            if (this.life >= a) {
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
            matrix[y][x] = 7;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.life < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 1;

        for (let i in waterArr) {
            if (waterArr[i].x == this.x && waterArr[i].y == this.y) {
                waterArr.splice(i, 1)
            }
        }
    }
}