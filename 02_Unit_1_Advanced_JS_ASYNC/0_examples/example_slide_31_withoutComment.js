// Slide 31 - Understanding .catch() and .finally()

// Returns a Promise that resolves after 3 seconds.
let resolvefn = function (result) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log("#" + result + " resolved!");
            resolve(result + 1); // Pass the next value to the chain.
        }, 3000);
    });
};

// Returns a Promise that rejects after 3 seconds.
let rejectfn = function (result) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("#" + result + " rejected!");
            reject(result + 1); // Pass the rejection reason.
        }, 3000);
    });
};

// Handles any rejection that reaches .catch().
let catchfn = function (result) {
    console.log("Caught final rejection! #" + result + " rejected!");
};

// Starts the Promise chain and demonstrates .then(), .catch(), and .finally().
console.clear(); // Clear the console for clarity.

// Change to false to test the fulfilled scenario.
let shouldReject = true;

let promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (shouldReject) {
                console.log("#1 rejected!");
                reject(2);
            } else {
                console.log("#1 resolved!");
                resolve(2);
            }
        }, 2000);
    })
    .then(resolvefn, rejectfn)
    .then(resolvefn, rejectfn)
    .then((result) => {
        console.log("#" + result + " resolved!");
    })
    .catch(catchfn)
    .finally(() => {
        console.log("End of Promise");
    });
