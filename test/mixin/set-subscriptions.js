var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;

lab.experiment('mixin', function() {
  var Commissar = {};
  var mixin;

  lab.before(function(done) {
    Commissar = require('../../lib').createInstance();

    Commissar.defineState('/message');
    Commissar.defineAction('set-message', function(deferred, data, state) {
      state.set('/message', data.message);
      deferred.resolve();
    });

    done();
  });

  lab.test('update element in collection', function(done) {
    var mixin = Commissar.Mixin(Commissar);
    var messages = [];
    mixin.setSubscriptions = function() {
      this.subscribe('/message', function(message) {
        expect(message).to.include('Hello Comrade!');
        done();
      }.bind(this));
    }.bind(mixin);
    mixin.componentDidMount();

    Commissar.execute('set-message', { message: 'Hello Comrade!' });
  });
});
