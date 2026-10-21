// Slide 19
// let delayedFunction = () => {console.log("Message received!")};
// async function delayed() {
//     await new Promise((resolve) => {
//         setTimeout(resolve, 2000);
//     }).then(delayedFunction);
//     console.log("delayedFunction has completed.");
// }
// delayed();

// A simple function that displays a message
let delayedFunction = () => {
    console.log("3. Message received after a few seconds!");
};

// The async keyword allows us to use await inside this function
async function delayed() {

    console.log("2. Starting the delay...");

    // Create a Promise that will resolve after 2 seconds
    // await pauses the execution of THIS async function
    // until the Promise is fulfilled.
    await new Promise((resolve) => {

        // setTimeout schedules the callback to run after 2000ms
        setTimeout(() => {
            console.log("4. Timer has finished!");

            // Resolve the Promise to signal that it has completed
            // Without resolve(), the await would wait indefinitely
            resolve();

        }, 2000);
    });

    // This code only executes AFTER the Promise is fulfilled
    delayedFunction();

    console.log("5. delayedFunction has completed.");
}

// Main program starts here
console.log("1. Main program starts");

// Call the async function
// Notice that we are NOT using await here
delayed();

// This line executes immediately without waiting for delayed()
// because calling an async function does not block the main program
console.log("3. Main program continues while waiting...\n");