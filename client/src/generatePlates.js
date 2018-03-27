import dictionary from './dictionary.js';

const findLettersInWord = (letters, word) => {

  let nextSubstring = word;
  for (i = 0; i < letters.length; i++) {
    let letter = letters[i];
    let letterIndex = nextSubstring.indexOf(letter);
    if (letterIndex === -1) return false;
    nextSubstring = nextSubstring.slice(letterIndex + 1);
  }

  return word;

}


