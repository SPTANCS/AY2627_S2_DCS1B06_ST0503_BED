// Given the following callback function.
let callbackFn = (err, result) => {
    if (err) {
        console.log("Error caught:", err.message);
    } else {
        console.log("Result:", result);
    }
}

// Required: Complete the code in divide function.
//         Call the callback function in your code.
function divide(x, y, callback) {
    if (y == 0) {
        // Insert your code here.




    }
    callback(null, x / y);
}

// Invoke the divide function with a callback to handle the result or error
divide(10, 0, callbackFn); // Expected output: "Error caught: Division by zero"
divide(20, 5, callbackFn); // Expected output: "Result: 4"