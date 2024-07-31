// Initial Popup checking to see if you are of age to gamble
let age = 23;

if (age < 21) {
  console.log("You cannot play!");
} else {
  console.log("Welcome!");
}

// BlackJack game equations
let firstCard = 10;
let secondCard = 11;
let sum = firstCard + secondCard + 4;
let hasBlackJack = false;
let isAlive = true;

function startGame() {
  if (sum <= 20) {
    console.log("Do you want to draw a new card? 🙂");
  } else if (sum === 21) {
    console.log("Wohoo! You've got Blackjack! 🥳");
    hasBlackJack = true;
  } else {
    console.log("You're out of the game! 😭");
    isAlive = false;
  }
}

console.log(isAlive);
