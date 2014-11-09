module.exports = function(commissar) {
  // var allActions = {};

  // commissar.defineAction = function(name, fx) {
  //   allActions[name] = fx;
  // };

  // commissar.execute = function(actionName, data) {
  //   console.log('execute', actionName);
  //   var actionFx = allActions[actionName];
  //   if (actionFx === undefined) {
  //     // raise error?
  //     return;
  //   }

  //   actionFx(data, function());
  // };

  function getQuery(name) {
    var queryFx = allQueries[name];
    return queryFx;
  }

};
