// Liste de lettres françaises simples
export const letterList = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

// Liste de mots français simples
export const wordList = [
  'BONJOUR',
  'CHAT',
  'CHIEN',
  'MERCI',
  'SALUT',
  'AMOUR',
  'JOUER',
  'PARIS',
  'SOLEIL',
  'MAISON',
  'JARDIN',
  'FLEUR',
  'LIVRE',
  'ECOLE',
  'TRAIN'
];

export function getRandomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

export function getRandomLetter() {
  return letterList[Math.floor(Math.random() * letterList.length)];
}