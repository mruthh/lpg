import dictionary from './dictionary.js';



const findLettersInWord = (letters, word) => {
  let firstLetter = letters[0];
  let secondLetter = letters[1];
  let thirdLetter = letters[2];

  //Helper function. returns false or next substring. Don't use truthy/falsy with this as could return undefined if letter is at the final index.
  const findLetterAndReturnNextSubstring = (letter, string) => {
    let letterIndex = string.indexOf(letter);
    return letterIndex === -1 ? false : string.slice(letterIndex + 1)
  }

  let secondString = findLetterAndReturnNextSubstring(firstLetter, word);

  if (secondString === false) return false;

  let thirdString = findLetterAndReturnNextSubstring(secondLetter, secondString);

  if (thirdString === false) return false;

  let finalString = findLetterAndReturnNextSubstring(thirdLetter, thirdString);

  if (finalString === false) return false;

  return word;

}


