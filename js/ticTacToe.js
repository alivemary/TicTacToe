$(document).ready(function () {

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
        var otherSimbol = (simbol == 'X') ? "O" : "X";
        $('h3').html("You: "+simbol+" Computer: "+otherSimbol);
    }
    $('button').on('click', function () {
        switch (this.id) {
            case 'field10':
                {
                    $('#mainWin').removeClass('hidden');
                    $('#startWin').addClass('hidden');
                    $('#loadWin').addClass('hidden');
                    $('#failWin').addClass('hidden');
                    game("X");
                    break;
                }
            case 'field11':
                {
                    $('#mainWin').removeClass('hidden');
                    $('#startWin').addClass('hidden');
                    $('#loadWin').addClass('hidden');
                    $('#failWin').addClass('hidden');
                    game("O");
                    break;
                }
            default:
                {
                    drawO("#" + this.id + '>canvas');
                    break;
                }
       
       }
    });
    $('#mainWin').addClass('hidden');
    $('#startWin').removeClass('hidden');
    $('#loadWin').addClass('hidden');
    $('#failWin').addClass('hidden');
});