var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;

lab.experiment('should return singleton', function() {
  lab.test('same object', function(done) {
    var c1 = require('../lib').createInstance();
    var c2 = require('../lib').createInstance();
    expect(c1).to.not.equal(c2);
    done();
  });
});
