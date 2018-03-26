const fs = require('fs');
const mongoose = require('mongoose');
const LicensePlate = require('../models/LicensePlate');
const LicensePlateSchema = require('../models/LicensePlate');
const Word = require('../models/Word');
const Combinatorics = require('js-combinatorics');


mongoose.connect('mongodb://127.0.0.1/lpg', { poolSize: 10, bufferMaxEntries: 0 });
mongoose.set('debug', true);

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
let licensePlates = Combinatorics.baseN(alphabet, 3).toArray().map(array => array.join(''));
let docsToSave = [];

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
  let solutions = words.filter((word) => {
    return findLettersInWord(string, word._id);
  })

  // need to count words who are their own root word AND words whose root words aren't solutions.
  let baseSolutionsCount = solutions.reduce((count, solution) => {
    if (solution.rootWord === solution._id || !findLettersInWord(string, solution.rootWord)) {
      return count + 1;
    } else {
      return count;
    }
  }, 0);

  licensePlate.solutions = solutions.map((solution) => {
    return {
      // word: solution._id,
      // frequency: solution.frequency,
      word: solution,
      isRoot: solution.rootWord === solution._id,
      consecutive: solution._id.includes(string),
      frequencyRank: -1,
      lengthRank: -1
    };
  });

  // sort by frequency. lowest freq has lowest index.

  licensePlate.solutions.sort((a, b) => {
    return a.frequency < b.frequency;
  });
  for (let i = 0; i < licensePlate.solutions.length; i++) {
    licensePlate.solutions[i].frequencyRank = i;
  }

  //sort by length. lowest length has lowest index.
  licensePlate.solutions.sort((a, b) => {
    return a.word._id.length > b.word._id.length;
  });
  for (let i = 0; i < licensePlate.solutions.length; i++) {
    licensePlate.solutions[i].lengthRank = i;
  }

  licensePlate.baseSolutionsCount = baseSolutionsCount;
  //push into holding array - this array will pass docs to mongo all at once.
  docsToSave.push(licensePlate);
}

Word.find((err, data) => {
  if (err) throw err;
  function* populateLPs(words) {
    let startIndex = 0;
    let endIndex = startIndex + 1000;
    while (startIndex < licensePlates.length) {
      licensePlates.slice(startIndex, endIndex).forEach((lp, index) => {
        console.log(`creating document for ${lp}, ${startIndex + index} of ${licensePlates.length}`)
        createDocumentForLicensePlate(lp, words)
        console.log(`done creating document for ${lp}, ${startIndex + index} of ${licensePlates.length}`)
      });
      startIndex += 1000;
      endIndex += 1000;
      LicensePlate.create(docsToSave, (err) => {
        if (err) throw err;
        runPopulate.next();
      })
      yield
    }
    //then do next 2K
  }
  const runPopulate = populateLPs(data);
  runPopulate.next();
});



