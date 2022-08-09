//var board = []

//var currentGame = [1, 5, 11, 13, 15, 17];
//var savedGames = []

var state = {board: [], currentGame: [], savedGames: []};

function start () {
    readLocalStorage();
    createBoard();
    newGame();
}


function readLocalStorage() {
    if (!window.localStorage) {
      return;
    }
  
    var savedGames = window.localStorage.getItem('saved-games');
  
    if (savedGames) {
      state.savedGames = JSON.parse(savedGames);
    }
  }
  
  function writeLocalStorage() {
    window.localStorage.setItem('saved-games', JSON.stringify(state.savedGames));
  }
  
function createBoard () {
    state.board = [];

    for (var i = 1; i <= 60; i++) {
        state.board.push(i);
    }
}

function newGame () {
    resetGame();
    render();

    console.log(state.currentGame);
}

function render () {
    renderBoard ();
    renderButtons();
    renderSavedGames();
}

function renderBoard() {
    var divBoard = document.querySelector('#megasena-board');
    divBoard.innerHTML = '';

    var ulNumbers = document.createElement('ul');
    ulNumbers.classList.add('numbers');

    for (var i = 0; i < state.board.length; i++) {
        var currentNumber = state.board[i];

        var liNumber = document.createElement('li');
        liNumber.textContent = currentNumber;
        liNumber.classList.add('number');

        liNumber.addEventListener('click', handleNumberClick);

            if (isNumberInGame(currentNumber)) {
                liNumber.classList.add('selected-number')
            }

        ulNumbers.appendChild(liNumber);
    }

    divBoard.appendChild(ulNumbers);
}

function handleNumberClick(event) {
    var value = Number(event.currentTarget.textContent);
    
    if(isNumberInGame(value)) {
        removeNumberFromGame(value);
    } else {
        addNumberToGame(value);
    }

    console.log(state.currentGame);
    render();
}

function renderButtons () {
    var divButtons = document.querySelector('#megasena-buttons');
    divButtons.innerHTML = '';

    var buttonNewGame = createNewGameButton ();
    var buttonRandomGame = createRandomGameButton();
    var buttonSaveGame = createSaveGameButton();

    divButtons.appendChild(buttonNewGame);
    divButtons.appendChild(buttonRandomGame);
    divButtons.appendChild(buttonSaveGame);
}

function createNewGameButton() {
    var button = document.createElement('button');
    button.textContent = 'Novo Jogo';

    button.addEventListener('click', newGame);
    return button;
}

function createRandomGameButton() {
    var button = document.createElement('button');
    button.textContent = 'Jogo Aleatório';

    button.addEventListener('click', randomGame);
    return button;
}


function createSaveGameButton() {
    var button = document.createElement('button');
    button.textContent = 'Salvar Jogo';
    button.disabled = !isGameComplete();

    button.addEventListener('click', saveGame);
    return button;
}

function renderSavedGames () {
     var divSavedGames = document.querySelector('#megasena-saved-games');
     divSavedGames.innerHTML = '';

     if (state.savedGames.length === 0) {
        divSavedGames.innerHTML = '<p>Nenhum Jogo Salvo</p>';
     } else {
        var ulSavedGames = document.createElement('ul');

        for (var i = 0; i < state.savedGames.length; i++) {
            var currentGame = state.savedGames[i];

            var liGame = document.createElement('li');
            liGame.textContent = currentGame.join(', ');

            ulSavedGames.appendChild(liGame);
        }
        divSavedGames.appendChild(ulSavedGames);
     }
}
    // addNumberToGame(1);
    // addNumberToGame(2);
    // addNumberToGame(3);
    // addNumberToGame(4);
    // addNumberToGame(5);
    // saveGame();
    // addNumberToGame(6);

    // saveGame();
    // saveGame();//salvar mais de uma vez

    // addNumberToGame(30);//o jogo já está completo
    // //removeNumberFromGame(5);

    // console.log(state.currentGame);
    // console.log(state.savedGames)

    // resetGame();
    // console.log(state.currentGame);

function addNumberToGame(numberToAdd) {
    if (numberToAdd < 1 || numberToAdd > 60) {
        //console.error('Número Inválido', numberToAdd); 
        return;
    }

    if (state.currentGame.length >= 6) {
        //console.error('O Jogo já está completo!')
        return;
    }

    if (isNumberInGame(numberToAdd)) {
        //console.error('O número já está no jogo.', numberToAdd);
        return
    }

    state.currentGame.push(numberToAdd);
}

    function removeNumberFromGame(numberToRemove) {
        if (numberToRemove < 1 || numberToRemove > 60) {
            console.error('Número Inválido', numberToRemove);
        }
        
        var newGame = []

        for (var i = 0; i < state.currentGame.length; i++) {
            var currentNumber = state.currentGame[i]

            if (currentNumber === numberToRemove) {
                continue;
            }
            newGame.push(currentNumber);
        }
        state.currentGame = newGame;
    }

    function isNumberInGame(numberToCheck) {
        // if (state.currentGame.includes(numberToCheck)) {
        //     return true;
        // }
        // return false;

        return state.currentGame.includes(numberToCheck);
    }

    function saveGame () {
        if (!isGameComplete()) {
            console.error('O jogo não está completo');
            return;
        }
        state.savedGames.push(state.currentGame);
        newGame();

        console.log(state.savedGames)
    }

    function isGameComplete() {
        return state.currentGame.length === 6;
    }

    function resetGame () {
        state.currentGame = [];
    }

    function randomGame() {
        resetGame();

    while (!isGameComplete()){
        var randomNumber = Math.ceil(Math.random() * 60);

        addNumberToGame(randomNumber);
       }

       render();
    }

start();