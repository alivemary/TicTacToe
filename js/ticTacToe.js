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
        $('h3').html("You: " + simbol + " Computer: " + otherSimbol);
        
        function hasWon(player) {
            var winCombo = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
            for (var i = 0; i < winCombo.length; i++) {
                
                if (field[winCombo[i][0]] === player && field[winCombo[i][1]] === player && field[winCombo[i][2]] === player) {
                    gameOver = true;
                    $('h3').html(player + " won!");
                    return true;
                };
            }
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
            if (hasWon(simbol) || hasWon(otherSimbol)) return;
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
            if (hasWon(simbol) || hasWon(otherSimbol)) return;
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