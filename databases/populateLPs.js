//trying this with mongoose's populate method to see if saving goes significantly faster.

const mongoose = require('mongoose');
const LP = require('../models/LP');
const LPSchema = require('../models/LP');
const Word = require('../models/Word');
const WordSchema = require('../models/Word');
const Combinatorics = require('js-combinatorics');

mongoose.connect('mongodb://127.0.0.1/lpg', { poolSize: 10, bufferMaxEntries: 0 });
mongoose.set('debug', true);

// const generateLicensePlates = () => {
//   const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
//   let licensePlates = Combinatorics.baseN(alphabet, 3).toArray().map(array => array.join(''));
//   return licensePlates;
// }

// let lps = generateLicensePlates();

// const findLettersInWord = (letters, word) => {

//   let nextSubstring = word;
//   for (i = 0; i < letters.length; i++) {
//     let letter = letters[i];
//     let letterIndex = nextSubstring.indexOf(letter);
//     if (letterIndex === -1) return false;
//     nextSubstring = nextSubstring.slice(letterIndex + 1);
//   }

//   return word;

// }

// //function that takes a license plate string and creates a document in the database for it.
// const createDocumentForlp = (string, words) => {
//   let solutions = words.filter((word) => {
//     return findLettersInWord(string, word.name);
//   })
  
//   //need array of just the objectIDs
//   // let solutionIds = solutions.map(word => word._id);

//   // need to count words who are their own root word AND words whose root words aren't solutions.
//   let baseSolutionsCount = solutions.reduce((count, solution) => {
//     if (solution.rootWord === solution.name || !findLettersInWord(string, solution.rootWord)) {
//       return count + 1;
//     } else {
//       return count;
//     }
//   }, 0);

//   let lp = {
//     letters: string,
//     solutions: solutions,
//     baseSolutionsCount: baseSolutionsCount
//   }

//   LP.create(lp, (err, res) => {
//     if (err) throw err;
//     console.log(`saved ${lp.letters}`)
//   })
// }

// Word.find((err, data) => {
//   if (err) throw err;
//   lps.slice(0,10).forEach( (lp, index) => {
//     console.log(`creating document for ${lp}, ${index} of ${lps.length}`)
//     createDocumentForlp(lp, data);
//   })  
// });


// test script to see how populate works.
LP.findOne({letters: 'jaa'}).populate('word').exec( (err, results) => {
  if (err) throw err;
  console.log('success?')
  console.log(results)
})