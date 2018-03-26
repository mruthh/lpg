const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Each word in the dictionary has...
// - the string representing the word as a unique id
// - the root word, which could be the word itself (root word of 'dogs' = 'dog'. root word of 'dog' = 'dog'.)
// - the word frequency, as provided by the Datamuse API: "The value is the number of times the word (or multi-word phrase) occurs per million words of English text according to Google Books Ngrams."

const WordSchema = new Schema({
  _id: String,
  rootWord: String,
  frequency: Number
});

module.exports = mongoose.model('Word', WordSchema);