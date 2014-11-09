function Commissar() {
  var commissar = {};

  require('./state')(commissar);
  require('./actions')(commissar);

  commissar.createTestableInstance = function() {
    return new Commissar();
  };

  return commissar;
}

var commissar = new Commissar();
module.exports = exports = commissar;