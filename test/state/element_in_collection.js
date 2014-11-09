var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;
var _ = require('underscore');

lab.experiment('actions', function() {
  var Commissar = {};

  lab.before(function(done) {
    Commissar = require('../../lib')();

    Commissar.defineState('/submarines', function(state) {
      return {
        init: function() {
          state.submarines = [{ id: 1, name: 'Red October' }, { id: 2, name: 'K-19' }];
        },
        get: function() {
          return state.submarines;
        },
        set: function(newValue, next) {
          state.submarines = newValue;
          next(submarines);
        }
      }
    });

    Commissar.defineState('/submarines/:id', function(state) {
      return {
        get: function(data) {
          var id = parseInt(data.id);
          var sub = _.findWhere(state.submarines, { id: id });
          return sub;
        }
      }
    });

    done();
  });

  lab.test('define state', function(done) {
    Commissar.subscribe('/submarines/1', function(submarine) {
      expect(submarine.name).to.equal('Red October');
      done();
    });
  });
});
