// Given the following callback function.
let callbackFn = (err, result) => {
    if (err) { // not null, there is an error and no result
        console.log("Error caught:", err.message);
    } else {  // err is null, there is a result
        console.log("Result:", result);
    }
}

// Required: Complete the code in divide function.
//         Call the callback function in your code.
function divide(x, y, callback) {
    if (y == 0) { // there is an error cannot divide by 0
        // Insert your code here.
        callback( { message: 'Division by zero'} , null);
        return;
    }
    callback(null, x / y);
}

// Invoke the divide function with a callback to handle the result or error
divide(10, 0, callbackFn); // Expected output: "Error caught: Division by zero"
divide(20, 5, callbackFn); // Expected output: "Result: 4"