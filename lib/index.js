function Commissar() {
  var commissar = {};
  var router = require('routes')();
  var allSubscriptions = {};
  var allActions = {};

  commissar.defineState = function(uri, stateHandler) {
    var handler = stateHandler();
    router.addRoute(uri, function() {
      return handler
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
    
    var match = router.match(uri);
    var result = match.fn().get();
    notifyOfChange(uri, result);
  };

  commissar.defineAction = function(name, fx) {
    allActions[name] = fx;
  };

  commissar.execute = function(actionName, data) {
    var actionFx = allActions[actionName];

    actionFx(data, function(stateUri, data) {
      var match = router.match(stateUri);

      match.fn().set(data, function(data) {
        notifyOfChange(stateUri, data);
      });
    });
  };

  return commissar;
}

module.exports = function() {
  return new Commissar();
};