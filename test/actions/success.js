var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;

lab.experiment('success', function() {
  var Commissar = {};

  lab.before(function(done) {
    Commissar = require('../../lib').createInstance();

    Commissar.defineState('/message');

    Commissar.defineAction('Set Message', function(deferred, data, state) {
      state.set('/message', 'Hello Comrade!');
      deferred.resolve();
    });

    done();
  });

  lab.test('should change state', function(done) {
    var messages = [];
    // Commissar.subscribe('/message', function(message) {
    //   messages.push(message);
    //
    //   if (messages.length == 2) {
    //     expect(messages).to.include('Hello Comrade!');
    //     expect(messages).to.include('Good bye Comrade!');
    //     done();
    //   }
    // });
    Commissar.execute('Set Message').then(function() {
      done();
    });
  });
});
