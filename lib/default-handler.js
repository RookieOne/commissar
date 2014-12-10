module.exports = function(uri, state) {
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
};
