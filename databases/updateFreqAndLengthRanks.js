const fs = require('fs');
const mongoose = require('mongoose');
const Word = require('../models/Word');
const LicensePlate = require('../models/LicensePlate');
const LicensePlateSchema = require('../models/LicensePlate');

mongoose.connect('mongodb://127.0.0.1/lpg', { poolSize: 10, bufferMaxEntries: 0 });
mongoose.set('debug', true);


//Find all items. Rerun length and frequency sorts. Save.
//Also run checks for "is shortest, is longest, is rarest, is commonest"

LicensePlate.find({_id: 'zoo'}).exec( (err, data) => {
  data.slice(0, 1).forEach( (oldLp) => {
    console.log(oldLp)
    //add "is shortest, is longest, is rarest, is commonest" boolean properties to each lp.

    let lp = oldLp.solutions.map( (solution) => {
      return {
        ...solution, 
        isShortest: false,
        isLongest: false,
        isRarest: false,
        isCommonest: false
      }
    })
    
    //helper function to re-run frequency and length sorts
    const sortAndCompare = (propertyToCompare, lowProperty, highProperty) => {
      lp.solutions.sort((a, b) => {
        return a.word[propertyToCompare] - b.word[propertyToCompare];
      });

      let first = lp.solutions[0];
      let second = lp.solutions[1];
      let last = lp.solutions[lp.solutions.length - 1];
      let nextToLast = lp.solutions[lp.solutions.length - 2];

      //check if first item is less than second item. if so, lowProperty=true
      if (first.word[propertyToCompare] < second.word[propertyToCompare] || !second) {
        first[lowProperty] = true;
      }

      //check if last item is greater than next-to-last item. if so, highProperty=true
      if (last.word[propertyToCompare] > nextToLast.word[propertyToCompare]) {
        last[highProperty] = true;
      }

      //assign ranks
      for (let i = 0; i < licensePlate.solutions.length; i++) {
        licensePlate.solutions[i].frequencyRank = i;
      }
    }

    if (lp.solutions.length) {
      sortAndCompare(frequency, isRarest, isCommonest);
      sortAndCompare(_id.length, isShortest, isLongest)
      lp.save( (err, res) => {
        if (err) throw err;
      })
    }
  });
});
