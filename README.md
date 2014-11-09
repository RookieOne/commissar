# Commissar

Prototype on how to simplify the unidirectional nature of Flux. Goal is to prevent misdirection of the data flow and provide clearer guidance on how the flow should work.

Example

```javascript
// creates an instance of commissar
var commissar = require('commissar')();

// defines state using an URI format
commissar.defineState('/message', function() {
  var message = 'Hello Comrade!';
  return {
    get: function() {
      return message;
    },
    set: function(value, next) {
      message = value;
      next(message);
    }
  }
});

// defines an action that can change state
commissar.defineAction('Change Message', function(data, setState) {
  // setState in an action is the ONLY way to change state
  setState('/message', 'Good bye Comrade!');
});

var message = 'Hello World';
console.log(message); // 'Hello World'

// subscribes to state changes using an URI format
// immediate calls 'get' for the current value
// calls fx on subsequent changes
commissar.subscribe('/message', function(msg) {
  message = msg;
});

console.log(message); // 'Hello Comrade!'

// runs the defined action that will change state
commissar.execute('Change Message');

console.log(message); // 'Good bye Comrade!'
```