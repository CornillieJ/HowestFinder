/* eslint-disable no-undef */
'use strict';
const TotalAmountOfTries = 5;
let inputBox;
let playField;
let tries = TotalAmountOfTries;
let allTds = [];
let table;
let logoScore;
let logoTotal;

// #region //? main code
/**
 * Code to run when window is loaded
 */
const initialize = () => {
  inputBox = document.getElementById('box-amount');
  playField = document.querySelector('.play-field');
  [logoScore, logoTotal] = getScores();
  addInputBoxEvent();
  inputBox.select();
  showTries();
};
/**
 * The main logic of the game to run on clicking a prime
 */
const runGameLogic = function () {
  if (isNotFirstClick(this)) return;
  if (tries === 0) return;
  if (isHiddenLogo(this)) {
    increaseScore();
    showLogoOnWin(this);
    showWinSituation(TotalAmountOfTries - tries + 1);
  } else {
    changeColorToRed(this);
  }
  updateTries();
  checkIfLost();
};
// #endregion //? main code

// #region //* Adding event handlers
window.addEventListener('load', initialize);
window.addEventListener('beforeunload', setScores);
// #endregion //* Adding event handlers

// #region //* Functions for adding event handlers
/**
 * Adds a click event to each td to run the main game logic
 */
function addEvents() {
  allTds.forEach((td) => {
    td.addEventListener('click', runGameLogic);
  });
}
/**
 * Adds the event listener on the input Box to start the game on pressing "Enter"
 */
function addInputBoxEvent() {
  inputBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      generatePlayField();
    }
  });
}
/**
 * Add the reset on Enter event handler to the window
 * only adds the event after a small delay to debounce the enter key
 */
function addResetOnEnterEventAfterDelay() {
  setTimeout(() => {
    window.addEventListener('keydown', resetOnEnter);
  }, 200);
}
/**
 * Remove the Reset on enter eventer handler from the window
 */
function removeResetOnEnterEvent() {
  window.removeEventListener('keydown', resetOnEnter);
}
// #endregion //* Functions for adding event handlers

// #region //! functions
/**
 * Generates the playfield as a table with tds equal to amountOfBoxes
 */
function generatePlayField() {
  const amountOfBoxes = checkInput(inputBox.value);
  if (!amountOfBoxes) return;
  const width = Math.sqrt(amountOfBoxes);
  const height = amountOfBoxes / width;
  resetPlayField();
  CreateTable(height, width, amountOfBoxes);
  placeLogo();
  addEvents();
  showTries();
  increaseTotalTries();
  addResetOnEnterEventAfterDelay();
}
/**
 * Creates a table with the provided values
 * @param {number} height The amount of rows for the table
 * @param {number} width the amount of columns for the table
 * @param {number} amountOfBoxes the amount of total Tds to be created
 */
function CreateTable(height, width, amountOfTds) {
  table = document.createElement('table');
  for (let i = 0; i < height; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < width; j++) {
      if (amountOfTds > 0) {
        const td = document.createElement('td');
        row.appendChild(td);
        allTds.push(td);
      }
      amountOfTds--;
    }
    table.appendChild(row);
  }
  playField.appendChild(table);
}
/**
 * Resets the playField
 */
function resetPlayField() {
  removeResetOnEnterEvent();
  tries = TotalAmountOfTries;
  allTds = [];
  if (playField.children.length > 0) playField.removeChild(table);
  toggleInputState();
  showTries();
}
/**
 * Handles the input to see if the provided value is a valid number between 2 and 20
 * @param {string} input the input to be checked
 * @returns 0 if wrong value, otherwise returns the value
 */
function checkInput(input) {
  const number = Number(input);
  if (number <= 1 || number > 20 || isNaN(number)) {
    flash(inputBox);
    inputBox.classList.add('red-text');
    setTimeout(resetInputBox, 1000);
    return 0;
  }
  return number;
}
/**
 * Resets the input window
 */
function resetInputBox() {
  inputBox.classList.remove('red-text');
  inputBox.value = '2-20';
  inputBox.select();
}
/**
 * Places the 'howest-logo' and 'hidden' classes on a random element on allTds
 */
function placeLogo() {
  const random = getRandom(1, allTds.length - 1);
  allTds[random].classList.add('howest-logo', 'hidden');
}
/**
 * decrement the amount of available tries by 1 and show tries in GUI
 */
function updateTries() {
  tries--;
  showTries();
}
/**
 * Write tries info to the element with class tries and styles the color depending on if tries if zero or not
 */
function showTries() {
  const triesElement = document.querySelector('.tries');
  triesElement.innerText = `Aantal pogingen over: ${tries}/${TotalAmountOfTries}`;
  if (tries === 0) triesElement.classList.add('background-red');
  else triesElement.classList.remove('background-red');
}
/**
 * Adds the 'clicked' class to the node
 * @param {Node} element  the node that you want to add the class to
 * @returns true if it was the first click, otherwise false
 */
function isNotFirstClick(element) {
  if (element.classList.contains('clicked')) return true;
  else element.classList.add('clicked');
  return false;
}
/**
 * Remove the 'hidden' class and add 'green-outline' class
 * @param {Node} element
 */
function showLogoOnWin(element) {
  element.classList.remove('hidden');
  element.classList.add('green-outline');
}
/**
 * Show the situation on lose and focus on inputBox
 */
function showLostSituation() {
  showLogoOnLose();
  inputBox.select();
}
/**
 * Shows the logo by finding the relevant td and remove 'hidden' class and add 'red-outline' class
 * Flashes the logo outline
 */
function showLogoOnLose() {
  const logo = document.querySelector('.howest-logo');
  logo.classList.remove('hidden');
  logo.classList.add('red-outline');
  flash(logo);
}
/**
 * Checks if provided node is the hidden logo
 * @param {Node} element node to check
 * @returns true if hidden Logo, otherwise false
 */
function isHiddenLogo(element) {
  return element.classList.contains('hidden');
}
/**
 * Toggles wether the state of the inputs (hidden or not)
 */
function toggleInputState() {
  const playButton = document.querySelector('.play-button');
  const amountLabel = document.querySelector('.amount-label');
  const resetButton = document.querySelector('.reset-button');
  amountLabel.classList.toggle('invisible');
  inputBox.classList.toggle('invisible');
  resetButton.classList.toggle('invisible');
  playButton.classList.toggle('invisible');
  resetInputBox();
}
/**
 * Increment logoScore by 1
 */
function increaseScore() {
  logoScore++;
}
/**
 * increment global total by 1
 */
function increaseTotalTries() {
  logoTotal++;
}
/**
 * Get the global score and total from session storage
 * @returns array containing score and total
 */
function getScores() {
  let logoScore = sessionStorage.getItem('logoScore');
  let logoTotal = sessionStorage.getItem('logoTotal');
  if (!Number(logoScore)) logoScore = 0;
  if (!Number(logoTotal)) logoTotal = 0;
  return [logoScore, logoTotal];
}
/**
 * Writes the scores to the sessionstorage
 */
function setScores() {
  sessionStorage.setItem('logoScore', logoScore);
  sessionStorage.setItem('logoTotal', logoTotal);
}
/**
 * Resets the game on pressing the R key
 */
function resetOnEnter(e) {
  if (e.key === 'Enter') {
    resetPlayField();
  }
}
/**
 * shows the lost situation state if the player just used their last try and did not find the logo
 */
function checkIfLost() {
  if (tries === 0) showLostSituation();
}
/**
 * Adds the class 'wrong' to the element
 * @param {Node} element The node to receive the class
 */
function changeColorToRed(element) {
  element.classList.add('wrong');
}
// #endregion //! functions
