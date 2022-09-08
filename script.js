var board = [];
var currentGame = [1,2,3,4,5,6];
var savedGame = [];

var state = { board: [], currentGame: [], savedGames: []};

function start() {
    createBoard();
    newGame();
}

function createBoard() {
    state.board = []

    for (var i = 1; i<= 60; i++) {
        state.board.push(i)
    }
}

function newGame() {
    resetGame();
    render();

    console.log("New game started");
}

function render() {
    renderBoard();
    renderButtons();
    renderSavedGames();
}

function renderBoard() {
    var divBoard = document.querySelector(".megasena-board");
    divBoard.innerHTML = "";

    var ulNumbers = document.createElement("ul");

    for (var i = 0; i< state.board.length; i++) {
        var currentNumber = state.board[i];

        var liNumber = document.createElement("li");
        liNumber.textContent = currentNumber;

        liNumber.addEventListener("click", handleNumberClick);

        ulNumbers.appendChild(liNumber);
    }

    divBoard.appendChild(ulNumbers);
}

function handleNumberClick(event) {
    var value = Number(event.currentTarget.textContent);

    if (isNumberInGame(value)) {
        removeNumberFromGame(value);
    } else {
        addNumber(value);
    }
    console.log(state.currentGame)
}

function renderButtons() {
    var divButtons = document.querySelector(".megasena-buttons");
    divButtons.innerHTML = "";

    var buttonNewGame = createNewGameButton();
    var buttonRandomGame = createRandomGameButton();
    var buttonSaveGame = createSaveGameButton();

    divButtons.appendChild(buttonNewGame);
    divButtons.appendChild(buttonRandomGame);
    divButtons.appendChild(buttonSaveGame);
}

function createNewGameButton() {
    var button = document.createElement("button");
    button.textContent = "New Game";
    button.addEventListener("click", newGame);
    return button;
}

function createRandomGameButton() {
    var button = document.createElement("button");
    button.textContent = "Random Game";
    button.addEventListener("click", randomGame);
    return button;
}

function createSaveGameButton() {
    var button = document.createElement("button");
    button.textContent = "Save Game";
    button.addEventListener("click", saveGame);
    return button;
}

function renderSavedGames() {}

function addNumber(numberToAdd) {
    if (numberToAdd < 1 || numberToAdd > 60) {
        console.error("Invalid number", numberToAdd);
        return;
    }

    if (state.currentGame.length >=6) {
        console.error("The game is complete");
        return;
    }
    if (isNumberInGame(numberToAdd)){
        console.error("This number is already in the game", numberToAdd);
        return;
    }
    
    state.currentGame.push(numberToAdd);
}

function isNumberInGame(numberTocheck) {
    return (state.currentGame.includes(numberTocheck))
}

function removeNumberFromGame(numberToRemove) {
    var newGame = []
    if (numberToRemove < 1 || numberToRemove > 60) {
        console.error("Invalid number", numberToRemove);
        return;
    }
    for (var i = 0; i < state.currentGame.length; i++) {
        var currentNumber = state.currentGame[i]

        if (currentNumber === numberToRemove) {
            continue;
        }
        newGame.push(currentNumber);
    }
    state.currentGame = newGame;
}

function saveGame() {
    if(!isGameComplete()) {
        console.error("Game is not complete");
        return;
    }
    state.savedGames.push(state.currentGame)
    newGame();
    console.log(state.savedGames);
}

function isGameComplete() {
    return state.currentGame.length === 6;
}

function resetGame() {
    state.currentGame = [];
}

function randomGame() {
    resetGame();

    while(!isGameComplete()) {
        var randomNumber = Math.ceil(Math.random() * 60);
        addNumber(randomNumber);  
    }
    console.log(state.currentGame);
}

start();
