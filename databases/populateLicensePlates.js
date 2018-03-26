const fs = require('fs');
const mongoose = require('mongoose');
const LicensePlate = require('../models/LicensePlate');
const LicensePlateSchema = require('../models/LicensePlate');
const Word = require('../models/Word');
const Combinatorics = require('js-combinatorics');


mongoose.connect('mongodb://127.0.0.1/lpg', {poolSize: 10});

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
let licensePlates = Combinatorics.baseN(alphabet, 3).toArray().map( array => array.join(''));


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
  let licensePlate = new LicensePlate({ _id: string });
  let solutions = words.filter( (word) => {
    return findLettersInWord(string, word._id);
  })
  //currently solutions will have all properties of word. .map it so it has right properties

  // need to count words who are their own root word AND words whose root words aren't solutions.
  let baseSolutionsCount = solutions.reduce( (count, solution) => {
    if (solution.rootWord === solution._id || !findLettersInWord(string, solution.rootWord)) {
      return count + 1;
    } else {
      return count;
    }
  }, 0);
  licensePlate.solutions = solutions.map( (solution) => {
    return {
      word: solution._id,
      isRoot: solution.rootWord === solution._id, 
      consecutive: solution._id.includes(string),
      frequency: solution.frequency
    };
  });
  licensePlate.baseSolutionsCount = baseSolutionsCount;
  licensePlate.save( (err) => {if (err) throw err})
}

Word.find((err, data) => {
  licensePlates.forEach((lp) => createDocumentForLicensePlate(lp, data))
});

//needs the following:
/*
_id: String,
solutions: [SolutionsSchema],
baseSolutionsCount: Number

const SolutionsSchema = new Schema({
  word: String,
  consecutive: Boolean,
  shortest: Boolean,
  isRoot: Boolean
});
*/

