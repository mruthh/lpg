const fs = require('fs');
const datamuse = require('datamuse');
const mongoose = require('mongoose');
const LicensePlate = require('../models/LicensePlate');
const Word = require('../models/Word');


mongoose.connect('mongodb://127.0.0.1/lpg', {poolSize: 10});

const words = Word.find((err, data) => {

});

//word list will need to be pulled from DB before we continue.

// const generateLicensePlateList = () => {
//   let licensePlates = [];
//   let alphabet = 'abcdefghijklmnopqrstuvwxyz';
//   for (let i = 0; i < alphabet.length; i++){
//     let firstLetter = alphabet[i];
//     for (let j = 0; i < alphabet.length; i++){
//       let firstAndSecondLetter = firstLetter + alphabet[j];
//       for (let k = 0; k < alphabet.length; k++){
//         let allThreeLetters = firstAndSecondLetter + alphabet[k];
//         licensePlates.push(allThreeLetters); 
//       }
//     }
//   }
//   return licensePlates;
// };

// let licensePlateList = generateLicensePlateList();
// console.log(licensePlateList);

//use combinatorics package for this.

