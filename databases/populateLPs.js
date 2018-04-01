//trying this with mongoose's populate method to see if saving goes significantly faster.

const mongoose = require('mongoose');
const LP = require('../models/LP');
const LPSchema = require('../models/LP');
const Word = require('../models/Word');
const Combinatorics = require('js-combinatorics');

mongoose.connect('mongodb://127.0.0.1/lpg', { poolSize: 10, bufferMaxEntries: 0 });
mongoose.set('debug', true);

const generateLicensePlates = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  let licensePlates = Combinatorics.baseN(alphabet, 3).toArray().map(array => array.join(''));
}

let lps = generateLicensePlates();

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

//function that takes a license plate string and creates a document in the database for it.
const createDocumentForLicensePlate = (string, words) => {
  let licensePlate = new LP({ _id: string });
  let solutions = words.filter((word) => {
    return findLettersInWord(string, word._id);
  })

  // need to count words who are their own root word AND words whose root words aren't solutions.
  licensePlate.baseSolutionsCount = solutions.reduce((count, solution) => {
    if (solution.rootWord === solution._id || !findLettersInWord(string, solution.rootWord)) {
      return count + 1;
    } else {
      return count;
    }
  }, 0);

  licensePlate.save( (err, res) => {
    if (err) throw err;
    console.log(`saved ${licensePlate}`)
  })
}

Word.find((err, data) => {
  if (err) throw err;
  lps.forEach( (lp) => {
    createDocumentForLicensePlate(lp, data);
  })  
});
