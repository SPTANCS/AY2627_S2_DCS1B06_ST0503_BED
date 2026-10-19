const ARRAY_SIZE = 5;
const numberArr = new Array(ARRAY_SIZE);

for (let i = 0; i < numberArr.length; i++) {
  numberArr[i] = Math.floor(Math.random() * 100) + 1;
}

console.clear();
console.log("Values in Array");
console.table(numberArr);

function add(currentSum, currentValue) {
    return currentSum + currentValue;
}

function keepLarger(currentHighest, currentValue) {
  //return (currentValue > currentHighest) ? currentValue : currentHighest;

  if (currentValue > currentHighest) {
    return currentValue;
  } else {
    return currentHighest;
  }
}

function reduceSum(givenArray, combineFunction) {
    let total = 0;

    for (let i = 0; i < givenArray.length; i++) {
        total = combineFunction(total, givenArray[i]);   // <-----
    }
    return total;
}

function reduceMax(givenArray, combineFunction) {
    let max = givenArray[0];

    for (let i = 1; i < givenArray.length; i++) {
        max = combineFunction(max, givenArray[i]);      // <-----
    }
    return max;
}

const sum = reduceSum(numberArr, add);
const max = reduceMax(numberArr, keepLarger);

console.log("Sum:", sum);
console.log("Max:", max);
