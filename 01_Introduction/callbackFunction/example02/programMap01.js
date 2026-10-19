
const ARRAY_SIZE = 5;
const numberArr  = new Array(ARRAY_SIZE);

for (let i = 0; i < numberArr.length; i++ ) {
    numberArr[i] = (Math.floor(Math.random() * 100) + 1);
}

console.clear();
console.log('Values in Array')
console.table(numberArr);

///////////////////////////////////////////////////////////////////////////////

function mapEvenOddToWord(givenNumber) {
    if (givenNumber % 2 == 0)
        return "EVEN";
    else
        return "ODD";
}

function mapToDouble(givenNumber) {
    return givenNumber * 2;
}

///////////////////////////////////////////////////////////////////////////////
// they are basically the same implemention

function mapArrayEvenOddToWord(givenArray, updateWithThisFunction) { 
    let resultArray = [];

    for (let i = 0; i < givenArray.length; i++) {

        const newValue = updateWithThisFunction(givenArray[i]);   // <-----
        
        resultArray.push(newValue);
        
    }
    return resultArray;
}

function mapArrayToDoubleItsValue(givenArray, updateWithThisFunction) {
    let resultArray = [];

    for (let i = 0; i < givenArray.length; i++) {

        const newValue = updateWithThisFunction(givenArray[i]);   // <-----
        
        resultArray.push(newValue);
        
    }
    return resultArray;
}


console.log('\nCalling mapArrayEvenOddToWord with array numberArr and mapEvenOddToWord function as input to the function');
const outputArray1 = mapArrayEvenOddToWord(numberArr, mapEvenOddToWord); // <-----
console.log('Result is :');
console.table(outputArray1);

console.log('\nCalling mapArrayToDoubleItsValue with array numberArr and mapToDouble function as input to the function');
const outputArray2 = mapArrayToDoubleItsValue(numberArr, mapToDouble); // <-----
console.log('Result is :');
console.table(outputArray2);
