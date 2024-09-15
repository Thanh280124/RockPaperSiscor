const rockBtn = document.querySelector('.js-rock-button');
const paperBtn = document.querySelector('.js-paper-button');
const scissorsBtn = document.querySelector('.js-sis-button');
const iconResult =document.querySelector('.js-move');  
const resultMatch = document.querySelector('.js-result');
const scoreUpdate =   document.querySelector('.js-score');
const autoPlayBtn =document.querySelector('.autoplay');


let score = JSON.parse(localStorage.getItem('score'))
if(!score){
  score = {
               win: 0,
               lose: 0,
               draw : 0,
          };
}

updateScore();
rockBtn.addEventListener('click', () => {
  playerGame('rock');
})

paperBtn.addEventListener('click', () => {
  playerGame('paper');
})

scissorsBtn.addEventListener('click', () => {
  playerGame('scissors');
})

autoPlayBtn.addEventListener('click',autoPlay);
 
let isAutoplay = false;
let intervalId;

function autoPlay(){
if(!isAutoplay){
  intervalId = setInterval(()=>{
    const computeAutoMove = computerMove();
    playerGame(computeAutoMove);
   updateScore();
  },2000)
  isAutoplay = true;
  autoPlayBtn.innerHTML = 'Stop play'
}else{
  clearInterval(intervalId);
  isAutoplay = false;
   autoPlayBtn.innerHTML = 'Auto play'
   resultMatch.innerHTML = '';
   iconResult.innerHTML = '';
}
}

document.body.addEventListener('keydown',(e) =>{
 if(e.key === 'r'){
  playerGame('rock');
 }else if(e.key === 'p'){
  playerGame('paper')
 }else if(e.key === 's'){
  playerGame('scissors')
 }
})

function playerGame(playerMove) {
  const computerMoveResult = computerMove();
  let result = '';

  if (playerMove === 'rock') {
    if (computerMoveResult === 'rock') {
      result = "It's a tie";
    } else if (computerMoveResult === 'paper') {
      result = "You Lose";
    } else if (computerMoveResult === 'scissors') {
      result = "You Win";
    }
  }

  if (playerMove === 'paper') {
    if (computerMoveResult === 'rock') {
      result = "You Win";
    } else if (computerMoveResult === 'paper') {
      result = "It's a tie";
    } else if (computerMoveResult === 'scissors') {
      result = "You Lose";
    }
  }

  if (playerMove === 'scissors') {
    if (computerMoveResult === 'rock') {
      result = "You Lose";
    } else if (computerMoveResult === 'paper') {
      result = "You Win";
    } else if (computerMoveResult === 'scissors') {
      result = "It's a tie";
    }
  }
 
if(result === "You Win"){
  score.win++;
}else if(result === "You Lose"){
  score.lose++
}else if(result === "It's a tie"){
  score.draw++;
}

updateScore();
localStorage.setItem('score',JSON.stringify(score));

   resultMatch.innerHTML = result;
  iconResult.innerHTML = `You 
    <img src="images/${playerMove}-emoji.png" alt="" class="rock-emojo"> 
    <img src="images/${computerMoveResult}-emoji.png" alt="" class="rock-emojo"> Computer`;
}

function computerMove() {
  const computerGuess = Math.random();
  let computerResult = '';

  if (computerGuess >= 0 && computerGuess < 1/3) {
    computerResult = 'rock';
  } else if (computerGuess >= 1/3 && computerGuess < 2/3) {
    computerResult = 'paper';
  } else {
    computerResult = 'scissors';
  }

  return computerResult;
}

function updateScore(){
  scoreUpdate.innerHTML=`Win:${score.win} Lose:${score.lose} Draw :${score.draw}` 
}


