export const WORD_OPTIONS_COUNT = 4;
export const LETTER_OPTIONS_COUNT = 4;

export function generateWordOptions(correctWord, wordList) {
  const options = new Set([correctWord]);
  
  while (options.size < WORD_OPTIONS_COUNT) {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    if (randomWord !== correctWord) {
      options.add(randomWord);
    }
  }
  
  return shuffleArray([...options]);
}

export function generateLetterOptions(correctLetter, letterList) {
  const options = new Set([correctLetter]);
  
  while (options.size < LETTER_OPTIONS_COUNT) {
    const randomLetter = letterList[Math.floor(Math.random() * letterList.length)];
    if (randomLetter !== correctLetter) {
      options.add(randomLetter);
    }
  }
  
  return shuffleArray([...options]);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}