// Slide 23 - Understanding Promise, resolve(), reject(), and .then()

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
// This function is called when the Promise is FULFILLED (resolved).
// It receives the value passed to resolve() as its argument.
let successfn = (msg) => {
    console.log(`The promise resolved with message: ${msg}`);
};

// This function is called when the Promise is REJECTED.
// It receives the reason passed to reject() as its argument.
let rejectedfn = (reason) => {
    console.log(`The promise rejected with reason: ${reason}`);
};


// This function accepts a bid amount and RETURNS a Promise.
// The caller can use .then() to handle the eventual result.
let checkBid = (placedBid) => {

    // The Promise constructor takes ONE argument:
    // an executor function that receives resolve and reject.
    //
    // resolve and reject are functions provided by JavaScript.
    // We call one of them to settle the Promise.
    return new Promise((resolve, reject) => {

        // Imagine this minimum bid is retrieved from a database.
        // Database operations may take time, so Promises are useful
        // for handling such asynchronous operations.
        //
        // NOTE: This example is synchronous, but we use a Promise
        // to demonstrate how resolve() and reject() work.
        const minimumBid = 100;

        if (placedBid >= minimumBid) {

            // resolve() changes the Promise state:
            // PENDING --> FULFILLED
            //
            // The message passed to resolve() becomes the
            // fulfilled value of the Promise.
            //
            // This value will be passed to successfn()
            // through .then().
            resolve(`Success, bid accepted with value: ${placedBid}`);

        } else {

            // reject() changes the Promise state:
            // PENDING --> REJECTED
            //
            // The message passed to reject() becomes the
            // rejection reason of the Promise.
            //
            // This reason will be passed to rejectedfn()
            // through .then().
            reject(`Bid too low (${placedBid}). Minimum bid is ${minimumBid}.`);
        }

    });
};

console.clear();

// Generate a random bid between 1 and 200.
let randomBid = Math.floor(Math.random() * 200) + 1;


// Calling checkBid() RETURNS a Promise.
//
// .then() registers callback functions to handle
// the result of the Promise.
//
// Syntax:
// promise.then(onFulfilled, onRejected);
//
// FIRST argument  -> successfn (called when fulfilled)
// SECOND argument -> rejectedfn (called when rejected)
//
// IMPORTANT:
// We pass the function names WITHOUT parentheses.
// JavaScript will call the appropriate function
// when the Promise is settled.
//
// If resolve(message) is called:
//     --> successfn(message) will execute.
//
// If reject(reason) is called:
//     --> rejectedfn(reason) will execute.
//
// Only ONE of these callbacks will execute for this Promise.

checkBid(randomBid).then(successfn, rejectedfn);




