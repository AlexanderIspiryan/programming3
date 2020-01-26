class LivingCreature {
    constructor(x, y, index){
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }   
        }
        return found;
    }
}


class Grass extends LivingCreature {


    mul() {
        this.multiply++;
        if (this.multiply >= 8) {
            var emptyCells = this.chooseCell(0);
            var coord = random(emptyCells);
            if (coord) {
                var x = coord[0];
                var y = coord[1];

                var newGrass = new Grass(x, y);
                grassArr.push(newGrass);

                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }
}

class GrassEater extends LivingCreature {
    constructor(x, y,index) {
        super(x,y,index);
        this.energy = 20;
    }
    updateCoordinates() {
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
        this.updateCoordinates();
        return super.chooseCell(character);
    }

    move() {

        var emptyCells = this.chooseCell(0);
        var cօord = random(emptyCells);

        if (cօord) {
            var x = cօord[0];
            var y = cօord[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }


    eat() {
        var grassCells = this.chooseCell(1);
        var coord = random(grassCells);

        if (coord) {
            var x = coord[0];
            var y = coord[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);

                }
            }

            if (this.multiply == 20) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var coord = random(emptyCells);

        if (coord) {
            var x = coord[0];
            var y = coord[1];

            var newEater = new GrassEater(x, y);
            eatersArr.push(newEater);

            matrix[y][x] = 2;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;

        for (var i in eatersArr) {
            if (this.x == eatersArr[i].x && this.y == eatersArr[i].y) {
                eatersArr.splice(i, 1);
            }
        }
    }

}


class Gishatich extends LivingCreature {
    constructor(x, y,index) {
        super(x,y,index);
        this.energy = 80;
    }
    updateCoordinates() {
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
        this.updateCoordinates();
        return super.chooseCell(character);
    }


    move() {
        var emptyCells = this.chooseCell(0);
        var cօord = random(emptyCells);

        if (cօord) {
            var x = cօord[0];
            var y = cօord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }


    eat() {
        var grassCells = this.chooseCell(2);
        var coord = random(grassCells);

        if (coord) {
            var x = coord[0];
            var y = coord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            for (var i in eatersArr) {
                if (x == eatersArr[i].x && y == eatersArr[i].y) {
                    eatersArr.splice(i, 1);
                }
            }

            if (this.multiply == 2) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var coord = random(emptyCells);

        if (coord) {
            var x = coord[0];
            var y = coord[1];

            var newGishatich = new Gishatich(x, y);
            gishatichArr.push(newGishatich);

            matrix[y][x] = 3;
        }
    }


    die() {
        matrix[this.y][this.x] = 0;

        for (var i in gishatichArr) {
            if (this.x == gishatichArr[i].x && this.y == gishatichArr[i].y) {
                gishatichArr.splice(i, 1);

            }
        }
    }
}


class Virus extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
    }
    updateCoordinates(){
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
        this.updateCoordinates();
             return super.chooseCell(character);
        }
       
    

    mul() {
        this.multiply++;
        if (this.multiply >= 10) {
            var emptyCells = this.chooseCell(0 || 1 || 2 || 3);
            var coord = random(emptyCells);
            if (coord) {
                var x = coord[0];
                var y = coord[1];

                var newVirus = new Virus(x, y);
                virusArr.push(newVirus);

                matrix[y][x] = 4;
                this.multiply = 0;
            }
        }
    }
}

class Antivirus extends LivingCreature {
    constructor(x, y, index) {
        super(x,y,index)
    }
    updateCoordinates() {
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
        this.updateCoordinates();
        return super.chooseCell(character);
    }


    move() {
        var emptyCells = this.chooseCell(0);
        var cօord = random(emptyCells);

        if (cօord) {
            var x = cօord[0];
            var y = cօord[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }


    eat() {
        var virusCells = this.chooseCell(4);
        var coord = random(virusCells);

        if (coord) {
            var x = coord[0];
            var y = coord[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            for (var i in virusArr) {
                if (x == virusArr[i].x && y == virusArr[i].y) {
                    virusArr.splice(i, 1);
                }
            }
            if (this.multiply == 50) {
                this.mul()
                this.multiply = 0;
            }

        } else {
            this.move();
        }
    }

    move() {
        var grassCells = this.chooseCell(0);
        var coord = random(grassCells);
        if (coord) {
            var x = coord[0];
            var y = coord[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

        }
        else {
            this.die();
        }
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var coord = random(emptyCells);

        if (coord) {
            var x = coord[0];
            var y = coord[1];

            var newantivirus = new Antivirus(x, y);
            antivirusArr.push(newantivirus);

            matrix[y][x] = 5;
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
