var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;

lab.experiment('testing subscribe', function() {
  var Commissar = {};

  lab.before(function(done) {
    Commissar = require('../../lib').createInstance();

    Commissar.defineState('/message');

    Commissar.defineAction('set-message', function(deferred, data, state) {
      state.set('/message', 'Hello Comrade!');
      deferred.resolve();
    });
    done();
  });

  lab.test('should return value of state', function(done) {
    var subscription1 = "";
    var subscription2 = "";
    var check = function() {
      if (subscription1 !== "" && subscription2 !== "") {
        expect(subscription1).to.include('Hello Comrade!');
        expect(subscription2).to.include('Hello Comrade!');
        done();
      }
    };
    Commissar.subscribe('/message', function(message) {
      subscription1 = message;
      check();
    });
    Commissar.subscribe('/message', function(message) {
      subscription2 = message;
      check();
    });
    Commissar.execute('set-message');
  });
});
