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
        const newTotal = total + givenArray[i];   // <-----
        total = newTotal;
    }
    return total;
}

function findMaxArray(givenArray) {
    let max = givenArray[0];

    for (let i = 1; i < givenArray.length; i++) {
        const newMax = (givenArray[i] > max) ? givenArray[i] : max;  // <-----
        max = newMax;
    }
    return max;
}

console.log('\nCalling sumArray');
const outputArray1 = sumArray(numberArr);
console.log('Result is :');
console.table(outputArray1);

console.log('\nCalling sumArray');
const outputArray2 = findMaxArray(numberArr);
console.log('Result is :');
console.table(outputArray2);
