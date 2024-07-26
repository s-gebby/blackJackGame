// Initial Popup checking to see if you are of age to gamble
let age = 23;

if (age < 21) {
  console.log("You cannot play!");
} else {
  console.log("Welcome!");
}

// BlackJack game equations
let firstCard = 6;
let secondCard = 9;
let sum = firstCard + secondCard;
let hasBlackJack = false;

if (sum <= 20) {
  console.log("Do you want to draw a new card?");
} else if (sum === 21) {
  console.log("Blackjack!");
  hasBlackJack = true;
} else {
  console.log("You're out of the game!");
}
