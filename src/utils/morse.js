// Morse code alphabet
export const morseAlphabet = {
  'A': '.-',    'B': '-...',  'C': '-.-.', 'D': '-..',
  'E': '.',     'F': '..-.',  'G': '--.',  'H': '....',
  'I': '..',    'J': '.---',  'K': '-.-',  'L': '.-..',
  'M': '--',    'N': '-.',    'O': '---',  'P': '.--.',
  'Q': '--.-',  'R': '.-.',   'S': '...',  'T': '-',
  'U': '..-',   'V': '...-',  'W': '.--',  'X': '-..-',
  'Y': '-.--',  'Z': '--..'
};

// Convert word to morse code
export function wordToMorse(word) {
  return word.toUpperCase().split('').map(char => morseAlphabet[char]).join(' ');
}

// Vibration patterns
const DOT_DURATION = 100;
const DASH_DURATION = 300;
const PAUSE_DURATION = 100;
const LETTER_PAUSE = 300;

export function vibrateWord(word) {
  const morse = wordToMorse(word);
  const pattern = [];
  
  for (const char of morse) {
    if (char === '.') {
      pattern.push(DOT_DURATION, PAUSE_DURATION);
    } else if (char === '-') {
      pattern.push(DASH_DURATION, PAUSE_DURATION);
    } else if (char === ' ') {
      pattern.push(LETTER_PAUSE);
    }
  }
  
  // Remove last pause
  pattern.pop();
  
  return pattern;
}