const ARRAY_SIZE = 5;
const numberArr  = new Array(ARRAY_SIZE);

for (let i = 0; i < numberArr.length; i++ ) {
    numberArr[i] = (Math.floor(Math.random() * 100) + 1);
}

console.clear();
console.log('Values in Array')
console.table(numberArr);

//////////////////////////////

function checkLessThan50 (givenNumber) {
    // if (givenNumber < 50) {
    //     return true;
    // } else {
    //     return false;
    // }
    return (givenNumber < 50);
}

function checkDivisibleBy3(givenNumber) {
    return (givenNumber % 3 == 0);
}

//////////////////////////////



function myFilter(givenArray, checkWithThisFunction) {
    let resultArray = [];

    for (let i = 0 ; i < givenArray.length ; i++) {

        const isWhatIWant = checkWithThisFunction(givenArray[i]);

        if (isWhatIWant) {
            resultArray.push(givenArray[i]);
        }
    }
    return resultArray;
}


const outputArray1 = myFilter(numberArr, checkLessThan50);
console.log('Result is :');
console.table(outputArray1);

const outputArray2 = myFilter(numberArr, checkDivisibleBy3);
console.log('Result is :');
console.table(outputArray2);