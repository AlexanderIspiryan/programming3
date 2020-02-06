
//! Setup function fires automatically
function setup() {
    
    var socket = io();

    var side = 30;

    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let virusCountElement = document.getElementById('virusCount');
    let antivirusCountElement = document.getElementById('antivirusCount');
    let fireCountElement = document.getElementById('fireCount');
    let waterCountElement = document.getElementById('waterCount');


    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        function weather(){
            calc = Math.floor((Math.random() * 4000) +1);
        if(calc >= 3000){
            exanak = "spring"
        }
        else if(calc >=2000 && calc <=3000){
            exanak = "summer"
        }
        else if(calc >= 1000 && calc <=2000){
            exanak = "outhemn"
        }
        else if(calc >=0 && calc <= 1000){
            exanak = "winther"
        }
        console.log(exanak);
        
        }
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        //grassEaterCountElement.innerText = data.grassCounter;//s
        //predatorCountElement.innerText = data.predatorCounter;//S
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)
            weather();
        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
               
                if (matrix[i][j] == 1) {
                     if(exanak == "spring"){
                    fill("orange");
                    rect(j * side, i * side, side, side);
                }
                else{
                    fill("green"); 
                    rect(j * side, i * side, side, side); 
                }
                      
                    
                } else if (matrix[i][j] == 2) {
                    fill("yellow");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill('brown');
                    rect(j * side, i * side, side, side);
                }  else if (matrix[i][j] == 4) {
                    fill('pink');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('purple');
                    rect(j * side, i * side, side, side);
                }else if (matrix[i][j] == 6) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                }else if (matrix[i][j] == 7) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                }else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}
setInterval(weather(),1000);