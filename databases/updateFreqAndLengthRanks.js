const fs = require('fs');
const mongoose = require('mongoose');
const Word = require('../models/Word');
const LicensePlate = require('../models/LicensePlate');
const LicensePlateSchema = require('../models/LicensePlate');
const winston = require('winston');
mongoose.connect('mongodb://127.0.0.1/lpg', { poolSize: 10, bufferMaxEntries: 0 });
mongoose.set('debug', true);

winston.add(
  winston.transports.File, {
    filename: './databases/updateErrors.log',
    level: 'info',
    json: true,
    timestamp: true
  }
);
 
//Find all items. Rerun length and frequency sorts. Save.
//Also run checks for "is shortest, is longest, is rarest, is commonest"

LicensePlate.find()
//last completed was item 3000.
.limit(500)
.skip(2500)
.exec( (err, data) => {
  data.forEach( (lp, index) => {
    //add "is shortest, is longest, is rarest, is commonest" boolean properties to each lp.
    console.log(`processing ${lp._id}, ${index} of ${data.length}`)
    
    lp.solutions.forEach( (solution) => {
      solution.isShortest = false,
      solution.isLongest = false,
      solution.isRarest = false,
      solution.isCommonest = false
    })

    
    //helper function to re-run frequency and length sorts
    const sortAndCompare = (propertyToCompare, lowProperty, highProperty, rankName) => {
      //if there is only one item, it has all of these properties and no sort is necessary.
      if (lp.solutions.length === 1) {
        let solution = lp.solutions[0];
        solution.isShortest = true;
        solution.isLongest = true;
        solution.isRarest = true;
        solution.isCommonest = true;
        return;
      }
      const getPropertyToCompare = (solution, propertyToCompare) => {
        if (propertyToCompare === 'frequency') {
          return solution.word.frequency;
        } else {
          return solution.word._id.length;
        }
      }
      lp.solutions.sort((a, b) => {
        return getPropertyToCompare(a, propertyToCompare) - getPropertyToCompare(b, propertyToCompare);
      });

      let first = lp.solutions[0];
      let second = lp.solutions[1];
      let last = lp.solutions[lp.solutions.length - 1];
      let nextToLast = lp.solutions[lp.solutions.length - 2];

      //check if first item is less than second item. if so, lowProperty=true
      if (getPropertyToCompare(first, propertyToCompare) < getPropertyToCompare(second, propertyToCompare) || !second) {
        first[lowProperty] = true;
      }

      //check if last item is greater than next-to-last item. if so, highProperty=true
      if (getPropertyToCompare(last, propertyToCompare) > getPropertyToCompare(nextToLast, propertyToCompare)) {
        last[highProperty] = true;
      }

      //assign ranks

      for (let i = 0; i < lp.solutions.length; i++) {
        lp.solutions[i][rankName] = i;
      }
    }

    if (lp.solutions.length) {
      sortAndCompare('length', 'isShortest', 'isLongest', 'lengthRank')
      sortAndCompare('frequency', 'isRarest', 'isCommonest', 'frequencyRank');
      lp.save( (err, res) => {
        if (err) throw err;
        console.log(`saved ${lp._id}, ${index} of ${data.length}`)
      })
    } else {
      console.log(`no solutions for ${lp}. no updates needed.`)
    }
  });
});
