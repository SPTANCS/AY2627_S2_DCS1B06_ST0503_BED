// Slide 15
//
// https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout

let delayedFunction = () => console.log("Message received after a few seconds!");

setTimeout(delayedFunction, 2000);
console.log("Here !!!");