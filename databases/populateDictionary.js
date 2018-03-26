const fs = require('fs');
const datamuse = require('datamuse');
const mongoose = require('mongoose');
const wordSchema = require('../models/Word');
const Word = require('../models/Word');
const winston = require('winston');


mongoose.connect('mongodb://127.0.0.1/lpg', {poolSize: 10});


//add logger. logs will be used to track any words from the Unix system dictionary that were not found in the datamuse API.
winston.add(
  winston.transports.File, {
    filename: './databases/rejectedWords.log',
    level: 'info',
    json: true,
    timestamp: true
  }
);
 

//first, read from Unix system dictionary. 
//use synchronous readFile operation to populate dictionary before performing operations on it. script is run to prepare database, not while game is live, so fine to block.
const words = fs.readFileSync('./databases/words.txt', 'utf8');

//dictionary comes back as one long text string. Split it into an array.
//we don't want proper nouns or words with special characters, so use words that are composed of lowercase letters only.
//remove words shorter than 3 letters - they will never solve a license plate.
const lowerCaseRegExp = new RegExp('^[a-z]*$');
const dictionary = words
  .split('\n')
  .filter(word => lowerCaseRegExp.test(word) && word.length > 3)

//for each word in the database, query the datamuse API to find out
// - does this word exist in both dictionaries?
// - what is its root word: itself, or a different word?
// - what is its frequency?
let dictionarySlice = dictionary.slice(30000);

dictionarySlice.forEach((word) => {
  datamuse.request(`words?sp=${word}&md=df`)
    .then((resultList) => {
      //the first result is the closest match 
      let result = resultList[0];
      if (!result) {
        winston.log('info', word);
      } else {
        //use 'word' to refer to the string and 'entry' to refer to the object being saved.
        let entry = new Word({ _id: word });
        // datamuse uses defHeadword property to point to the root word. use defHeadword as root word if present, otherwise use the original word.
        entry.rootWord = result.defHeadword || word;
        // // datamuse provides word frequency in a tags property like this: "tags":["f:0.923457"]. extract the number value as the word's frequency
        entry.frequency = parseFloat(result.tags[0].slice(2))
        entry.save((err, result) => {
          if (err) throw err;
          console.log(`saved ${word}`)
        });
      }
    })
    .catch((err) => {
      if (err) throw err;
    })
});

// fs.writeFile('./databases/rejectedWords.json', JSON.stringify(rejectedWords), (err) => { if (err) throw err});
//build dictionary database with an entry for each word//use 'word' to refer to the string and 'entry' to refer to the object being saved.