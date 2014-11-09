var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;
var Commissar = require('../../lib');

Commissar.define('/leaders', {
  get: function() {
    return ['Lenin', 'Stalin', 'Putin'];
  }
});

lab.experiment('defining state', function() {
  lab.test('should return array of values for state', function(done) {
    Commissar.subscribe('/leaders', function(leaders) {
      expect(leaders).to.have.members(['Lenin', 'Stalin', 'Putin']);
      done();
    });
  });
});
