// TO DO
// Message content in html


// gameBoard is a Module 
const gameBoard = (() => {
    // makes an Array with 9 empty slots
    // underscore is for items not to be used outside of its scope

    const _board = new Array(9);

    const place = (boxNum, sign) => {
        if (_board[boxNum] === undefined) {
            _board[boxNum] = sign;
        };
    };
    
    const isOver = () => {
        // when winning conditions met, or
        // when all spots !== undefined
        displayController.setMessage('The game is over.');
    };

    const clear = () => {
        for (let i = 0; i < _board.length; i++) {
            _board[i] = undefined;
        };
    };

    return { setBoxNum, place, isOver, clear };
})();


// Player is a factory
const Player = () => {
    const name = document.getElementById('name').value;
    //figure out how to make X and O signs
    const sign = 'X';

    return { name, sign };
};

const displayController = (() => {
    const _boxElements = document.querySelectorAll('.box');
    const _restartButton = document.getElementById('restart');
    const _messageElement = document.getElementById('message');
 
    const _sign = Player.sign;

    _boxElements.forEach((box) =>
        box.addEventListener("click", (e) => {
                gameBoard.place(e.target.dataset.index, _sign);
        })
    );

    _restartButton.addEventListener("click", (e) => {
        gameBoard.clear();
        setMessage("Player X's turn!");
    });

    const setMessage = (message) => {
        _messageElement.textContent = message;
    };

    return { setMessage };

})();