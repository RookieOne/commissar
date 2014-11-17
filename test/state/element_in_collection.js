var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;
var _ = require('underscore');

lab.experiment('actions', function() {
  var Commissar = {};

  lab.before(function(done) {
    Commissar = require('../../lib').createInstance();

    Commissar.defineState('/submarines', function(state) {
      return {
        init: function() {
          state.submarines = [{ id: 1, name: 'Red October' }, { id: 2, name: 'K-19' }];
        },
        get: function(params) {
          return state.submarines;
        },
        set: function(params, newValue) {
          state.submarines = newValue;
        }
      };
    });

    Commissar.defineState('/submarines/:id', function(state) {
      return {
        get: function(params) {
          var id = parseInt(params.id);
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
