// Slide 22

// Pending
let successfn  = (value) => value;

let rejectedfn = (reason) => reason;

// A promise is an object that represents the eventual completion (or failure) 
// of an asynchronous operation and its resulting value.
let promise1   = new Promise(successfn, rejectedfn); // Promise { <pending> }

console.log(promise1);
// Output: “Promise { <pending> }”