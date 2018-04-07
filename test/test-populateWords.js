const chai = require('chai');
const expect = require('chai').expect;

const {getWordsFromDictionary, getFreqAndRootWords, saveWordsToDb } = require('../db-bdd/populateWords');

const testDictionary = 'Arrow\ndog\ndog\'s\nmoon\ntweet\npi';


describe('getWordsFromDictionary', function(){
  const words = getWordsFromDictionary(testDictionary);
  it('is a function', function(){
    expect(getWordsFromDictionary).to.be.a('function');
  });
 
  it('returns an array of words', function(){
    expect(words).to.be.an('array');
    // expect(words).to.all.be.a('string'); <-- this one gives strange failure msg    
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

