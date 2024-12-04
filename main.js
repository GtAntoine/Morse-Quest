import './style.css';
import { MorseGame } from './src/game.js';
import { morseAlphabet } from './src/utils/morse.js';
import { WordOptions } from './src/components/WordOptions.js';

// Initialize game
const game = new MorseGame();
game.start();

// DOM elements
const playButton = document.getElementById('play');
const submitButton = document.getElementById('submit');
const guessInput = document.getElementById('guess');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const toggleHelpButton = document.getElementById('toggle-help');
const morseTable = document.getElementById('morse-table');
const morseGrid = document.getElementById('morse-grid');
const messageElement = document.getElementById('message');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');
const wordOptionsContainer = document.getElementById('word-options');
const inputContainer = document.getElementById('input-container');
const modeDescription = document.getElementById('mode-description');

// Initialize word options component
const wordOptions = new WordOptions(wordOptionsContainer);

// Load high score
let highScore = localStorage.getItem('morseHighScore') || 0;
highScoreElement.textContent = highScore;

// Setup morse alphabet table with animations
Object.entries(morseAlphabet).forEach(([letter, morse]) => {
  const item = document.createElement('div');
  item.className = 'morse-item animate__animated';
  item.innerHTML = `<strong>${letter}</strong><br>${morse}`;
  item.addEventListener('mouseenter', () => {
    item.classList.add('animate__pulse');
  });
  item.addEventListener('animationend', () => {
    item.classList.remove('animate__pulse');
  });
  morseGrid.appendChild(item);
});

// Update game mode UI
function updateGameMode() {
  const difficulty = game.getDifficulty();
  const isEasyMode = difficulty.name === 'Facile';
  const isNormalMode = difficulty.name === 'Normal';
  
  wordOptionsContainer.style.display = (isEasyMode || isNormalMode) ? 'grid' : 'none';
  inputContainer.style.display = (!isEasyMode && !isNormalMode) ? 'flex' : 'none';
  
  modeDescription.textContent = isEasyMode 
    ? 'Mode Facile : Devinez la lettre en morse'
    : isNormalMode 
      ? 'Mode Normal : Devinez le mot en morse'
      : 'Mode Difficile : Écrivez le mot en morse';
  
  if (isEasyMode || isNormalMode) {
    wordOptions.render(game.getCurrentOptions(), handleGuess);
  }
}

// Event listeners
playButton.addEventListener('click', async () => {
  playButton.classList.add('playing');
  await game.playCurrentWord();
  playButton.classList.remove('playing');
});

submitButton.addEventListener('click', () => handleGuess(guessInput.value.trim()));
guessInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') handleGuess(guessInput.value.trim());
});

toggleHelpButton.addEventListener('click', () => {
  morseTable.classList.toggle('visible');
  toggleHelpButton.innerHTML = morseTable.classList.contains('visible') 
    ? '<span class="help-icon">📕</span> Cacher'
    : '<span class="help-icon">📖</span> Alphabet Morse';
});

difficultyButtons.forEach(button => {
  button.addEventListener('click', () => {
    difficultyButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active', 'animate__animated', 'animate__pulse');
    game.setDifficulty(button.dataset.difficulty);
    updateGameMode();
  });
});

// Show message function with enhanced animations
function showMessage(text, type) {
  messageElement.textContent = text;
  messageElement.className = `message show ${type} animate__animated animate__fadeIn`;
  setTimeout(() => {
    messageElement.classList.remove('show', 'animate__fadeIn');
    messageElement.classList.add('animate__fadeOut');
  }, 2000);
}

// Handle guess function with score animations
function handleGuess(guess) {
  if (!guess) return;

  const isCorrect = game.checkGuess(guess);
  if (game.getDifficulty().name === 'Difficile') {
    guessInput.value = '';
  }
  
  const currentScore = game.getScore();
  const oldScore = parseInt(scoreElement.textContent);
  
  if (currentScore > oldScore) {
    scoreElement.classList.add('animate__animated', 'animate__bounceIn');
    scoreElement.addEventListener('animationend', () => {
      scoreElement.classList.remove('animate__animated', 'animate__bounceIn');
    }, { once: true });
  }
  
  scoreElement.textContent = currentScore;

  if (isCorrect) {
    showMessage('🎉 Correct ! Bravo !', 'success');
    if (currentScore > highScore) {
      highScore = currentScore;
      highScoreElement.textContent = highScore;
      highScoreElement.classList.add('animate__animated', 'animate__bounceIn');
      localStorage.setItem('morseHighScore', highScore);
    }
    if (game.getDifficulty().name !== 'Difficile') {
      wordOptions.render(game.getCurrentOptions(), handleGuess);
    }
  } else {
    showMessage('❌ Essayez encore !', 'error');
    if (guessInput) {
      guessInput.classList.add('animate__animated', 'animate__shakeX');
      guessInput.addEventListener('animationend', () => {
        guessInput.classList.remove('animate__animated', 'animate__shakeX');
      }, { once: true });
    }
  }
}

// Initial game mode setup
updateGameMode();