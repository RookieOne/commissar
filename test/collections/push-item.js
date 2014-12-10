var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;

lab.experiment('collections', function() {
  var Commissar = {};

  lab.before(function(done) {
    Commissar = require('../../lib').createInstance();

    Commissar.defineState('/submarines', function(state) {
      return {
        init: function() {
          state.submarines = ['Red October'];
        },
        get: function() {
          return state.submarines;
        },
        set: function(params, newValue) {
          state.submarines = newValue;
        },
        push: function(value) {
          state.submarines.push(value);
        }
      };
    });

    Commissar.defineAction('add-sub', function(deferred, data, state) {
      var newSub = data;
      state.push('/submarines', newSub);
      deferred.resolve();
    });

    done();
  });

  lab.test('push item', function(done) {
    var count = 0;
    Commissar.subscribe('/submarines', function(submarines) {
      count += 1;

      if (count == 2) {
        expect(submarines).to.include('Red October');
        expect(submarines).to.include('K-19');
        done();
      }
    });
    Commissar.execute('add-sub', 'K-19');
  });
});
