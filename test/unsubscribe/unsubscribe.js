var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;

lab.experiment('testing subscribe', function() {
  var Commissar = {};

  lab.before(function(done) {
    Commissar = require('../../lib').createInstance();

    Commissar.defineState('/message');

    Commissar.defineAction('set-message', function(deferred, data, state) {
      state.set('/message', data);
      deferred.resolve();
    });
    done();
  });

  lab.test('should return value of state', function(done) {
    var subscription1 = "";
    var subscription2 = "";
    var check = function() {
      if (subscription1 === "Hello Comrade!" && subscription2 === "Good bye Comrade!") {
        expect(subscription1).to.include('Hello Comrade!');
        expect(subscription2).to.include('Good bye Comrade!');
        done();
      }
    };
    var sub1 = function(message) {
      subscription1 = message;
      check();
    };
    Commissar.subscribe('/message', sub1);
    var sub2 = function(message) {
      subscription2 = message;
      check();
    };
    Commissar.subscribe('/message', sub2);

    Commissar.execute('set-message', 'Hello Comrade!');
    Commissar.unsubscribe('/message', sub1);
    Commissar.execute('set-message', 'Good bye Comrade!');
  });
});
