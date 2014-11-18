var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;

lab.experiment('sync action', function() {
  var Commissar = {};

  lab.before(function(done) {
    Commissar = require('../../lib').createInstance();

    Commissar.defineState('/message');

    Commissar.defineAction('Get Messages', function(data, state) {
      state.set('/message', 'Hello Comrade!');
    });

    done();
  });

  lab.test('should change state', function(done) {
    var messages = [];
    Commissar.subscribe('/message', function(message) {
      messages.push(message);

      if (messages.length == 2) {
        expect(messages).to.include(null);
        expect(messages).to.include('Hello Comrade!');
        done();
      }
    });
    Commissar.execute('Get Messages');
  });
});
