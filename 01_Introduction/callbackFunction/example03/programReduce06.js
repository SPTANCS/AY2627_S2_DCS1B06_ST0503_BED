const ARRAY_SIZE = 5;
const numberArr = new Array(ARRAY_SIZE);

for (let i = 0; i < numberArr.length; i++) {
  numberArr[i] = Math.floor(Math.random() * 100) + 1;
}

console.clear();
console.log("Values in Array");
console.table(numberArr);

const sum = numberArr.reduce((currentSum, currentValue) => currentSum + currentValue, 0);

const max = numberArr.reduce((currentHighest, currentValue) => {
  if (currentValue > currentHighest) {
    return currentValue;
  } else {
    return currentHighest;
  }
}, numberArr[0]);

// const max = numberArr.reduce((currentHighest, currentValue) => {
//   if (currentValue > currentHighest) {
//     return currentValue;
//   } else {
//     return currentHighest;
//   }
// });

//const max = numberArr.reduce((currentHighest, currentValue) => (currentValue > currentHighest ? currentValue : currentHighest));

console.log("Sum:", sum);
console.log("Max:", max);

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce