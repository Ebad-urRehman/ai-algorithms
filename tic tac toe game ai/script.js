// import {drawCircle, drawCross} from './functions.js';

window.onload = function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const backgroundImage = new Image();
    backgroundImage.src = "images/tic tac toe.png"

    let board_status = Array(9).fill(null);
    // width and height of clickable areas
    var rectWidth = 200;
    var rectHeight = 200;
    var begin_point_x = 0;
    var begin_point_y = 0;

    var player1option = 'o';
    var player2option = 'x';
    var clicked_index = null;
    var clickX;
    var clickY;

    var playerTurn = 1;
    var turnInfoText = document.getElementById('text_info')


    backgroundImage.onload = function() {
        canvas.width = backgroundImage.width;
        canvas.height = backgroundImage.height;

        ctx.drawImage(backgroundImage, 0,0, canvas.width, canvas.height);

    }

    function drawCircle(x,y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2*Math.PI);
        ctx.lineWidth = 5;
        ctx.stroke();
        console.log(x,y, radius)
        console.log('here circles')
    }
    
    function drawCross(x,y, size) {
        ctx.beginPath();
        ctx.lineWidth = 5;
    
        ctx.moveTo(x-size/2, y-size/2);
        ctx.lineTo(x+size/2, y+size/2);
    
        ctx.moveTo(x+size/2, y-size/2);
        ctx.lineTo(x-size/2, y+size/2);
        ctx.stroke();
    }
    
    

    var rectangles = []
    function makeRectangles() {
        for(let i=0;i<3;i++) {
            for(let j=0;j<3;j++) {
                let x_start = 0;
                let y_start = 0;
                let rect = {
                    x: begin_point_x + x_start,
                    y: begin_point_y + y_start,
                    width: rectWidth,
                    height: rectHeight,
                    index: i+j
                }
                rectangles.push(rect)
                begin_point_x += rectWidth;
        }
        begin_point_x = 0;
        begin_point_y += rectHeight;
    }
    }

    function makeRectanglesClickable() {
        canvas.addEventListener('click', function(event) {
            // Get the click coordinates relative to the canvas
            const rectBounds = canvas.getBoundingClientRect();
            clickX = event.clientX - rectBounds.left;
            clickY = event.clientY - rectBounds.top;
            console.log('Click coordinates:', clickX, clickY);

            
            playGameAi();
        }) 
    }
    makeRectangles();
    makeRectanglesClickable();
    console.log(rectangles[clicked_index])

    function findCenter(index) {
        let x = rectangles[index].x + 100;
        let y = rectangles[index].y + 100;
        return [x,y]
    }

    function playGameTwoPlayer() {
            rectangles.forEach((rect, index) => {
                if(clickX > rect.x && clickX < rect.x + rect.width 
                && clickY > rect.y && clickY < rect.y + rect.width) {
                    console.log('area clicked', clickX, clickY, index);
                    clicked_index = index;
                }
            })
            
            if(board_status[clicked_index] != null) {
                return;
            }

            // altering player turns
            if(playerTurn == 1) {
                console.log(playerTurn)
                player1Turn();
                playerTurn = 2;
                turnInfoText.textContent = "Player X turn";
                console.log(playerTurn);
                setTimeout(check_win(), 15000);
            }
            else {
                player2Turn();
                playerTurn=1;
                turnInfoText.textContent = "Player O turn";
                console.log(board_status)
                setTimeout(check_win(), 15000);

            }

    }

    function playGameAi() {
        rectangles.forEach((rect, index) => {
            if(clickX > rect.x && clickX < rect.x + rect.width 
            && clickY > rect.y && clickY < rect.y + rect.width) {
                console.log('area clicked', clickX, clickY, index);
                clicked_index = index;
            }
        })
        
        if(board_status[clicked_index] != null) {
            return;
        }

        // no need of altering player turns 1st palyer then second AI(player2)
        console.log(playerTurn)
        player1Turn();
        playerTurn = 2;
        turnInfoText.textContent = "Player X turn";
        console.log(playerTurn)
        check_win();
        
        playerAiTurn();
        playerTurn=1;
        turnInfoText.textContent = "Player O turn";
        check_win();
}

    function isBoardFull(board) {
        for(let i=0; i<board.length; i++) {
            if(board[i] == null) {
                return false;
            }
        }
        return true;
    }

    function player1Turn() {
        let center_coordinates = findCenter(clicked_index)
        let x = center_coordinates[0];
        let y = center_coordinates[1];

        board_status[clicked_index] = player1option;
        console.log(board_status)
        if(player1option == 'o') {
            drawCircle(x,y, 50);
        }
        else {
            drawCross(x,y, 75);
        }
    }

    function player2Turn() {
        let center_coordinates = findCenter(clicked_index)
        let x = center_coordinates[0];
        let y = center_coordinates[1];

        board_status[clicked_index] = player2option;
        if(player2option == 'o') {
            drawCircle(x,y, 50);
        }
        else {
            drawCross(x,y, 75);
        }
    }

    function playerAiTurn() {
        let best_move = bestMove();

        let center_coordinates = findCenter(best_move)
        let x = center_coordinates[0];
        let y = center_coordinates[1];

        board_status[best_move] = player2option;
        console.log(board_status);
        if(player2option == 'o') {
            drawCircle(x,y, 50);
        }
        else {
            drawCross(x,y, 75);
        }
    }

    function checkStatus(board_status) {
        if(board_status[0] === board_status[1] && board_status[0] === board_status[2]) {
            if (board_status[0] != null) {
                return board_status[0];
            }
        }
        else if (board_status[3] == board_status[4] && board_status[3] == board_status[5]) {
            if (board_status[3] != null) {
                return board_status[3];
            }
        }
        else if (board_status[6] == board_status[7] && board_status[6] == board_status[8]) {
            if (board_status[6] != null) {
                return board_status[6];
            }
        }
        else if (board_status[0] == board_status[3] && board_status[0] == board_status[6]) {
            if (board_status[0] != null) {
                return board_status[0];
            }
        }
        else if (board_status[1] === board_status[4] && board_status[1] === board_status[7]) {
            if (board_status[1] != null) {
                return board_status[1];
            }
        }
        else if (board_status[2] == board_status[5] && board_status[2] == board_status[8]) {
            if (board_status[2] != null) {
                return board_status[2];
            }
        }
        else if (board_status[0] == board_status[4] && board_status[0] == board_status[8]) {
            if (board_status[0] != null) {
                return board_status[0];
            }
        }
        else if (board_status[2] == board_status[4] && board_status[2] == board_status[6]) {
            if (board_status[2] != null) {
                return board_status[2];
            }
        }
        return null;

    }
    
    function check_win() {
        let player = checkStatus(board_status);
        if(player == "o"){
            document.getElementById('text_info').textContent = "Player O wins";
        }
        else if (player == "x") {
            document.getElementById('text_info').textContent = "Player X wins";
        }
        else if (isBoardFull(board_status)) {
            document.getElementById('text_info').textContent = "It's a Draw";
        }
    }
    

    function miniMax(board_status_test, is_maximising) {
        let winner = checkStatus(board_status_test);
        if (winner === "x") return 1;
        if (winner === "o") return -1;
        if (isBoardFull(board_status_test)) return 0;
    
        if (is_maximising) {
            let best_score = -Infinity;
            for (let i = 0; i < board_status_test.length; i++) {
                if (board_status_test[i] == null) {
                    board_status_test[i] = 'x';
                    let score = miniMax(board_status_test, false);
                    board_status_test[i] = null;
                    best_score = Math.max(score, best_score);
                }
            }
            return best_score;
        } else {
            let best_score = Infinity;
            for (let i = 0; i < board_status_test.length; i++) {
                if (board_status_test[i] == null) {
                    board_status_test[i] = 'o';
                    let score = miniMax(board_status_test, true);
                    board_status_test[i] = null;
                    best_score = Math.min(score, best_score);
                }
            }
            return best_score;
        }
    }
    
    function bestMove() {
        let best_score = -Infinity;
        let move = -1;
        for (let i = 0; i < board_status.length; i++) {
            if (board_status[i] == null) {
                board_status[i] = 'x';
                let score = miniMax(board_status, false);
                board_status[i] = null;
                if (score > best_score) {
                    best_score = score;
                    move = i;
                }
            }
        }
        return move;
    }
    
    
}


