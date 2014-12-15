var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;

lab.experiment('error message if cant find action', function() {
  var Commissar = {};
  var lastLog = {};
  lab.before(function(done) {
    Commissar = require('../../lib').createInstance();
    Commissar.logger = {
      log: function() {
        lastLog = arguments;
      }
    };
    done();
  });

  lab.test('should have error message', function(done) {
    Commissar.execute('some-unknown-action');
    expect(lastLog[1].name).to.equal('some-unknown-action');
    done();
  });
});
