
//note: in the populate feature branch, this model is deprecated. LP is the updated model for license plates.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WordSchema = require('../models/Word');

//Bonuses
// three-in-a-row - word contains those three letters together
// short and sweet - shortest word - relative to other words in array
// no frills - no prefixes or suffixes (maybe no compound words?)

//need to calculate "count" (not same as array length because of root words)


const SolutionSchema = new Schema({
  _id: String,
  word: {},
  consecutive: Boolean,
  isRoot: Boolean,
  frequency: Number,
  frequencyRank: Number,
  lengthRank: Number,
  isShortest: Boolean,
  isLongest: Boolean,
  isRarest: Boolean,
  isCommonest: Boolean
});

const LicensePlateSchema = new Schema({
  _id: String,
  solutions: [SolutionSchema],
  baseSolutionsCount: Number
});

module.exports = mongoose.model('LicensePlate', LicensePlateSchema);