var gameFinished = false;
var scoreCount = 0;
var lastWin = false;
var attempts = 0;

function reset()
{
    document.querySelector('.page').classList.remove('freeze');
    if (lastWin == false || gameFinished == false){
        scoreCount = 0;
    }
    else {
        scoreCount += 1;
    }
    gameFinished = false;
    attempts = 0;
    document.getElementById("score").innerHTML = `Score: ${scoreCount}`;
    //set chosen colour
    var c = getRandomColor();
    var str = document.getElementById("question").innerHTML;
    str = str.slice(0, 13);
    str += c;
    document.getElementById("question").innerHTML = str;
    var randId = Math.floor((Math.random() * 6) + 1)
    setRandomColor(c, randId);
    
    for(var i = 1; i < 7; i++) {
        document.getElementById(i).innerHTML="";
        if (i != randId) {
            setRandomColor(getRandomColor(), i);
        }
    }

}

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function getRandomColor()
{
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setRandomColor(givenColor, id) 
{
    document.getElementById(id).style.backgroundColor = givenColor;
}

function guess(colorId)
{
    var str = document.getElementById("question").innerHTML;
    str = str.slice(13, 20);
    str = str.toLowerCase();
    if(rgb2hex(document.getElementById(colorId).style.backgroundColor) == str){
        document.getElementById(colorId).innerHTML = "That was correct!";
        gameFinished = true;
        document.querySelector('.page').classList.add('freeze');
        lastWin = true;
        setTimeout(reset, 1000);
    }
    else{
        if(gameFinished == false){
            document.getElementById(colorId).innerHTML = "That was incorrect";
            attempts += 1;
            if(attempts == 3){
                lastWin = false;
                gameFinished = true;
                document.querySelector('.page').classList.add('freeze');
                setTimeout(reset, 1000);
            }
        }
    }
}

function show() {
    var x = document.getElementById("description");
    if (x.style.display === "none") {
      x.style.display = "block";
      document.getElementById("toggle").innerHTML = "Boring";
    } else {
      x.style.display = "none";
      document.getElementById("toggle").innerHTML = "What?";
    }
    
  } 