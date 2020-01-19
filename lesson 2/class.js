//խոտի կլասը
class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0; 
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
    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է character արգումենտով
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    //mul() բազմացում
    mul() {
        this.multiply++;
        if (this.multiply >= 8) {
            //հետազոտում է շրջապատը, որոնում դատարկ տարածքներ
            var emptyCells = this.chooseCell(0);
            var coord = random(emptyCells);
            if (coord) {
                var x = coord[0];
                var y = coord[1];

                //ավելացնում է նոր խոտ խոտերի զանգվածում
                var newGrass = new Grass(x, y);
                grassArr.push(newGrass);

                //ավելացնում է նոր խոտ մատրիցում
                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }
}
//խոտակերի կլասը
class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 3;
        this.directions =[];
    }

    //թարմացնել շրջապատի կոորդինատները
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

    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է character արգումենտով
    chooseCell(character) {
        this.updateCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }



    //move() շարժվել
    move() {
        //որոնում է դատարկ տարածքներ
        var emptyCells = this.chooseCell(0);
        var cօord = random(emptyCells); // 4,3

        if (cօord) {
            var x = cօord[0];
            var y = cօord[1];

            //շարժվում է
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            //նոր կորդինատներ է ստանում
            this.x = x;
            this.y = y;
        }
    }


    //eat()-ուտել
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var grassCells = this.chooseCell(1);
        var coord = random(grassCells);

        //եթե կա հարմար սնունդ
        if (coord) {
            var x = coord[0];
            var y = coord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply++;
 
            //մեծացնում է էներգիան
            this.energy++;

            // սննդի զանգվածից ջնջում է կերված սնունդը
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                }
            }

            //եթե պատրաստ է բազմացմանը, բազմանում է 
            if (this.multiply == 10) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            //եթե չկա հարմար սնունդ 
            this.move();
            this.energy--;
            if (this.energy <= 0) { //մահանում է, եթե էներգիան 0֊ից ցածր է
                this.die();
            }
        }
    }

    //mul() բազմանալ
    mul() {
        //փնտրում է դատարկ տարածք
        var emptyCells = this.chooseCell(0);
        var coord = random(emptyCells);

        //եթե կա բազմանում է
        if (coord){
            var x = coord[0];
            var y = coord[1];
            // this.multiply++;
            //ստեղծում է նոր օբյեկտ (այստեղ խոտակեր) 
            //և տեղադրում է այն խոտակերների զանգվածի մեջ
            var newEater = new GrassEater(x, y);
            eatersArr.push(newEater);

            //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
            matrix[y][x] = 2;
        } 
    }

    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (var i in eatersArr) {
            if (this.x == eatersArr[i].x && this.y == eatersArr[i].y) {
                eatersArr.splice(i, 1);
            }
        }
    }

}


class Gishatich {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 8;
        this.directions =[];
    }

    //թարմացնել շրջապատի կոորդինատները
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

    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է character արգումենտով
    chooseCell(character) {
        this.updateCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }



    //move() շարժվել
    move() {
        //որոնում է դատարկ տարածքներ
        var emptyCells = this.chooseCell(0);
        var cօord = random(emptyCells); // 4,3

        if (cօord) {
            var x = cօord[0];
            var y = cօord[1];

            //շարժվում է
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            //նոր կորդինատներ է ստանում
            this.x = x;
            this.y = y;
        }
    }


    //eat()-ուտել
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var grassCells = this.chooseCell(2);
        var coord = random(grassCells);

        //եթե կա հարմար սնունդ
        if (coord) {
            var x = coord[0];
            var y = coord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply++;
 
            //մեծացնում է էներգիան
            this.energy++;

            // սննդի զանգվածից ջնջում է կերված սնունդը
            for (var i in eatersArr) {
                if (x == eatersArr[i].x && y == eatersArr[i].y) {
                    eatersArr.splice(i, 1);
                }
            }

            //եթե պատրաստ է բազմացմանը, բազմանում է 
            if (this.multiply == 10) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            //եթե չկա հարմար սնունդ 
            this.move();
            this.energy--;
            if (this.energy <= 0) { //մահանում է, եթե էներգիան 0֊ից ցածր է
                this.die();
            }
        }
    }

    //mul() բազմանալ
    mul() {
        //փնտրում է դատարկ տարածք
        var emptyCells = this.chooseCell(0);
        var coord = random(emptyCells);

        //եթե կա բազմանում է
        if (coord){
            var x = coord[0];
            var y = coord[1];
            // this.multiply++;
            //ստեղծում է նոր օբյեկտ (այստեղ խոտակեր) 
            //և տեղադրում է այն խոտակերների զանգվածի մեջ
            var newEater = new GrassEater(x, y);
            eatersArr.push(newEater);

            //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
            matrix[y][x] = 3;
        } 
    }

    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (var i in gishatichArr) {
            if (this.x == gishatichArr[i].x && this.y == gishatichArr[i].y) {
                gishatichArr.splice(i, 1);
            }
        }
    }

}


class Virus {    
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.multiply = 0; 
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
        //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
        //կերպարը որոշվում է character արգումենտով
        chooseCell(character) {
            var found = [];
            for (var i in this.directions) {
                var x = this.directions[i][0];
                var y = this.directions[i][1];
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                    if (matrix[y][x] == character) {
                        found.push(this.directions[i]);
                    }
                }
            }
            return found;
        }
    
        //mul() բազմացում
        mul() {
            this.multiply++;
            if (this.multiply >= 8) {
                //հետազոտում է շրջապատը, որոնում դատարկ տարածքներ
                var emptyCells = this.chooseCell(0);
                var coord = random(emptyCells);
                if (coord) {
                    var x = coord[0];
                    var y = coord[1];
    
                    //ավելացնում է նոր խոտ խոտերի զանգվածում
                    var newvirus = new Virus(x, y);
                    virusArr.push(newvirus);
    
                    //ավելացնում է նոր խոտ մատրիցում
                    matrix[y][x] = 4;
                    this.multiply = 0;
                }
            }
        }
        mul1() {
            this.multiply++;
            if (this.multiply >= 8) {
                //հետազոտում է շրջապատը, որոնում դատարկ տարածքներ
                var emptyCells = this.chooseCell(1);
                var coord = random(emptyCells);
                if (coord) {
                    var x = coord[0];
                    var y = coord[1];
    
                    //ավելացնում է նոր խոտ խոտերի զանգվածում
                    var newvirus = new Virus(x, y);
                    virusArr.push(newvirus);
    
                    //ավելացնում է նոր խոտ մատրիցում
                    matrix[y][x] = 4;
                    this.multiply = 0;
                }
            }
        }
        mul2() {
            this.multiply++;
            if (this.multiply >= 8) {
                //հետազոտում է շրջապատը, որոնում դատարկ տարածքներ
                var emptyCells = this.chooseCell(2);
                var coord = random(emptyCells);
                if (coord) {
                    var x = coord[0];
                    var y = coord[1];
    
                    //ավելացնում է նոր խոտ խոտերի զանգվածում
                    var newvirus = new Virus(x, y);
                    virusArr.push(newvirus);
    
                    //ավելացնում է նոր խոտ մատրիցում
                    matrix[y][x] = 4;
                    this.multiply = 0;
                }
            }
        }
        mul3() {
            this.multiply++;
            if (this.multiply >= 8) {
                //հետազոտում է շրջապատը, որոնում դատարկ տարածքներ
                var emptyCells = this.chooseCell(3);
                var coord = random(emptyCells);
                if (coord) {
                    var x = coord[0];
                    var y = coord[1];
    
                    //ավելացնում է նոր խոտ խոտերի զանգվածում
                    var newvirus = new Virus(x, y);
                    virusArr.push(newvirus);
    
                    //ավելացնում է նոր խոտ մատրիցում
                    matrix[y][x] = 4;
                    this.multiply = 0;
                }
            }
        }
    }

class Antivirus {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.directions =[];
    }

    //թարմացնել շրջապատի կոորդինատները
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

    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է character արգումենտով
    chooseCell(character) {
        this.updateCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }



    //move() շարժվել
    move() {
        //որոնում է դատարկ տարածքներ
        var emptyCells = this.chooseCell(0);
        var cօord = random(emptyCells); // 4,3

        if (cօord) {
            var x = cօord[0];
            var y = cօord[1];

            //շարժվում է
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            //նոր կորդինատներ է ստանում
            this.x = x;
            this.y = y;
        }
    }


    //eat()-ուտել
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var grassCells = this.chooseCell(4);
        var coord = random(grassCells);

        //եթե կա հարմար սնունդ
        if (coord) {
            var x = coord[0];
            var y = coord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            this.multiply++;

            // սննդի զանգվածից ջնջում է կերված սնունդը
            for (var i in virusArr) {
                if (x == virusArr[i].x && y == virusArr[i].y) {
                    virusArr.splice(i, 1);
                }
            }
            if (this.multiply == 10) {
                this.mul()
                this.multiply = 0;
            }

        } else {
            //եթե չկա հարմար սնունդ 
            this.move();
         
        }
    }
 //mul() բազմանալ
 mul() {
    //փնտրում է դատարկ տարածք
    var emptyCells = this.chooseCell(0);
    var coord = random(emptyCells);

    //եթե կա բազմանում է
    if (coord){
        var x = coord[0];
        var y = coord[1];
        // this.multiply++;
        //ստեղծում է նոր օբյեկտ (այստեղ խոտակեր) 
        //և տեղադրում է այն խոտակերների զանգվածի մեջ
        var newantivirus = new Antivirus(x, y);
        antivirusArr.push(newantivirus);

        //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
        matrix[y][x] = 5;
    } 
}
}
class TNT  {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.satkel = 0;
        this.directions =[];
    }

    //թարմացնել շրջապատի կոորդինատները
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

    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է character արգումենտով
    chooseCell(character) {
        this.updateCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    //eat()-ուտել
    eat() {           
            matrix[this.y][this.x] = 0;
            matrix[this.y -1][this.x -1] = 0;
            matrix[this.y][this.x -1] = 0;
            matrix[this.y +1][this.x -1] = 0;
            matrix[this.y -1][this.x] = 0;
            matrix[this.y + 1][this.x] = 0;
            matrix[this.y - 1][this.x +1] = 0;
            matrix[this.y][this.x +1] = 0;
            matrix[this.y +1][this.x +1] = 0;
            matrix[this.y -2][this.x -2] = 0;
            matrix[this.y][this.x -2] = 0;
            matrix[this.y +2][this.x -2] = 0;
            matrix[this.y -2][this.x] = 0;
            matrix[this.y + 2][this.x] = 0;
            matrix[this.y - 2][this.x +2] = 0;
            matrix[this.y][this.x +2] = 0;
            matrix[this.y +2][this.x +2] = 0;
            matrix[this.y +2][this.x +1] = 0;
            matrix[this.y +2][this.x -1] = 0;            
            matrix[this.y +1][this.x -2] = 0;
            matrix[this.y +1][this.x +2] = 0;
            matrix[this.y -1][this.x -2] = 0;
            matrix[this.y -1][this.x +2] = 0;
            matrix[this.y -2][this.x -1] = 0;
            matrix[this.y -2][this.x +1] = 0;
        
                this.die(); 
             
    }

    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (var i in tntArr) {
            if (this.x == tntArr[i].x && this.y == tntArr[i].y) {
                tntArr.splice(i, 1);
            }
        }
    }

}

