function Commissar() {
  var commissar = {};

  require('./state')(commissar);

  return commissar;
}

module.exports = function() {
  return new Commissar();
};