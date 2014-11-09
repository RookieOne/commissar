var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;

lab.experiment('defining state', function() {
  var Commissar = {};
  
  lab.before(function(done) {
    Commissar = require('../../lib')();

    Commissar.defineState('/leaders', function() {
      return {
        get: function() {
          return ['Lenin', 'Stalin', 'Putin'];
        }
      }
    });

    done();
  });

  lab.test('should return array of values for state', function(done) {
    Commissar.subscribe('/leaders', function(leaders) {
      expect(leaders).to.have.members(['Lenin', 'Stalin', 'Putin']);
      done();
    });
  });
});
