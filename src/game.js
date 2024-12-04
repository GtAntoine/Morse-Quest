import { wordToMorse } from './utils/morse.js';
import { getRandomWord, getRandomLetter, wordList, letterList } from './utils/words.js';
import { AudioFeedback } from './utils/audio.js';
import { DIFFICULTY_SETTINGS, BASE_TIMINGS } from './utils/constants.js';
import { generateWordOptions, generateLetterOptions } from './utils/gameOptions.js';

export class MorseGame {
  constructor() {
    this.score = 0;
    this.currentWord = '';
    this.currentLetter = '';
    this.currentOptions = [];
    this.isPlaying = false;
    this.audioFeedback = new AudioFeedback();
    this.difficulty = DIFFICULTY_SETTINGS.NORMAL;
  }

  start() {
    this.nextChallenge();
  }

  setDifficulty(level) {
    this.difficulty = DIFFICULTY_SETTINGS[level];
    this.nextChallenge();
  }

  getDifficulty() {
    return this.difficulty;
  }

  nextChallenge() {
    if (this.difficulty.name === 'Facile') {
      this.currentLetter = getRandomLetter();
      this.currentWord = '';
      this.currentOptions = generateLetterOptions(this.currentLetter, letterList);
    } else {
      this.currentWord = getRandomWord();
      this.currentLetter = '';
      if (this.difficulty.name === 'Normal') {
        this.currentOptions = generateWordOptions(this.currentWord, wordList);
      } else {
        this.currentOptions = [];
      }
    }
  }

  getCurrentOptions() {
    return this.currentOptions;
  }

  async playCurrentWord() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    const morse = wordToMorse(this.difficulty.name === 'Facile' ? this.currentLetter : this.currentWord);
    const speedMultiplier = this.difficulty.speedMultiplier;
    
    for (const char of morse) {
      if (char === '.') {
        this.audioFeedback.playDot(speedMultiplier);
        if (window.navigator.vibrate) {
          window.navigator.vibrate(BASE_TIMINGS.DOT);
        }
        await new Promise(resolve => setTimeout(resolve, BASE_TIMINGS.DOT * 2 * speedMultiplier));
      } else if (char === '-') {
        this.audioFeedback.playDash(speedMultiplier);
        if (window.navigator.vibrate) {
          window.navigator.vibrate(BASE_TIMINGS.DASH);
        }
        await new Promise(resolve => setTimeout(resolve, BASE_TIMINGS.DASH * 1.33 * speedMultiplier));
      } else if (char === ' ') {
        await new Promise(resolve => setTimeout(resolve, BASE_TIMINGS.LETTER_PAUSE * speedMultiplier));
      }
    }
    
    this.isPlaying = false;
  }

  checkGuess(guess) {
    const isCorrect = this.difficulty.name === 'Facile' 
      ? guess.toUpperCase() === this.currentLetter
      : guess.toUpperCase() === this.currentWord;

    if (isCorrect) {
      this.score += this.difficulty.points;
      this.nextChallenge();
    }
    return isCorrect;
  }

  getCurrentWord() {
    return this.difficulty.name === 'Facile' ? this.currentLetter : this.currentWord;
  }

  getScore() {
    return this.score;
  }
}