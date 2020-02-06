var LiveForm = require("./LiveForm");
var random = require("./random.js");
var Weather = require("./Weather");
Weather();



module.exports = class Fire extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
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
        let a;
        
        this.multiply++;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        if(exanak == "spring"){
         a = 6;

        }
        else if(exanak == "summer"){
         a = 8;

        }
        else if(exanak == "outhemn"){
        a = 12;

        }
        else if(exanak == "winther"){
         a = 13;   

        }
            if (newCell && this.multiply >= a) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 6;
            let fire = new Fire(x, y);
            fireArr.push(fire);
            this.multiply = 0;
        }

    }
}