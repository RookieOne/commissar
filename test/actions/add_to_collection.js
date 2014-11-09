var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;

lab.experiment('actions', function() {
  var Commissar = {};

  lab.before(function(done) {
    Commissar = require('../../lib')();

    Commissar.defineState('/submarines', function() {
      var submarines = ['Red October'];
      return {
        get: function(params) {
          return submarines;
        },
        set: function(params, newValue, next) {
          submarines = newValue;
          next(submarines);
        }
      }
    });

    Commissar.defineAction('Add Sub', function(data, state) {
      var newSub = data;
      var submarines = state.get('/submarines');
      submarines.push(newSub);
      state.set('/submarines', submarines);
    });

    done();
  });

  lab.test('add to collection', function(done) {
    var count = 0;
    Commissar.subscribe('/submarines', function(submarines) {
      count += 1;

      if (count == 2) {
        expect(submarines).to.include('Red October');
        expect(submarines).to.include('K-19');
        done();
      }
    });
    Commissar.execute('Add Sub', 'K-19');
  });
});
