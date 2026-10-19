
const ARRAY_SIZE = 5;
const numberArr = new Array(ARRAY_SIZE);

for (let i = 0; i < numberArr.length; i++) {
    numberArr[i] = (Math.floor(Math.random() * 100) + 1);
}

console.clear();
console.log('Values in Array')
console.table(numberArr);

function myMap(givenArray, updateWithThisFunction) {
    let resultArray = [];

    for (let i = 0; i < givenArray.length; i++) {

        const newValue = updateWithThisFunction(givenArray[i]);   // <-----

        resultArray.push(newValue);

    }
    return resultArray;
}


console.log('\nCalling myMap with array numberArr and a callback function on the fly as input to the function');
const outputArray1 = myMap(numberArr, (num) => {
    if (num % 2 == 0)
        return "EVEN";
    else
        return "ODD";
});
console.log('Result is :');
console.table(outputArray1);

console.log('\nCalling myMap with array numberArr and a callback function on the fly as input to the function');
const outputArray2 = myMap(numberArr, (num) => num * 2);
console.log('Result is :');
console.table(outputArray2);
