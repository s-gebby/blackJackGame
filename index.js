let age = 23;

if (age < 21) {
  console.log("You cannot play!");
} else {
  console.log("Welcome!");
}

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
    return 10;  // Face cards (J, Q, K) are valued at 10
  } else if (randomNumber === 1) {
    return 11;  // Ace is valued at 11
  } else {
    return randomNumber;  // 2-10 are valued at their face value
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

  if (sum < 21) {
      message = "Do you want to draw a new card?";
  } else if (sum === 21) {
      message = "Wohoo! You've got Blackjack! 🥳";
      hasBlackJack = true;
      dealerTurn(); // Let the dealer have a chance to draw as well
  } else if (sum > 21) { // Player goes bust
      message = "You're out of the game! 😭";
      isAlive = false;
      messageEl.textContent = message;
      return; // End the game immediately if the player busts
  }

  messageEl.textContent = message;

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

function hold() {
  if (isAlive && !hasBlackJack) {
    message = "You chose to hold. Dealer's turn.";
    messageEl.textContent = message;
    dealerTurn();
  }
}

function dealerTurn() {
  if (!isAlive) return; // Don't proceed with dealer's turn if player is already out

  // Dealer must hit if sum is below 17 
  while (dealerSum < 17) {
      let card = getRandomCard();
      dealerCards.push(card);
      dealerSum += card;
  }

  // Reveal dealer's full hand
  dealerEl.textContent = "Dealer's Cards: " + dealerCards.join(" ") + " (Sum: " + dealerSum + ")";

  determineWinner();
}

function determineWinner() {
  if (sum > 21) { // If player busts, they lose immediately
      message = "You're out of the game! 😭";
  } else if (dealerSum > 21 || (sum <= 21 && sum > dealerSum)) {
      message = "You win! 🥳";
  } else if (dealerSum === sum) {
      message = "It's a tie! 😐";
  } else {
      message = "Dealer wins! 😭";
  }

  isAlive = false; // End the game
  hasBlackJack = false;
  
  messageEl.textContent = message;
}

function toggleDirections() {
  directionsContainer = document.getElementById("directions-container");
  toggleButton = document.getElementById("toggle-directions");

  if (directionsContainer.style.display === "none") {
      directionsContainer.style.display = "block";
      toggleButton.textContent = "Hide Directions";
  } else {
      directionsContainer.style.display = "none";
      toggleButton.textContent = "Show Directions";
  }
}