$(document).ready(function () {
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
    $('button').on('click', function () {
        switch (this.id) {
            case 'field10':
                {
                    drawX("#" + this.id + '>canvas');
                    $('#mainWin').removeClass('hidden');
                    $('#startWin').addClass('hidden');
                    $('#loadWin').addClass('hidden');
                    $('#failWin').addClass('hidden');
                    break;
                }
            case 'field11':
                {
                    drawO("#" + this.id + '>canvas');
                    $('#mainWin').removeClass('hidden');
                    $('#startWin').addClass('hidden');
                    $('#loadWin').addClass('hidden');
                    $('#failWin').addClass('hidden');
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