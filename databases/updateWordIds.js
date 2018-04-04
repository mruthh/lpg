const fs = require('fs');
const mongoose = require('mongoose');
const wordSchema = require('../models/Word');
const Word = require('../models/Word');
const winston = require('winston');

mongoose.connect('mongodb://127.0.0.1/lpg', {poolSize: 10});
mongoose.set('debug', true);

winston.add(
  winston.transports.File, {
    filename: './databases/duplicateWords.log',
    level: 'info',
    json: true,
    timestamp: true
  }
);

// grab all words from dictionary as before. each will have a db entry.
const populateDictionary = () => {
  const words = fs.readFileSync('./databases/words.txt', 'utf8');
  const lowerCaseRegExp = new RegExp('^[a-z]*$');
  return words
    .split('\n')
    .filter(word => lowerCaseRegExp.test(word) && word.length >= 3);
}

const dictionary = populateDictionary();

// const dictionary = ['desktop']
//for each dictionary word...
// - findById its db entry. 
// - create a new word, identical except its NAME is the old word._id.
// - save new word to db
// - delete original entry.

// dictionary.slice().forEach( (word, index) => {
//   console.log(`updating ${word}, ${index} of ${dictionary.length}`)
//   Word.find({_id: word}, (err, res) => {
//     if (err) throw err;
//     if (!res.length) {
//       winston.log('info', word)
//       return
//     };
//     let oldWord = res[0];
//     let newWord = new Word({
//       _id: mongoose.Types.ObjectId(),
//       name: oldWord._id,
//       rootWord: oldWord.rootWord,
//       frequency: oldWord.frequency
//     });
//     newWord.save( (err, res) => {
//       if (err) throw err;
//       console.log(`saved ${word}, ${index} of ${dictionary.length}`)
//     })
//   })
// })

// Word.remove({name: undefined}, (err, res) => {
//   if (err) throw err;
//   console.log('removed')
// })

//now I want to remove duplicates.

//first, find all words. if res.length > 1, loop through res.slice(1) and remove those.
dictionary.slice(500).forEach( (word) => {
  Word.find({name: word}, (err, res) => {
    if (err) throw err;
    if (res.length > 1) {
      winston.log('info', word);
      for (let i = 1; i < res.length; i++){
        let dupeId = res[i]._id;
        Word.findByIdAndRemove(dupeId, (err) => {
          if (err) throw err
        })
      }
    } 
  })

})

// Word.find({_id: 'desktop'}, (err, res) => {
//   //we get an array back. for each array item, we transform the Object Id, then save.
//   if (err) throw err;
//   res.forEach( (word) => {
//     word.name = word._id;
//     word._id = mongoose.Types.ObjectId();
//     word.save( (err, res ) => {
//       if (err) throw err;
//       console.log(res)
//     })
//   })
// })
