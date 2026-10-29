// Given the following array, use the map() method 
// to convert each dollar amount to cents.

let stockPrices = [32.11, 22.12, 45.12, 31.20, 32.50, 44.12];

// Step 1: Write a function to multply the parameter by 100
//         and return the multiplied value.

// version 1
// function multiplyFunc(element, index, arrray) {
//   return element * 100;
// }

// version 2
// function multiplyFunc(element) {
//   return element * 100;
// }

// version 3
// const multiplyFunc = (element) => {
//   return element * 100;
// }

// version 4
const multiplyFunc = element => element * 100;

// Step 2: Use the map() method to apply the function to 
//         each element in the stockPrices array.
//         Assign the returned value of map() function to 
//         outputArray variable.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

//let outputArray = stockPrices.map(multiplyFunc);

let outputArray = stockPrices.map(element => element * 100);

console.clear();
console.log(outputArray);

// Expected output: [3211, 2212, 4512, 3120, 3250, 4412]