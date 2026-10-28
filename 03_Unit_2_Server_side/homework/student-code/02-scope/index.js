// 02-scope
// Run: node index.js

// --- Block scope: a variable only exists inside its braces ---
// Before running, write down what you think the last line prints.
const isLoggedIn = true;

if (isLoggedIn) {
  const greeting = "welcome back";
}

console.log(greeting); // ReferenceError: greeting is not defined

// TODO: uncomment when you reach this step.
// --- Function scope: every call gets its own private variables ---
// const makeGreeting = (name) => {
//   const message = "hello " + name;
//   return message;
// };
//
// console.log(makeGreeting("Ana"));
// console.log(makeGreeting("Ben"));

// TODO: uncomment when you reach this step.
// --- Shadowing: an inner variable hides an outer one of the same name ---
// const message = "I am the outer one";
//
// const shadowDemo = () => {
//   const message = "I am the inner one";
//   return message;
// };
//
// console.log(shadowDemo());
// console.log(message);
