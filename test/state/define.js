var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;
var Commissar = require('../../lib');

Commissar.define('/message', {
  get: function() {
    return 'Hello Comrade!';
  }
});

lab.experiment('defining state', function() {
  lab.test('should return value of state', function(done) {
    Commissar.subscribe('/message', function(message) {
      var msg = message;
      expect(msg).to.equal('Hello Comrade!');
      done();
    });
  });
});
