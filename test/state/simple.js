var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;

lab.experiment('defining state', function() {
  var Commissar = {};

  lab.before(function(done) {
    Commissar = require('../../lib')();

    Commissar.defineState('/message', function() {
      return {
        get: function() {
          return 'Hello Comrade!';
        }
      }
    });

    done();
  });

  lab.test('should return value of state', function(done) {
    Commissar.subscribe('/message', function(message) {
      expect(message).to.equal('Hello Comrade!');
      done();
    });
  });
});
