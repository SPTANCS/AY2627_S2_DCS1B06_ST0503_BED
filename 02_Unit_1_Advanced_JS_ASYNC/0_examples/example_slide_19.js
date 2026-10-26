// Slide 19
// A simple function that displays a message
let delayedFunction = (message) => {
    console.log("3. Message received after a few seconds: " + message);
};

// The async keyword allows us to use await inside this function
async function delayed() {

    console.log("2. Starting the delay...");

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    // Create a Promise that will resolve after 2 seconds
    // await pauses the execution of THIS async function
    // until the Promise is fulfilled.
    // result will hold the value passed to resolve() when the Promise is fulfilled.
    let result = await new Promise((resolve) => {

        // setTimeout schedules the callback to run after 2000ms
        setTimeout(() => {
            console.log("4. Timer has finished!");

            // Resolve the Promise to signal that it has completed
            // Without resolve(), the await would wait indefinitely
            resolve("Promise fulfilled after 2 seconds");
        }, 2000);
    });

    // This code only executes AFTER the Promise is fulfilled
    // Call the delayedFunction with the result from the Promise
    delayedFunction(result);

    console.log("5. delayedFunction has completed.");
}

// Main program starts here
console.log("1. Main program starts");

// Call the async function
// Notice that we are NOT using await here
// This means the main program will continue executing without waiting for delayed() to finish
delayed();

// This line executes immediately without waiting for delayed()
// because calling an async function does not block the main program
console.log("3. Main program continues while waiting...\n");