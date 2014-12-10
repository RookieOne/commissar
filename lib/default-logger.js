module.exports = function() {
  return {
    log: function(message) {
      console.log(arguments[0], arguments[1]);
    }
  };
};
