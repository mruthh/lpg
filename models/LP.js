//Schema for licensePlates in branch populate.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WordSchema = require('./Word');
const Word = require('./Word');

const LPSchema = new Schema({
  letters: String,
  solutions: [{type: Schema.Types.ObjectId, ref: 'word'}],
  baseSolutionsCount: Number
});

module.exports = mongoose.model('LP', LPSchema);