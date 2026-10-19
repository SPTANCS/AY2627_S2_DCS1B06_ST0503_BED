const ARRAY_SIZE = 5;
const numberArr = new Array(ARRAY_SIZE);

for (let i = 0; i < numberArr.length; i++) {
  numberArr[i] = Math.floor(Math.random() * 100) + 1;
}

console.clear();
console.log("Values in Array");
console.table(numberArr);

function myReduce(givenArray, combineFunction, startingValue) {
    let accumulator = startingValue;

    for (let i = 0; i < givenArray.length; i++) {
        accumulator = combineFunction(accumulator, givenArray[i]);
    }

    return accumulator;
}

const sum = myReduce(numberArr, (currentSum, currentValue) => currentSum + currentValue, 0);
const max = myReduce(numberArr, (currentHighest, currentValue) => (currentValue > currentHighest ? currentValue : currentHighest), numberArr[0]);

console.log("Sum:", sum);
console.log("Max:", max);
