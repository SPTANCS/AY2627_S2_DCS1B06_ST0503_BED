
const ARRAY_SIZE = 5;
const numberArr = new Array(ARRAY_SIZE);

for (let i = 0; i < numberArr.length; i++) {
    numberArr[i] = (Math.floor(Math.random() * 100) + 1);
}

console.clear();
console.log('Values in Array')
console.table(numberArr);

console.log('\nCalling builtin map function');
const outputArray1 = numberArr.map((num) => {
    if (num % 2 == 0)
        return "EVEN";
    else
        return "ODD";
});
console.log('Result is :');
console.table(outputArray1);

console.log('\nCalling builtin map function');
const outputArray2 = numberArr.map((num) => num * 2);
console.log('Result is :');
console.table(outputArray2);
