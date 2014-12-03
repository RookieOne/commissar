var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;

lab.experiment('error message if cant find action', function() {
  var Commissar = {};

  lab.before(function(done) {
    Commissar = require('../../lib').createInstance();
    done();
  });

  lab.test('should have error message', function(done) {
    Commissar.execute('some-unknown-action');
    done();
  });
});
