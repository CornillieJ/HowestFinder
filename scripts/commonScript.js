/* eslint-disable no-unused-vars */
'use strict';
const winScreen = document.querySelector('.win');

// #region //! functions
/**
 * Get randon number between the 2 provided arguments (both included)
 * @param {Number} min minimum random value
 * @param {Number} max maximum random value
 * @returns a random number between these values (both included)
 */
const getRandom = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};
/**
 * Shows the Win screen by removing the 'invisible' class and adds the score text
 * @param {Number} tries the number of tries to be shown
 */
const showWinSituation = (tries = 0) => {
  const score = document.querySelector('.score');
  winScreen.classList.remove('invisible');
  if (!tries) return;
  if (tries === 1) score.innerText = `Je gebruikte ${tries} poging`;
  else score.innerText = `Je gebruikte ${tries} pogingen`;
};
/**
 * Closes the win modal window
 */
const closeWin = () => {
  winScreen.classList.add('invisible');
};
/**
 * async function to add the animation class and removes the class after 1 second, flashes the element outline
 * @param {Node} element the node to flash
 */
async function flash(element) {
  element.classList.add('animation');
  setTimeout(() => {
    element.classList.remove('animation');
  }, 1000);
}
// #endregion //! functions

// #region //* Adding event handlers
window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  alert('NAUGHTY! No cheating allowed');
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'F12') {
    e.preventDefault();
    alert('NAUGHTY! No cheating allowed');
  }
});
// #endregion //* Adding event handlers
