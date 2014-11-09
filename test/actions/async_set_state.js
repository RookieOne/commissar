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
          message = newValue;
          next(message);
        }
      }
    });

    Commissar.defineAction('Get Messages', function(data, setState) {
      setTimeout(function() {
        setState('/message', 'Hold up Comrade!');
      }, 100);
    });

    done();
  });

  lab.test('should change state', function(done) {
    var messages = [];
    Commissar.subscribe('/message', function(message) {
      messages.push(message);

      if (messages.length == 2) {
        expect(messages).to.include('Hello Comrade!');
        expect(messages).to.include('Hold up Comrade!');
        done();
      }
    });
    Commissar.execute('Get Messages');
  });
});
