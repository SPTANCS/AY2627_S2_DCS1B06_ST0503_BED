// Slide 20

 // Declaring a function with "async" means it will
 // ALWAYS return a Promise, even if we return a normal value.
async function test() {
    return "hello";
}

// test() returns a Promise, NOT the string "hello" directly.
// The Promise is already fulfilled with the value "hello".
console.log(test());
// Output: Promise { 'hello' } (Node.js)

// "await" obtains the fulfilled value from the Promise.
// It pauses the surrounding async execution until the
// Promise settles, then returns the resolved value.
console.log(await test());
// Output: hello