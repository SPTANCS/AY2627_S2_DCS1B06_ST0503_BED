// Slide 27
// V2: resolve() function added.
// However, the setTimeout() callbacks do NOT execute in sequence.

console.clear();

// Step 1: Create a Promise.
let promise = new Promise(function (resolve, reject) {

    // Schedule a callback to execute after approximately 2 seconds.
    setTimeout(function () {
        console.log("#1 resolved!");

        // Calling resolve() fulfils the Promise.
        // This allows the first .then() callback to execute.
        resolve("this is the resolved value");

    }, 2000);

})

// Step 2: The first .then() executes after the original Promise is fulfilled.
.then(function (onResolvedValue) {

    // onResolvedValue contains "this is the resolved value",
    // which was passed from resolve() in Step 1.

    // Schedule a callback to execute after approximately 3 seconds.
    setTimeout(function () {
        console.log("#2 resolved!");
    }, 3000);

    // IMPORTANT:
    // setTimeout() does NOT pause or block this function.
    // It only schedules the callback to execute later.
    //
    // Since there is no return statement, this .then() callback
    // immediately returns undefined.
    //
    // The new Promise returned by .then() is therefore
    // fulfilled with undefined, WITHOUT waiting for setTimeout().
})

// Step 3: The second .then() executes immediately after
// the Promise returned by the previous .then() is fulfilled.
.then(function (onResolvedValue) {

    // onResolvedValue is undefined because the previous
    // .then() callback did not return any value.

    // Schedule another callback to execute after approximately 1.5 seconds.
    setTimeout(function () {
        console.log("#3 resolved!");
    }, 1500);

    // Again, setTimeout() does NOT block execution.
    // This callback also returns undefined immediately.
    //
    // The Promise chain finishes WITHOUT waiting
    // for either of the two remaining timers.
});

// EXPECTED OUTPUT:
//
// After approximately 2 seconds:   #1 resolved!
// After approximately 3.5 seconds: #3 resolved!
// After approximately 5 seconds:   #2 resolved!
//
// WHY?
// Both timers in .then() are scheduled at approximately
// the same time (after the first Promise is fulfilled).
//
// The 1.5-second timer finishes before the 3-second timer.
//
// IMPORTANT LESSON:
// .then() waits for the Promise returned by the previous step
// to settle, but NOT for a setTimeout() callback to finish.
//
// To make the timers execute in sequence,
// each .then() must RETURN a Promise that settles
// only after its asynchronous operation is completed.
