// Slide 22
// Pending
// let successfn  = (value) => value;
// let rejectedfn = (reason) => reason;
// let promise1   = new Promise(successfn, rejectedfn);
// console.log(promise1);


// Slide 22 - Understanding the Pending State
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
//
// A Promise represents the eventual completion or failure
// of an asynchronous operation.
//
// The Promise constructor accepts ONE argument:
// an executor function.
//
// JavaScript automatically passes two functions
// into the executor:
// resolve() - changes the Promise to fulfilled
// reject()  - changes the Promise to rejected

let promise1 = new Promise(function(resolve, reject) {

    // Neither resolve() nor reject() is called.

    // Therefore, the Promise remains in the pending state.

});

console.log(promise1);

// Output (Node.js):
// Promise { <pending> }