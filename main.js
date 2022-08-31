// underscore is for items not to be used outside of its scope
// second parameter of i (index) comes with forEach method, just gotta pass it through


// gameBoard is a Module 
const gameBoard = (() => {

    const board = ['', '', '', '', '', '', '', '', ''];
    const gameField = document.getElementById('game-field');

    // board.map() is similar to the original board.forEach() in that it creates all the divs, but this also stores the div elements into the new _boxElements array with 'return' boxElement as the items
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
                displayController.setMessage("Player O's turn!")
            } else if (playSign === 'O') {
                displayController.setMessage("Player X's turn!")
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


// Player is a factory..... don't need?
// const Player = () => {
//     const playSign = gamePlay.playerTurn();
//     return { playSign };
// };

// displayController is a Module 
const displayController = (() => {
    const _boxElements = Array.from(document.querySelectorAll('.box'));
    const _restartButton = document.getElementById('restart');
    const _messageElement = document.getElementById('message');

    _boxElements.forEach(box => {
        box.addEventListener("click", (e) => {
            gameBoard.place(e.target.attributes.value.value);
            gamePlay.isOver();
        })
    });

    _restartButton.addEventListener("click", (e) => {
        gameBoard.clear();
        gamePlay.reset();
    });

    const setMessage = (message) => {
        _messageElement.textContent = message;
    };

    return { setMessage }

})();

const gamePlay = (() => {
    const playerX = "X";
    const playerO = "O";
    let playNum = 0;
    let gameOver = false;

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

    // const _winConditions = [[0, 1, 2], [3, 4, 5]]

    const playerTurn = () => {
        playNum++;
        return playNum % 2 === 1 ? playerX : playerO;
    };

    const reset = () => {
        displayController.setMessage("Player X's turn!");
        return playNum = 0;
    };

    const isOver = () => {

        // for (let i = 0; i < _winConditions.length; i++) {
        //     // console.log(gameBoard.board[_winConditions[i]])

        //     if (gameBoard.board[_winConditions[i]] !== '') {
        //         // console.log('boxes marked')

        //         if (gameBoard.board[_winConditions[1]] === gameBoard.board[_winConditions[0]] && 
        //             gameBoard.board[_winConditions[2]] === gameBoard.board[_winConditions[0]]) {
        //                 displayController.setMessage('Game Over! To play again, press restart.')

        //         } else if (gameBoard.board.every(box => box !== '')) {
        //             displayController.setMessage('Tie! To play again, press restart.');
             
        //         }
        //     }
        // }


        for (let i = 0; i < _winConditions.length; i++) {    
            for (let j = 0; j < _winConditions[i].length; j++) {
                // console.log(gameBoard.board[_winConditions[i]])

                if (gameBoard.board[_winConditions[i][j]] !== '') {
                    // console.log('boxes marked')

                    if (gameBoard.board[_winConditions[i][1]] === gameBoard.board[_winConditions[i][0]] && 
                        gameBoard.board[_winConditions[i][2]] === gameBoard.board[_winConditions[i][0]]) {
                            displayController.setMessage('Game Over! To play again, press restart.')

                    } else if (gameBoard.board.every(box => box !== '')) {
                        displayController.setMessage('Tie! To play again, press restart.');
                
                    }
                }
            }
        }

    };

    // && gameBoard.board[_winConditions[i][2]] === gameBoard.board[_winConditions[i][0]]

    // if (gameBoard.board[_winConditions[j][1]] === gameBoard.board[_winConditions[j][0]] && 
    //     gameBoard.board[_winConditions[j][2]] === gameBoard.board[_winConditions[j][0]]) {
    //         return console.log('winner found');
    // } else {
    //     return console.log('winner not found');
    // }

    if (gameOver === true) {
        displayController.setMessage('The game is over. To play again, press restart.')
    };

    return { reset, playerTurn, isOver }

})();