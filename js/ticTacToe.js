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

        function Player(type, simbol) {
            this.type = type;
            this.simbol = simbol;
            this.hasWon = function(field){
                var winCombo = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
                for (var i = 0; i < winCombo.length; i++) {
                    if (field[winCombo[i][0]] === this.simbol && field[winCombo[i][1]] === this.simbol && field[winCombo[i][2]] === this.simbol) {
                       
                        return true;
                    };
                }
                return false;
            }
            this.checkVictory = function (field) {
                if (this.hasWon(field)) {
                    gameOver = true;
                    $('h3').html(this.simbol + " won!");
                    return true;
                }
                return false;
            }
        }

        var opponent, computer;

        if (simbol == 'X') {
            opponent = new Player("HUMAN", "X");
            computer = new Player("COMPUTER", "O");
        }
        else {
            computer = new Player("COMPUTER", "X");
            opponent = new Player("HUMAN", "O");
        }
        
        $('h3').html("You: " + opponent.simbol + " Computer: " + computer.simbol);

        function calcLineScore(nFuild, line) {
            var x = 0, o = 0, p = 0;
            for (var i = 0; i < line.length; i++) {
                switch (nFuild[line[i]]) {
                    case "X":
                        x++;
                        break;
                    case "O":
                        o++;
                        break;
                    case " ":
                        p++;
                        break;
                }
            }
            if (x === 3 && computer.simbol == "X") return 100;
            if (o === 3 && computer.simbol == "O") return 100;
            if (x === 3 && opponent.simbol == "X") return -100;
            if (o === 3 && opponent.simbol == "O") return -100;
            if (x === 2 && p === 1 && computer.simbol == "X") return 10;
            if (o === 2 && p === 1 && computer.simbol == "O") return 10;
            if (x === 2 && p === 1 && opponent.simbol == "X") return -10;
            if (o === 2 && p === 1 && opponent.simbol == "O") return -10;
            if (x === 1 && p === 2 && computer.simbol == "X") return 1;
            if (o === 1 && p === 2 && computer.simbol == "O") return 1;
            if (x === 1 && p === 2 && opponent.simbol == "X") return -1;
            if (o === 1 && p === 2 && opponent.simbol == "O") return -1;
            return 0;
        }
        function calcScore(nFuild) {
            var winCombo = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
            var score = 0;
            winCombo.forEach(function (combo) {
                score += calcLineScore(nFuild, combo);
            });
            return score;
        }
        //function is not ready yet
       
        function minimax(level, field, player, alpha, beta) {
            var nFuild = field.slice();
            var possibleMoves = [];
            var score;
            if (level === 0) return calcScore(nFuild);
            if (player.hasWon(nFuild) || opponent.hasWon(nFuild)){
                return calcScore(nFuild);
            }
            //All possible children
            for (var i = 0; i < nFuild.length; i++) {
                if (nFuild[i] == ' ') possibleMoves.push({ pos: i, score: undefined });
            }
            if (possibleMoves.length === 0) return 0;
            //Computer turn
            if (player.type == "COMPUTER") {
                for (var i = 0; i < possibleMoves.length; i++) {
                    nFuild[possibleMoves[i].pos] = player.simbol;
                    possibleMoves[i].score = minimax(level-1, nFuild, opponent, alpha, beta);
                    nFuild[possibleMoves[i].pos] = " ";
                    if (possibleMoves[i].score > alpha) alpha = possibleMoves[i].score;
                    if (alpha >= beta) break;
                }
                return alpha;
            }
            //Human turn
            else {
                for (var i = 0; i < possibleMoves.length; i++) {
                    nFuild[possibleMoves[i].pos] = player.simbol;
                    possibleMoves[i].score = minimax(level-1, nFuild, computer, alpha, beta);
                    nFuild[possibleMoves[i].pos] = " ";
                    if (possibleMoves[i].score < beta) beta = possibleMoves[i].score;
                    if (alpha >= beta) break;
                }
                return beta;
            }
        }
        function getMinMaxPos(field, player) {
            var possibleMoves = [];
            var nFuild = field.slice();
            for (var i = 0; i < nFuild.length; i++) {
                if (nFuild[i] == ' ') possibleMoves.push({ pos: i, score: undefined });

            }
            for (var i = 0; i < possibleMoves.length; i++) {
                nFuild[possibleMoves[i].pos] = player.simbol;
                possibleMoves[i].score = minimax(2, nFuild, opponent, -100000, 100000);
                nFuild[possibleMoves[i].pos] = " ";
            }
            var max = 0;
            for (var i = 1; i < possibleMoves.length;i++){
                if (possibleMoves[i].score>possibleMoves[max].score){
                    max = i;
                }
            }
            return possibleMoves[max].pos;
        }
        $('button').on('click', function () {
            //human turn
            
            var n = Number(this.id.replace( /^\D+/g, ''))-1;
            if (field.indexOf(' ') === -1 || gameOver || field[n] !== ' ') return;
            if (field.indexOf(' ') !== -1 && !gameOver) {
                if (field[n] === ' ') {
                    field[n] = opponent.simbol;
                    console.log("#field" + n + ">canvas");
                    if (opponent.simbol == 'X') drawX("#field" + (n + 1) + ">canvas");
                    if (opponent.simbol == 'O') drawO("#field" + (n + 1) + ">canvas");
                }
                console.log(field);
            }
            else {
                gameOver == true;
                
            }
            if (opponent.checkVictory(field)) return;
            //computer turn
            
            if (field.indexOf(' ') === -1 || gameOver) return;
            if (field.indexOf(' ') !== -1 && !gameOver) {
                var m = getMinMaxPos(field, computer);
                field[m] = computer.simbol;
                if (computer.simbol == 'X') drawX("#field" + (m + 1) + ">canvas");
                if (computer.simbol == 'O') drawO("#field" + (m + 1) + ">canvas");
                console.log(field);
            }
            else {
                gameOver == true;
                
            }
            if (computer.checkVictory(field)) return;
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