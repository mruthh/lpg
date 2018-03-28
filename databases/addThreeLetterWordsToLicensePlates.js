const fs = require('fs');
const mongoose = require('mongoose');
const Word = require('../models/Word');
const LicensePlate = require('../models/LicensePlate');
const LicensePlateSchema = require('../models/LicensePlate');

mongoose.connect('mongodb://127.0.0.1/lpg', { poolSize: 10, bufferMaxEntries: 0 });
mongoose.set('debug', true);

let dictionary = null;

const words = fs.readFileSync('./databases/words.txt', 'utf8');
  const lowerCaseRegExp = new RegExp('^[a-z]*$');
  dictionary = words
    .split('\n')
    .filter(word => lowerCaseRegExp.test(word) && word.length === 3)

//for each word in the dictionary array (all of which are three letter words), I want to 

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
  let licensePlate = {};
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
    return a.word.frequency - b.word.frequency;
  });
  for (let i = 0; i < licensePlate.solutions.length; i++) {
    licensePlate.solutions[i].frequencyRank = i;
  }

  //sort by length. lowest length has lowest index.
  licensePlate.solutions.sort((a, b) => {
    return a.word._id.length - b.word._id.length;
  });
  for (let i = 0; i < licensePlate.solutions.length; i++) {
    licensePlate.solutions[i].lengthRank = i;
  }

  licensePlate.baseSolutionsCount = baseSolutionsCount;
  //return an infoToUpdate object
  return {string, licensePlate};
}


const updateExactMatches = () => {
  Word.find((err, data) => {
    if (err) throw err;
    dictionary.forEach( (threeLetterWord, index) => {
      console.log(`creating document for ${threeLetterWord}, ${index} of ${dictionary.length}`);
      let infoToUpdate = createDocumentForLicensePlate(threeLetterWord, data);
      LicensePlate.findByIdAndUpdate(infoToUpdate.string, infoToUpdate.licensePlate, {overwrite: true}, (err, res) => { if (err) throw err;})
      console.log(`done creating document for ${threeLetterWord}, ${index} of ${dictionary.length}`)
    });
  })
}

updateExactMatches();
//for each three letter word, find the license plate that is its exact match.

// build a list of 3-letter license LicensePlates. this will be this script's version of dictionary.slice.


// run the createDocumentForLicensePlate function and update the fields on that license plate, overwriting existing data


