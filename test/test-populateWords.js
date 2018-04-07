const chai = require('chai');
const expect = require('chai').expect;

const {getWordsFromDictionary, getFreqAndRootWords, saveWordToDb } = require('../db-bdd/populateWords');

const testDictionary = 'Arrow\ndog\ndog\'s\nmoon\ntweet\npi';


describe('getWordsFromDictionary', function(){
  const words = getWordsFromDictionary(testDictionary);
  it('is a function', function(){
    expect(getWordsFromDictionary).to.be.a('function');
  });
 
  it('returns an array of words', function(){
    expect(words).to.be.an('array');
    expect(words).to.all.satisfy(word => typeof word === 'string');
    expect(words).to.contain('dog');
    expect(words).to.contain('tweet');
  });

  it('does not return capitalized words', function(){
    expect(words).to.not.contain('Arrow');    
  });
  
  it('does not return words with special characters', function(){
    expect(words).to.not.contain('dog\'s');
  });

  it('only contains words of at least three letters', function(){
    expect(words).to.all.have.lengthOf.at.least(3);
  })

});

describe('getFreqAndRootWords', function(){
  const dogWithFreqAndRoot = getFreqAndRootWords('dog');
  it('returns an object with rootWord, name, and frequency properties', function(){
    expect(dogWithFreqAndRoot).to.be.an('object');
    expect(dogWithFreqAndRoot).to.have.property('rootWord');
    expect(dogWithFreqAndRoot).to.have.property('frequency');
    expect(dogWithFreqAndRoot).to.have.property('name');
  });
});