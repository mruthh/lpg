//Schema for licensePlates in branch populate.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WordSchema = require('../models/Word');

const LPSchema = new Schema({
  _id: String,
  solutions: [{type: Schema.Types.ObjectId, ref: Word}],
  baseSolutionsCount: Number
});