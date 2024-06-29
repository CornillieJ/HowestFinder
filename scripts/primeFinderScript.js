/* eslint-disable no-undef */
'use strict';

let allTds;
let primeTds = [];
let amountOfPrimes = 0;
let tries = 0;
let primeScore;
let primeTotal;

// #region //? main code
/**
 * Code to run when window is loaded
 */
const initialize = () => {
  allTds = document.querySelectorAll('td');
  [primeScore, primeTotal] = getScores();
  loadPrimes();
  addEvents();
};
/**
 * The main logic of the game to run on clicking a prime
 */
const runGameLogic = function () {
  if (isNotFirstClick(this)) return;
  tries++;
  if (amountOfPrimes) {
    decideIfClickedIsPrime(this);
    decideIfWin();
  }
};
// #endregion //? main code

// #region //*Adding event handlers
window.addEventListener('load', initialize);
document.addEventListener('keydown', resetOnR);
window.addEventListener('beforeunload', setScores);
// #endregion //*Adding event handlers

// #region //*Functions for adding event handlers
/**
 * Adds a click event to each td to run the main game logic
 */
function addEvents() {
  allTds.forEach((td) => {
    td.addEventListener('click', runGameLogic);
  });
}
// #endregion //*Functions for adding event handlers

// #region //! functions
/**
 * Resets the game on pressing the R key
 */
function resetOnR(e) {
  if (e.key === 'r' || e.key === 'R') {
    reset();
    loadPrimes();
  }
}
/**
 * function to check if a number is prime
 * @param {Number} number The number to check if it is prime
 * @returns true if prime, otherwise false
 */
function isPrime(number) {
  if (number < 4) return true;
  for (let i = 2; i <= number / 2; i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
}
/**
 * Writes the node to the global primTds array
 * @param {Node} td the node to be kept
 */
function rememberPrime(td) {
  primeTds.push(td);
}
/**
 * Update the prime count text to show the amount of primes
 */
function updatePrimeCount() {
  const primeCount = document.querySelector('.prime-count');
  primeCount.innerText = `Aantal priemgetallen ${amountOfPrimes}`;
}
/**
 * Adds the 'clicked' class to the node if not first click
 * @param {Node} td  the node that you want to add the class to
 * @returns false if it was the first click, otherwise true
 */
function isNotFirstClick(td) {
  if (td.classList.contains('clicked')) return true;
  else td.classList.add('clicked');
  return false;
}
/**
 * Checks if node is present in primeTds array. If so, adds 'prime' class and reduces the amount of primes
 * Else adds 'wrong' class
 * @param {Node} td the node to check
 */
function decideIfClickedIsPrime(td) {
  if (primeTds.includes(td)) {
    td.classList.add('prime');
    amountOfPrimes--;
    updatePrimeCount();
  } else {
    td.classList.add('wrong');
  }
}
/**
 * Checks if amount of primes is 0. If so, increase global score and show the win situatiation
 */
function decideIfWin() {
  if (!amountOfPrimes) {
    increaseScore();
    showWinSituation(tries);
  }
}
/**
 * loads random primes in all the Tds in global allTds
 */
function loadPrimes() {
  const allRandoms = [];
  resetPrimes();
  while (amountOfPrimes === 0) {
    allTds.forEach((td) => {
      const random = getUniqueRandom(allRandoms);
      allRandoms.push(random);
      td.innerText = random;
      if (isPrime(random)) {
        amountOfPrimes++;
        rememberPrime(td);
      }
      updatePrimeCount();
    });
  }
  increaseTotalTries();
}
/**
 * Gets a unique random that is not present yet in the allRandoms array
 * @param {Array} allRandoms array containing all already existing primes
 * @returns the new random number
 */
function getUniqueRandom(allRandoms) {
  let random;
  do {
    random = getRandom(1, 100);
  } while (allRandoms.includes(random));
  return random;
}
/**
 * Reset the Prime statistics (amount of Primes and primeTds array )
 */
function resetPrimes() {
  amountOfPrimes = 0;
  primeTds = [];
}
/**
 * Removes the classes 'wrong' 'prime' and 'clicked' in each node in the allTds array
 */
function reset() {
  tries = 0;
  allTds.forEach((td) => {
    td.classList.remove('wrong');
    td.classList.remove('prime');
    td.classList.remove('clicked');
  });
}
/**
 * Increase primeScore by 1
 */
function increaseScore() {
  primeScore++;
}
/**
 * Increase global total tries for the prime game by 1
 */
function increaseTotalTries() {
  primeTotal++;
}
/**
 * Reads the score and total for the prime game from session storage
 * @returns array containing the score and the total
 */
function getScores() {
  let primeScore = sessionStorage.getItem('primeScore');
  let primeTotal = sessionStorage.getItem('primeTotal');
  if (!Number(primeScore)) primeScore = 0;
  if (!Number(primeTotal)) primeTotal = 0;
  return [primeScore, primeTotal];
}
/**
 * Writes the new score and total for the prime game to the session storage
 */
function setScores() {
  sessionStorage.setItem('primeScore', primeScore);
  sessionStorage.setItem('primeTotal', primeTotal);
}
// #endregion //! functions
