var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;
var _ = require('underscore');

lab.experiment('collections', function() {
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
        set: function(newValue, params) {
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
        },
        set: function(newValue, params) {
          var id = parseInt(params.id);
          var subs = _.reject(state.submarines, function(s) { return s.id == id; });
          subs.push(newValue);
          state.submarines = subs;
        }
      };
    });

    Commissar.defineAction('change-sub-name', function(deferred, data, state) {
      var sub = state.get('/submarines/' + data.id);
      sub.name = data.name;
      state.set('/submarines/' + data.id, sub);
      deferred.resolve();
    });

    done();
  });

  lab.test('update item', function(done) {
    var count = 0;
    Commissar.subscribe('/submarines/1', function(submarine) {
      count += 1;
      if (count == 2) {
        expect(submarine.name).to.equal('Kiev');
        done();
      }
    });

    Commissar.execute('change-sub-name', { id: 1, name: 'Kiev' });
  });
});
