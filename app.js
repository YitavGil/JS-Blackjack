let messageEL = document.getElementById("message-el");
let playerSum = document.getElementById("player-sum");
let dealerSum = document.getElementById("dealer-sum");
let playerCards = document.getElementById("player-cards");
let dealerCards = document.getElementById("dealer-cards");
const startBtn = document.getElementById("start");
const stayBtn = document.getElementById("stay");
const hitBtn = document.getElementById("hit");
const playerWin = document.getElementById("wins")
const playerlose = document.getElementById("loses")
const playerDraw = document.getElementById("draws")
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let blackJack = false;
let playerAlive = false;
let dealerAlive = false;
let message = "";
let win = 0;
let lose = 0;
let draw = 0;

const getRandomCards = () => {
    let randomNumber = Math.floor(Math.random()*13) +1
    if(randomNumber > 10) {
        return 10
    }
    else if (randomNumber === 1){
        return 11;
    }
    else {
        return randomNumber
    }
}

startBtn.addEventListener("click", () =>{
    playerAlive = true;
    dealerAlive = true;
    let firstCard = getRandomCards();
    let secondCard = getRandomCards();
    let thirdCard = getRandomCards();
    let fourthCard = getRandomCards();
    playerHand = [firstCard, secondCard];
    dealerHand = [thirdCard, fourthCard];
    playerScore = firstCard + secondCard
    dealerScore = thirdCard + fourthCard
    renderGame()
})

const renderGame = () => {
    playerCards.textContent = "Cards: ";
    for (let i = 0; i<playerHand.length; i++) {
        playerCards.textContent += playerHand[i] + " "
    }
    dealerCards.textContent = "Cards: ";
    for (let i = 0; i<dealerHand.length; i++) {
        dealerCards.textContent += dealerHand[i] + " "
    }

    playerSum.textContent = "Sum: " + playerScore;
    dealerSum.textContent = "Sum: " + dealerScore;
    message = "Do you want to draw another card?";
    messageEL.textContent = message;
    playerWin.textContent = "Wins: " + win;
    playerlose.textContent = "Losses: " + lose;
    playerDraw.textContent = "Draws: " + draw;
}

hitBtn.addEventListener("click", () => {
    if(playerAlive === true && blackJack === false){
        let card = getRandomCards();
        playerScore += card;
        playerHand.push(card);
        renderGame();
        gameState();
       
        
    }
})

stayBtn.addEventListener("click", () => {
   if(dealerScore < 16) {
        let card = getRandomCards();
        dealerScore += card;
        dealerHand.push(card);
   }

   if(dealerScore > playerScore && dealerScore < 22 ) {
        messageEL.style.color = "darkred";
        message = "Dealer won the game!";
   }
})


const gameState = () => {
    if(playerScore > 21) {
        messageEL.style.color = "darkred";
        message = "Dealer won the game!";
        playerAlive = false;
        lose++;
        

    }
    else if(playerScore === 21 && dealerScore !== 21) {
        messageEL.style.color = "goldenrod";
        message = "BlackJack! You Win!!!";
        blackJack = true;
        win++;
    }

    else if (playerScore === 21 && dealerScore === 21 ) {
        message = "Match ended in a draw";
        playerAlive = false;
    }

    else{
        message = "Do you want to draw another card?"
    }
    messageEL.textContent = message
}

