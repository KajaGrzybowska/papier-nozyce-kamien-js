// // scripts.js - papier, nożyce kamień


// wyszukuje element z tą klasą
var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame); // funkcja newGame jest zdefiniowana niżej

// jeśli U wybrał papier \ nożyce \ kamień, to... 
var pickRock = document.getElementById('js-playerPick_rock'), //przypisujemy do ID
    pickPaper = document.getElementById('js-playerPick_paper'), 
    pickScissors = document.getElementById('js-playerPick_scissors'); 


pickRock.addEventListener('click', function() { //po wybraniu określonego ID, rusza funkcja - playerPickk
   playerPick('rock') 
}); 

pickPaper.addEventListener('click', function() { 
   playerPick('paper') 
});

pickScissors.addEventListener('click', function() { 
   playerPick('scissors') 
});

// wartości początkowe (ekran startowy)
var gameState = 'notStarted', //started // ended
   player = {
      name: '', 
      score: 0
 },
   computer = {
      score: 0
 };

// aktywują poszczególne etapy
var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
   switch(gameState) {
      case 'started':
         newGameElem.style.display = 'none';
         pickElem.style.display = 'block';
         resultsElem.style.display = 'block';
      break;
   case 'ended':
         newGameBtn.innerText = 'Jeszcze raz';
   case 'notStarted':
   default:
         newGameElem.style.display = 'block';
         pickElem.style.display = 'none';
         resultsElem.style.display = 'none';
  }
}

setGameElements(''); 
console.log(setGameElements)

// NEW GAME

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

// imię gracza 
function newGame() {
   player.name = prompt('Please enter your name', 'imię gracza');
   if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints(); 
  }
}

// wybór gracza
function playerPick(playerPick) {
   console.log(playerPick);
}

// "wybór" komputera (sposób na generowanie losowych zmiennych)
function getComputerPick() {
   var possiblePicks = ['rock', 'paper', 'scissors'];
   return possiblePicks[Math.floor(Math.random()*3)];
}

//wyszukujemy elementy
var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');


function checkRoundWinner(playerPick, computerPick) {
  // playerResultElem.innerHTML = computerResultElem.innerHTML = ''; 
  // dopisałam poniżej info o remisie  (draw) i przegranej (lost). Czy mogę więc ten powyższy fragment usunąć?

  var winnerIs = 'player';

    if (playerPick == computerPick) {

        winnerIs = 'none'; // remis
        
        playerResultElem.innerHTML = "Draw";
        computerResultElem.innerHTML = "Draw";
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {
        
        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        computerResultElem.innerHTML = "Lose";
        player.score++;

    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        playerResultElem.innerHTML = "Lose"
        computer.score++;
    }

    scoreCheck(); // w każdej rundzie liczy punkty, musi być wywoływana w funkcji-rundzie
}




function playerPick(playerPick) {
   var computerPick = getComputerPick();
    
   playerPickElem.innerHTML = playerPick;
   computerPickElem.innerHTML = computerPick;
   checkRoundWinner(playerPick, computerPick);
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function scoreCheck() {
	if(player.score == 3) {
		alert('You win!');
		gameState = 'ended';
		setGameElements()

	} else if (computer.score == 3) {
		alert('You lost');
		gameState = 'ended';
		setGameElements()
	}
}
