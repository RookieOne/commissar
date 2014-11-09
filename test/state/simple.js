var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;
var Commissar = require('../../lib').createTestableInstance();

Commissar.defineState('/message', function() {
  return {
    get: function() {
      return 'Hello Comrade!';
    }
  }
});

lab.experiment('defining state', function() {
  lab.test('should return value of state', function(done) {
    Commissar.subscribe('/message', function(message) {
      console.log('message ?', message);
      expect(message).to.equal('Hello Comrade!');
      done();
    });
  });
});
