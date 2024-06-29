/* eslint-disable no-unused-vars */
'use strict';
window.addEventListener('load', initialize);

function initialize() {
  const primeScore = sessionStorage.getItem('primeScore');
  const primeTotal = sessionStorage.getItem('primeTotal');
  const primeScoreElement = document.querySelector('.prime-score');
  showScore(primeScoreElement, primeScore, primeTotal);

  const logoScore = sessionStorage.getItem('logoScore');
  const logoTotal = sessionStorage.getItem('logoTotal');
  const logoScoreElement = document.querySelector('.logo-score');
  showScore(logoScoreElement, logoScore, logoTotal);
}

function showScore(element, score, total) {
  if (!Number(score)) score = 0;
  if (!Number(total)) total = 0;
  element.innerText = `score:\n${score} / ${total}`;
}

function resetScore(scoreType) {
  if (scoreType === 'prime') {
    sessionStorage.setItem('primeScore', 0);
    sessionStorage.setItem('primeTotal', 0);
    const primeScoreElement = document.querySelector('.prime-score');
    showScore(primeScoreElement, 0, 0);
  } else {
    sessionStorage.setItem('logoScore', 0);
    sessionStorage.setItem('logoTotal', 0);
    const logoScoreElement = document.querySelector('.logo-score');
    showScore(logoScoreElement, 0, 0);
  }
}
