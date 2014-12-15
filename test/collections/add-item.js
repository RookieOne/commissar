var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;

lab.experiment('collections', function() {
  var Commissar = {};

  lab.before(function(done) {
    Commissar = require('../../lib').createInstance();

    Commissar.defineState('/submarines', function() {
      var submarines = ['Red October'];
      return {
        get: function(params) {
          return submarines;
        },
        set: function(newValue, params) {
          submarines = newValue;
        }
      };
    });

    Commissar.defineAction('add-sub', function(deferred, data, state) {
      var newSub = data;
      var submarines = state.get('/submarines');
      submarines.push(newSub);
      state.set('/submarines', submarines);
      deferred.resolve();
    });

    done();
  });

  lab.test('add item', function(done) {
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
