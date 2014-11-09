var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;

lab.experiment('running query', function() {
  var Commissar = {};

  lab.before(function(done) {
    Commissar = require('../../lib')();

    Commissar.defineState('/message', function() {
      var message = 'Hello Comrade!';
      return {
        get: function() {
          return message;
        },
        set: function(newValue, next) {
          console.log('set message', message);
          message = newValue;
          console.log('set message', message);
          next(message);
        }
      }
    });

    Commissar.defineAction('Get Messages', function(data, setState) {
      setState('/message', 'Good bye Comrade!');
    });

    done();
  });

  lab.test('should change state', function(done) {
    var messages = [];
    Commissar.subscribe('/message', function(message) {
      messages.push(message);

      if (messages.length == 2) {
        expect(messages).to.include('Hello Comrade!');
        expect(messages).to.include('Good bye Comrade!');
        done();
      }
    });
    Commissar.execute('Get Messages');
  });
});
