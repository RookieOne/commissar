var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;

lab.experiment('actions', function() {
  var Commissar = {};

  lab.before(function(done) {
    Commissar = require('../../lib').createInstance();

    Commissar.defineState('/message', function() {
      var message = 'Hello Comrade!';
      return {
        get: function(params) {
          return message;
        },
        set: function(newValue, params) {
          message = newValue;
        }
      };
    });

    Commissar.defineAction('get-messages', function(deferred, data, state) {
      state.set('/message', 'Good bye Comrade!');
      deferred.resolve();
    });

    done();
  });

  lab.test('sync set state', function(done) {
    var messages = [];
    Commissar.subscribe('/message', function(message) {
      messages.push(message);

      if (messages.length == 2) {
        expect(messages).to.include('Hello Comrade!');
        expect(messages).to.include('Good bye Comrade!');
        done();
      }
    });
    Commissar.execute('get-messages');
  });
});
