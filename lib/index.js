var Q = require('q');

function createDefaultHandler(uri, state) {
  return {
    init: function() {
      state[uri] = undefined;
    },
    get: function(params) {
      return state[uri];
    },
    set: function(params, newValue) {
      state[uri] = newValue;
    },
    push: function(newValue) {
      state[uri].push(newValue);
    }
  };
}

function Commissar() {
  var commissar = {};
  var router = require('routes')();
  var allSubscriptions = {};
  var allActions = {};
  var state = {};

  commissar.defineState = function(uri, stateHandler) {
    var handler;
    if (stateHandler === undefined) {
      handler = createDefaultHandler(uri, state);
    } else {
      handler = stateHandler(state);
    }
    if (handler.init) {
      handler.init();
    }
    router.addRoute(uri, function() {
      return handler;
    });
  };

  function notifyOfChange(uri, newState) {
    // don't return an undefined state; prevents all sorts of if undefined checks everywhere
    // state should only be undefined if it has never been set
    if (newState === undefined) {
      return;
    }
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
    var result = match.fn().get(match.params);
    notifyOfChange(uri, result);
  };

  commissar.defineAction = function(name, fx) {
    allActions[name] = fx;
  };

  commissar.execute = function(actionName, data) {
    var actionFx = allActions[actionName];
    if (actionFx === undefined) {
      console.log('Unknown action : ', {
        name: actionName,
        data: data
      });
      return;
    }

    var state = {
      get: function(stateUri) {
        var match = router.match(stateUri);

        return match.fn().get(match.params);
      },
      set: function(stateUri, newValue) {
        var match = router.match(stateUri);

        match.fn().set(match.params, newValue);
        notifyOfChange(stateUri, newValue);
      },
      push: function(stateUri, newValue) {
        var match = router.match(stateUri);

        match.fn().push(newValue, match.params);
        var list = match.fn().get(match.params);
        notifyOfChange(stateUri, list);
      }
    };

    var deferred = Q.defer();
    actionFx(deferred, data, state);
    return deferred.promise;
  };

  return commissar;
}

module.exports = new Commissar();

module.exports.createInstance = function() {
  return new Commissar();
};
