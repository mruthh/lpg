//at last, a test-driven (or maybe behavior-driven) dictionary-population script!
const fs = require('fs');

const dictionary = fs.readFileSync('./databases/words.txt', 'utf8');

const getWordsFromDictionary = (dictionary) => {
  const lowerCaseRegExp = new RegExp('^[a-z]*$');
  return dictionary
    .split('\n')
    .filter(word => lowerCaseRegExp.test(word) && word.length >= 3)
};

const getFreqAndRootWords = () => {

};

const saveWordsToDb = () => {

};

module.exports = { getWordsFromDictionary, getFreqAndRootWords, saveWordsToDb }