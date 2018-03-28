const fs = require('fs');
const mongoose = require('mongoose');
const Word = require('../models/Word');
const LicensePlate = require('../models/LicensePlate');
const LicensePlateSchema = require('../models/LicensePlate');

mongoose.connect('mongodb://127.0.0.1/lpg', { poolSize: 10, bufferMaxEntries: 0 });
mongoose.set('debug', true);


//Find all items. Rerun length and frequency sorts. Save.
//Also run checks for "is shortest, is longest, is rarest, is commonest"

LicensePlate.find().exec( (err, data) => {
  data.slice(0,1000).forEach( (lp, index) => {
    console.log(lp)
    //add "is shortest, is longest, is rarest, is commonest" boolean properties to each lp.

    lp.solutions.forEach( (solution) => {
      solution.isShortest = false,
      solution.isLongest = false,
      solution.isRarest = false,
      solution.isCommonest = false
    })

    
    //helper function to re-run frequency and length sorts
    const sortAndCompare = (propertyToCompare, lowProperty, highProperty, rankName) => {
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
        console.log(`saving ${lp._id}, ${index} of ${data.length}`)
      })
    }
  });
});
