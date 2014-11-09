var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;

lab.experiment('test', function() {
  lab.test('the tests work', function(done) {
    expect(2).to.equal(2);
    done();
  });
});
