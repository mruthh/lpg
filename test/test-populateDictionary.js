const chai = require('chai');
const expect = require('chai').expect;

const populateDictionary = require('../databases/populateDictionary');

describe('PopulateDictionary', function(){
  it('is a function', function(){
    expect(populateDictionary).to.be.a('function');
  });
});
