# Commissar

Prototype on how to simplify the unidirectional nature of Flux. Goal is to prevent misdirection of the data flow and provide clearer guidance on how the flow should work.

Example

```
  // creates an instance of commissar. for applications, you probably want to make this a singleton.
  var commissar = require('commissar')();

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

  commissar.defineAction('Change Message', function(data, setState) {
    setState('/message', 'Good bye Comrade!');
  });

  var message = 'Hello World';
  console.log(message); // 'Hello World'

  commissar.subscribe('/message', function(msg) {
    message = msg;
  });

  console.log(message); // 'Hello Comrade!'

  commissar.execute('Change Message');

  console.log(message); // 'Good bye Comrade!''
```