$(document).ready(function () {
    var field = [];
    for (var i = 0; i < 9; i++) field[i] = ' ';
    var gameOver = false;

    drawX("#field10>canvas");
    drawO("#field11>canvas");

    function drawX(where){
        var ctx = $(where)[0].getContext('2d');
        ctx.beginPath();
        ctx.moveTo(20, 50);
        ctx.lineTo(50, 20);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(20, 20);
        ctx.lineTo(50, 50);
        ctx.stroke();
    }
    function drawO(where) {
        var ctx = $(where)[0].getContext('2d');
        ctx.beginPath();
        ctx.arc(35, 35, 20, 0, 2 * Math.PI);
        ctx.stroke();
    }
    function game(simbol) {
        $('#mainWin').removeClass('hidden');
        $('#startWin').addClass('hidden');
        var otherSimbol = (simbol == 'X') ? "O" : "X";
        var turn = (simbol == 'X') ? "HUMAN" : "COMPUTER";
        $('h3').html("You: " + simbol + " Computer: " + otherSimbol);
           
        switch (turn) {
                case "HUMAN":
                    
                   
                    break;
                case "COMPUTER":
                   
                    
                    break;
        }
        $('button').on('click', function () {
            //human turn
            var n = Number(this.id.replace( /^\D+/g, ''))-1;
            if (field.indexOf(' ') === -1 || gameOver || field[n] !== ' ') return;
            if (field.indexOf(' ') !== -1 && !gameOver) {
                if (field[n] === ' ') {
                    field[n] = simbol;
                    console.log("#field" + n + ">canvas");
                    if (simbol == 'X') drawX("#field" + (n+1) + ">canvas");
                    if (simbol == 'O') drawO("#field" + (n + 1) + ">canvas");
                }
                console.log(field);
            }
            else gameOver == true;
            //computer turn
            if (field.indexOf(' ') === -1 || gameOver) return;
            if (field.indexOf(' ') !== -1 && !gameOver) {
                var m = field.indexOf(' ');
                field[m] = otherSimbol;
                if (simbol == 'X') drawO("#field" + (m + 1) + ">canvas");
                if (simbol == 'O') drawX("#field" + (m + 1) + ">canvas");
                console.log(field);
            }
            else gameOver == true;
            
        });
        
    }
   
    //choose your side
    $('button').on('click', function () {
        switch (this.id) {
            case 'field10':
                {
                    game("X");
                    break;
                }
            case 'field11':
                {
                    game("O");
                    break;
                }
           
       }
    });
    $('#mainWin').addClass('hidden');
    $('#startWin').removeClass('hidden');
    $('#loadWin').addClass('hidden');
    $('#failWin').addClass('hidden');
});