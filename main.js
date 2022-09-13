// underscore is for items not to be used outside of its scope
// second parameter of i (index) comes with forEach method, just gotta pass it through
// board.map() is similar to the original board.forEach() in that it creates all the divs, but this also stores the div elements into the new _boxElements array with 'return' boxElement as the items
// Player is a factory..... don't need?

// TO DO IN FUTURE: CREATE AN AI - so player can play against the computer

// gameBoard is a Module 
const gameBoard = (() => {

    const board = ['', '', '', '', '', '', '', '', ''];
    const gameField = document.getElementById('game-field');

    const _boxElements = board.map((box, i) => {
        const boxElement = document.createElement('div');
        boxElement.classList.add('box');
        boxElement.textContent = box;
        boxElement.setAttribute('value', i); // need for place(boxNum)
        gameField.appendChild(boxElement);

        return boxElement;
    });


    const place = (boxNum) => {

        if (board[boxNum] === '') {
            const playSign = gamePlay.playerTurn();
            
            if (playSign === 'X') {
                displayController.setMessage("Player O's turn!");
            } else if (playSign === 'O') {
                displayController.setMessage("Player X's turn!");
            };

            board[boxNum] = playSign;
            _boxElements[boxNum].textContent = playSign;
        };
    };
    

    const clear = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
            _boxElements[i].textContent = '';
        };
    };

    return { board, place, clear };
})();



// const Player = () => {
// };

// displayController is a Module 
const displayController = (() => {
    const _boxElements = Array.from(document.querySelectorAll('.box'));
    const _gameField = document.getElementById('game-field');
    const _restartButton = document.getElementById('restart');
    const _messageElement = document.getElementById('message');

    _boxElements.forEach(box => {
        box.addEventListener("click", (e) => {
            if (gamePlay.getgameOver()) return;
            gameBoard.place(e.target.attributes.value.value);
            gamePlay.isOver();
        })
    });


    _restartButton.addEventListener("click", (e) => {
        gameBoard.clear();
        gamePlay.reset();
    });

    const displayWinner = () => {
        const xPlaces = gameBoard.board.filter(box => box === 'X');
        const oPlaces = gameBoard.board.filter(box => box === 'O');
        
        if (xPlaces.length > oPlaces.length) {
            displayController.setMessage('Player X wins! To play again, press restart.');
        } else {
            displayController.setMessage('Player O wins! To play again, press restart.');
        };
    };

    const setMessage = (message) => {
        _messageElement.textContent = message;
    };

    return { displayWinner, setMessage };

})();

const gamePlay = (() => {
    const playerX = "X";
    const playerO = "O";
    let playNum = 0;
    let gameOver = false;
    // let lastPlayer = 'X'

    const _winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]; 

    const playerTurn = () => {
        playNum++;
        return playNum % 2 === 1 ? playerX : playerO;
        // lastPlayer = lastPlayer === 'X' ? 'O' : 'X'
    };

    const reset = () => {
        displayController.setMessage("Player X's turn!");
        setgameOver();
        playNum = 0;
    };

    const getgameOver = () => {
        return gameOver
    };

    const setgameOver = () => {
        gameOver = false;
    };

    const isOver = () => {


        if (gameBoard.board.every(box => box !== '')) {
            displayController.setMessage('Tie! To play again, press restart.');
            return;
        };

        // should use array.some here to make more readable

        

        for (let i = 0; i < _winConditions.length; i++) {    
            if (gameBoard.board[_winConditions[i][0]] !== '') {

                if (gameBoard.board[_winConditions[i][1]] === gameBoard.board[_winConditions[i][0]] && 
                    gameBoard.board[_winConditions[i][2]] === gameBoard.board[_winConditions[i][0]]) {
                        displayController.displayWinner();
                        gameOver = true;
                };
            };
        };
    };

    return { reset, playerTurn, getgameOver, setgameOver, isOver };

})();