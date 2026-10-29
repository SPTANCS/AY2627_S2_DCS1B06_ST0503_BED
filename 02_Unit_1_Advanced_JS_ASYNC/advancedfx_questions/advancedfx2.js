// Given the following array, use the map() method 
// to create an array of strings that contains names of users.

let users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 },
    { name: "David", age: 40 },
    { name: "Eve", age: 45 },
];

console.clear();
//console.table(users);

// Step 1: Write a function to return the name of the user.
const changeObjToName = (person) => {
    return person.name;
}

// Step 2: Use the map() method to apply the function to 
//         each element in the users array.
//         Assign the returned value of map() function to 
//         outputArray variable.

let outputArray = users.map(changeObjToName);

console.log(users);
console.log(outputArray);
// Expected output: ["Alice", "Bob", "Charlie", "David", "Eve"];