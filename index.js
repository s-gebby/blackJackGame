let age = 23;

if (age < 21) {
  console.log("You cannot play!");
} else {
  console.log("Welcome!");
}

let player = {
  name: "Per",
  chips: 1000,
  bet: 0,
};

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let dealerCards = [];
let dealerSum = 0;
let message = "";

let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let dealerEl = document.getElementById("dealer-el");
let playerEl = document.getElementById("player-el");

playerEl.textContent = player.name + ": $" + player.chips;

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;
  if (randomNumber > 10) {
    return10;
  } else if (randomNumber === 1) {
    return11;
  } else {
    return randomNumber;
  }
}

function startGame() {
  isAlive = true;
  hasBlackJack = false;
  dealerCards = [];
  dealerSum = 0;

  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;

  let dealerFirstCard = getRandomCard();
  let dealerSecondCard = getRandomCard();
  dealerCards = [dealerFirstCard, dealerSecondCard];
  dealerSum = dealerFirstCard + dealerSecondCard;

  renderGame();
}

function renderGame() {
  cardsEl.textContent = "Your Cards: " + cards.join(" ");
  sumEl.textContent = "Your Sum: " + sum;

  dealerEl.textContent = "Dealer's Cards: " + dealerCards[0] + " ?";

  if (sum <= 20) {
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    message = "Wohoo! You've got Blackjack! 🥳";
    hasBlackJack = true;
    dealerTurn(); // Let the dealer have a chance to draw as well
  } else {
    message = "You're out of the game! 😭";
    isAlive = false;
    dealerTurn(); // Let the dealer draw cards and determine the winner
  }

  messageEl.textContent = message;
  playerEl.textContent = `${player.name}: $${player.chips}`;
}

function newCard() {
  if (isAlive && !hasBlackJack) {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
}

function placeBet(amount) {
  if (amount <= player.chips && amount > 0) {
    player.bet = amount;
    player.chips -= amount;
    playerEl.textContent = `${player.name}: $${player.chips}`;
    messageEl.textContent = `You placed a bet of $${player.bet}. Good Luck!`
  } else {
    messageEl.textContent = "You don't have enough chips for that bet!"
  }
}

function startGameWithBet() {
  let betAmount = parseInt(document.getElementById("bet-amount").value);
  placeBet(betAmount);
  if (player.bet > 0) {
    startGame();
  }
}

function hold() {
  if (isAlive && !hasBlackJack) {
    message = "You chose to hold. Dealer's turn.";
    messageEl.textContent = message;
    dealerTurn();
  }
}

function dealerTurn() {
    // Dealer must hit if sum is below 17 
        while (dealerSum < 17) {
        let card = getRandomCard();
        dealerCards.push(card);
        dealerSum += card;
    }

    // Reveal dealer's full hand
    dealerEl.textContent = "Dealer's Cards: " + dealerCards.join(" ") + " (Sum: " + dealerSum + ")";

}

function determineWinner() {
    if (dealerSum > 21 || (sum <= 21 && sum > dealerSum)) {
        message = "You win! 🥳";
        player.chips += player.bet * 2; // Player wins the bet
    } else if (dealerSum === sum) {
        message = "It's a tie! 😐";
        player.chips += player.bet; // Return the bet
    } else {
        message = "Dealer wins! 😭";
    }

    player.bet = 0; // Reset the bet
    isAlive = false; // End the game
    hasBlackJack = false;
    
    playerEl.textContent = `${player.name}: $${player.chips}`;
    messageEl.textContent = message;
}
