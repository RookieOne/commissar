var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;

lab.experiment('should return singleton', function() {
  lab.test('same object', function(done) {
    var c1 = require('../lib')();
    var c2 = require('../lib')();
    expect(c1).to.not.equal(c2);
    done();
  });
});
