// Slide 23
// Resolved
let successfn  = (value) => value;
let rejectedfn = (reason) => reason;

let promise1   = Promise.resolve("Success");

// let promise1 = new Promise((resolve, reject) => {
//     resolve("Success");
// });

promise1.then(successfn,rejectedfn);

console.log(promise1);
// Output: "Promise { 'Success' }"

