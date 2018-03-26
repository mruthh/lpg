const fs = require('fs');
const mongoose = require('mongoose');
const LicensePlate = require('../models/LicensePlate');
const Word = require('../models/Word');
const Combinatorics = require('js-combinatorics');


mongoose.connect('mongodb://127.0.0.1/lpg', {poolSize: 10});



const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
let licensePlates = Combinatorics.baseN(alphabet, 3).toArray();

// const words = Word.find((err, data) => {

// });