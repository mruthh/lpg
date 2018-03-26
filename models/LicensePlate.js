const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Bonuses
// three-in-a-row - word contains those three letters together
// short and sweet - shortest word - relative to other words in array
// no frills - no prefixes or suffixes (maybe no compound words?)

const SolutionsSchema = new Schema({

});

const LicensePlateSchema = new Schema({
  _id: String,
  solutions: [SolutionsSchema],
  consecutiveSolutions: [SolutionsSchema]
});

module.exports = mongoose.model('Word', WordSchema);