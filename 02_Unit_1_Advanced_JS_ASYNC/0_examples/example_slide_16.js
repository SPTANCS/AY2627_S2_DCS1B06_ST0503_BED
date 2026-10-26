// Slide 16
// https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout
//
// When an asynchronous function is executed, JavaScript does not wait 
// for the function to complete before running the next line of code!

let delayedFunction = () => console.log("Message received after a few seconds!");

function delayed() {
    setTimeout(delayedFunction, 2000);
    console.log("delayedFunction has completed.");
}

console.clear();
delayed();

// Output:
// delayedFunction has completed.
// Message received!