// underscore is for items not to be used outside of its scope


// gameBoard is a Module 
const gameBoard = (() => {

    const _board = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
    
    console.log('gameBoard module runs!');
    const gameField = document.getElementById('game-field');

    _board.forEach((box) => {
        const boxElement = document.createElement('div');

        boxElement.classList.add('box');
        boxElement.textContent = box;
        gameField.appendChild(boxElement);
    })


    const place = (boxNum) => {
        if (_board[boxNum] === undefined) {
            _board[boxNum] = sign
            // Player.sign;
        };
    };
    
    const isOver = () => {
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
        
        const checkWinner = (field) => {
            _winConditions.some()
        };
        // when all spots !== undefined

        displayController.setMessage('The game is over.');
    };

    const clear = () => {
        for (let i = 0; i < _board.length; i++) {
            _board[i] = undefined;
        };
    };

    return { place, isOver, clear };
})();


// Player is a factory
const Player = (sign) => {
    //figure out how to make X and O signs

    const playSign = sign;

    return { playSign };
};

// displayController is a Module 
const displayController = (() => {
    const _boxElements = document.querySelectorAll('.box');
    const _restartButton = document.getElementById('restart');
    const _messageElement = document.getElementById('message');

    _boxElements.forEach(box => {
        box.addEventListener("click", (e) => {
            console.log('click');
            gameBoard.place(e.target.dataset.index);
        })
    });

    _restartButton.addEventListener("click", (e) => {
        gameBoard.clear();
        setMessage("Player X's turn!");
    });

    const setMessage = (message) => {
        _messageElement.textContent = message;
    };

})();

const gamePlay = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    const playNum = 0


    
    playNum % 2 === 1 ? playerX : playerO;

    


    if (playNum === 9) {
        // check winner
        // set tie message
    }

})();