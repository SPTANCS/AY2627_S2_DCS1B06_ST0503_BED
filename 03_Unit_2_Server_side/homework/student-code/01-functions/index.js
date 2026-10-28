// 01-functions
// Run: node index.js

// --- The problem: the tax rule written out three times ---
console.log(3 * 1.09); // tax on a $3 item
console.log(7 * 1.09); // tax on a $7 item
console.log(12 * 1.09); // tax on a $12 item

// TODO: uncomment when you reach this step.
// --- A function lets you write the rule once and use it by name ---
// function withTax(price) {
//   return price * 1.09;
// }
//
// console.log(withTax(3));
// console.log(withTax(7));
// console.log(withTax(12));

// TODO: uncomment when you reach this step.
// --- Two ways to spell the same function: declaration vs arrow ---
// function withTaxA(price) {
//   return price * 1.09;
// }
//
// const withTaxB = (price) => {
//   return price * 1.09;
// };
//
// console.log(withTaxA(10));
// console.log(withTaxB(10));

// TODO: uncomment when you reach this step.
// --- Functions as arguments: a function is a value you can hand over ---
// const twice = (task) => {
//   task();
//   task();
// };
//
// twice(() => {
//   console.log("hello");
// });

// TODO: uncomment when you reach this step.
// --- JavaScript works the same way: setTimeout takes a function ---
// setTimeout(() => {
//   console.log("one second later");
// }, 1000);
