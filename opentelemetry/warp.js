const shimmer = require('shimmer');

// Original function
const myObj1 = {
  hello: function (name) {
    console.log(`Hello, ${name}`);
  }
};

// Patch the 'hello' function
shimmer.wrap(myObj1, 'hello', function (original) {
  return function (name) {
    console.log('Before the original function');
    original.call(this, name);  // Call the original function
    console.log('After the original function');
  };
});

// Calling the patched method
myObj1.hello('Alice');


const myObj2 = {
  greet: function (name, greeting) {
    console.log(`${greeting}, ${name}`);
  }
};

// Use shimmer to wrap the original function
shimmer.wrap(myObj2, 'greet', function (original) {
  return function () {
    console.log('Before the original function');
    
    // Use apply to call the original function, preserving the context and arguments
    original.apply(this, arguments);  
    
    console.log('After the original function');
  };
});

// Test the wrapped function
myObj2.greet('Alice', 'Hello');