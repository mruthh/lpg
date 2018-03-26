import { dictionary } from './data';
console.log(dictionary.length)

function makeString() {
  const consonants = 'bcdfghjklmnpqrstvwxyz' //length = 21
    var returnString = '';
    for (var i = 0; i < 3; i++) {
      returnString += consonants[Math.floor(Math.random() * 10000) % 21]; //probability isn't perfectly even, but oh well.
    }
  return returnString.toUpperCase();
}

function findWords(searchString) {
  var firstLetter = searchString[0].toLowerCase();
  var secondLetter = searchString[1].toLowerCase();
  var thirdLetter = searchString[2].toLowerCase();

  function matchLetter(letter, array, propertyToMatch){
    var returnArray = [];
    for (var i = 0; i < array.length; i++) {
      var currentWord = array[i];
      var letterIndex = currentWord[propertyToMatch].indexOf(letter);
      if (letterIndex !== -1) {
        returnArray.push({
            word: currentWord.word,
            nextSlice: currentWord[propertyToMatch].slice(letterIndex + 1)
          });
      }
    }
    return returnArray;
  }

  var wordsMatchingFirstLetter = matchLetter(firstLetter, dictionary, 'word');
  var wordsMatchingFirstAndSecondLetter = matchLetter(secondLetter, wordsMatchingFirstLetter, 'nextSlice');
    var wordsMatchingAllLetters = wordsMatchingFirstAndSecondLetter.filter(function(wordObj) {
    return wordObj.nextSlice.indexOf(thirdLetter) !== -1;
  });

  return wordsMatchingAllLetters.map(function(wordObj){
    return wordObj.word.trim();
  })
}

function findLettersInWord (letters, word) {
  let firstLetter = letters[0].toLowerCase();
  let secondLetter = letters[1].toLowerCase();
  let thirdLetter = letters[2].toLowerCase();

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


function removeRelatedWords(array){

  function removeSimplePlurals(array){
    return array.filter(function(word) {
      //does NOT return words ending in 's' if array contains a word that is identical except for the terminal 's'
      return !(word[word.length - 1] === 's' &&
        array.find(function(rootWord) {
          return rootWord === (word.slice(0, -1));
        })
      )
    });
  }

  function removeIng(array){
    return array.filter(function(word) {
      //does NOT return words ending in 'ing' if array contains a word that is identical except for the 'ing'
      //OR if array contains a word that is identical except for the 'ing' + dropped 'e'
      return !(word.slice(-3) === 'ing' &&
        array.find(function(rootWord) {
          return rootWord === word.slice(0, -3)
          || rootWord === word.slice(0, -3) + 'e';
        })
      )
    });
  }

  function removeEd(array){
    return array.filter(function(word) {
      //does NOT return words ending in 'ing' if array contains a word that is identical except for the 'ing'
      //OR if array contains a word that is identical except for the 'ing' + dropped 'e'
      return !(word.slice(-2) === 'ed' &&
        array.find(function(rootWord) {
          return rootWord === word.slice(0, -2)
          || rootWord === word.slice(0, -1);
        })
      )
    });
  }

  function removeLY(array){
    return array.filter(function(word) {
      //does NOT return words ending in 'ing' if array contains a word that is identical except for the 'ing'
      //OR if array contains a word that is identical except for the 'ing' + dropped 'e'
      return !(word.slice(-2) === 'ly' &&
        array.find(function(rootWord) {
          return rootWord === word.slice(0, -2)
          || rootWord === word.slice(0, -1);
        })
      )
    });
  }
  return removeEd(removeLY(removeIng(removeSimplePlurals(array))));
}


export function makeQueue(queueLength){
  let queue = [];
  while (queue.length < queueLength){
    let letters = makeString();
    let rawSolutions = dictionary.filter( (word) => {
      return findLettersInWord(letters, word);
    });
    let solutions = removeRelatedWords(rawSolutions);
      if (solutions.length) {
      queue.push({letters, solutions})
    }
  }
  return queue;
}


