
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
    let weather = document.getElementById('weather')


    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        console.log(data.weather);
        
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        weather.innerText = data.weather;
        //grassEaterCountElement.innerText = data.grassCounter;//s
        //predatorCountElement.innerText = data.predatorCounter;//S
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)
        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
               
                if (matrix[i][j] == 1) {
                     if(data.weather == "spring"){
                    fill("#03fc13");
                }
                else if(data.weather == "summer"){
                    fill("#3dfc49"); 
                }
                else if(data.weather == "outhemn"){
                    fill("#54a158");
                }       
                else if(data.weather == "winther"){
                    fill("#8fe394");
                }
                    rect(j * side, i * side, side, side); 
                }
                
                else if (matrix[i][j] == 2) {
                    if(data.weather == "spring"){
                        fill("#fbff00");
                    }
                    else if(data.weather == "summer"){
                        fill("#fafc6f"); 
                    }
                    else if(data.weather == "outhemn"){
                        fill("#b6b82a");
                    }       
                    else if(data.weather == "winther"){
                        fill("#f6f781");
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    if(data.weather == "spring"){
                        fill("#dd00ff");
                    }
                    else if(data.weather == "summer"){
                        fill("#e36cf5"); 
                    }
                    else if(data.weather == "outhemn"){
                        fill("#7e348a");
                    }       
                    else if(data.weather == "winther"){
                        fill("#e198ed");
                    }
                    rect(j * side, i * side, side, side);
                }  else if (matrix[i][j] == 4) {
                    if(data.weather == "spring"){
                        fill("#01061f");
                    }
                    else if(data.weather == "summer"){
                        fill("#2a2c36"); 
                    }
                    else if(data.weather == "outhemn"){
                        fill("#101117");
                    }       
                    else if(data.weather == "winther"){
                        fill("#393a40");
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    if(data.weather == "spring"){
                        fill("#00fff2");
                    }
                    else if(data.weather == "summer"){
                        fill("#81fcf6"); 
                    }
                    else if(data.weather == "outhemn"){
                        fill("#3d8581");
                    }       
                    else if(data.weather == "winther"){
                        fill("#a0faf5");
                    }
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
