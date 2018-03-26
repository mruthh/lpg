const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Bonuses
// three-in-a-row - word contains those three letters together
// short and sweet - shortest word - relative to other words in array
// no frills - no prefixes or suffixes (maybe no compound words?)

//need to calculate "count" (not same as array length because of root words)

const SolutionsSchema = new Schema({
  word: String,
  consecutive: Boolean,
  shortest: Boolean,
  isRoot: Boolean
});

const LicensePlateSchema = new Schema({
  _id: String,
  solutions: [SolutionsSchema],
  baseSolutionsCount: Number
});

module.exports = mongoose.model('LicensePlate', LicensePlateSchema);