module.exports = function weather(){
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