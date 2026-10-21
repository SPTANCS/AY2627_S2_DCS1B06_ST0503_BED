// Slide 23
// Rejected
let successfn  = (value) => value;
let rejectedfn = (reason) => reason;

let promise1   = Promise.reject("Failed");

// let promise1 = new Promise((resolve, reject) => {
//     reject("Failed");
// });

promise1.then(successfn, rejectedfn);
console.log(promise1);
// Output: "Promise { <rejected> 'Failed' }"