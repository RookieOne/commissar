var crossroads = require('crossroads');

module.exports = function(commissar) {
  var allSubscriptions = {};

  commissar.define = function(uri, stateHandler) {
    crossroads.addRoute(uri, function() {
      var result = stateHandler.get();
      notifyOfChange(uri, result);
    });
  };

  function notifyOfChange(uri, newState) {
    var subscribers = getSubscriptions(uri);
    subscribers.forEach(function(subscriptionHandler) {
      subscriptionHandler(newState);
    });
  }

  function getSubscriptions(uri) {
    var subscribers = allSubscriptions[uri];
    if (subscribers === undefined) {
      subscribers = allSubscriptions[uri] = [];
    }
    return subscribers;
  }

  commissar.subscribe = function(uri, cb) {
    var subscriptions = getSubscriptions(uri);
    subscriptions.push(cb);
    crossroads.parse(uri);
  };

};
