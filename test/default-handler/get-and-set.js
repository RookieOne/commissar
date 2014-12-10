var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;

lab.experiment('default handler', function() {
  var Commissar = {};

  lab.before(function(done) {
    Commissar = require('../../lib').createInstance();

    Commissar.defineState('/message');

    Commissar.defineAction('get-messages', function(deferred, data, state) {
      state.set('/message', 'Hello Comrade!');
      deferred.resolve();
    });

    done();
  });

  lab.test('get and set', function(done) {
    var messages = [];
    Commissar.subscribe('/message', function(message) {
      messages.push(message);

      if (messages.length == 1) {
        expect(messages).to.include('Hello Comrade!');
        done();
      }
    });
    Commissar.execute('get-messages');
  });
});
