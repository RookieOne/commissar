module.exports = function(commissar) {
  return {
    subscriptions: [],
    componentDidMount: function () {
      if (this.setSubscriptions) {
        this.setSubscriptions();
      }
    },
    subscribe: function(uri, cb) {
      this.subscriptions.push({
        uri: uri,
        callback: cb
      });
      commissar.subscribe(uri, cb);
    },
    componentWillUnmount: function() {
      this.subscriptions.forEach(function(subscription) {
        commissar.unsubscribe(subscription.uri, subscription.callback);
      });
    }
  };
};
