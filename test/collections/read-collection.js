var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;

lab.experiment('collections', function() {
  var Commissar = {};

  lab.before(function(done) {
    Commissar = require('../../lib').createInstance();

    Commissar.defineState('/leaders', function() {
      return {
        get: function(params) {
          return ['Lenin', 'Stalin', 'Putin'];
        }
      };
    });

    done();
  });

  lab.test('read collection', function(done) {
    Commissar.subscribe('/leaders', function(leaders) {
      expect(leaders).to.have.members(['Lenin', 'Stalin', 'Putin']);
      done();
    });
  });
});
