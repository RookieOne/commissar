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
        get: function(params) {
          return state.submarines;
        },
        set: function(params, newValue, next) {
          state.submarines = newValue;
          next(submarines);
        }
      }
    });

    Commissar.defineState('/submarines/:id', function(state) {
      return {
        get: function(params) {
          var id = parseInt(params.id);
          var sub = _.findWhere(state.submarines, { id: id });
          return sub;
        },
        set: function(params, newValue, next) {
          var id = parseInt(params.id);
          var subs = _.reject(state.submarines, function(s) { return s.id == id; });
          subs.push(newValue);
          state.submarines = subs;
          next(newValue);
        }
      }
    });

    Commissar.defineAction('Change Sub Name', function(data, state) {
      var sub = state.get('/submarines/' + data.id);
      sub.name = data.name;
      state.set('/submarines/' + data.id, sub);
    });

    done();
  });

  lab.test('update element in collection', function(done) {
    var count = 0;
    Commissar.subscribe('/submarines/1', function(submarine) {
      count += 1;
      if (count == 2) {
        expect(submarine.name).to.equal('Kiev');
        done();
      }
    });

    Commissar.execute('Change Sub Name', { id: 1, name: 'Kiev' });
  });
});
