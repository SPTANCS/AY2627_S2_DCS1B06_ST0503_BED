const ARRAY_SIZE = 5;
const numberArr = new Array(ARRAY_SIZE);

for (let i = 0; i < numberArr.length; i++) {
  numberArr[i] = Math.floor(Math.random() * 100) + 1;
}

console.clear();
console.log("Values in Array");
console.table(numberArr);

function sumArray(givenArray) {
  let total = 0;

  for (let i = 0; i < givenArray.length; i++) {
    total = total + givenArray[i];
  }
  return total;
}

function findMaxArray(givenArray) {
  let max = givenArray[0];

  for (let i = 1; i < givenArray.length; i++) {
    if (givenArray[i] > max) {
      max = givenArray[i];
    }
  }
  return max;
}

console.log("\nSum of array:");
console.log(sumArray(numberArr));

console.log("\nMax number in array:");
console.log(findMaxArray(numberArr));
