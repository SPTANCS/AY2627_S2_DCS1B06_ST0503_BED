// 03-for-of
// Run: node index.js

// Two loops printing the same thing.
const fruits = ["apple", "banana", "cherry"];

// Counter-style loop: gives you the position, you look the item up.
for (let i = 0; i < fruits.length; i = i + 1) {
  console.log(fruits[i]);
}

// TODO: uncomment when you reach this step.
// for...of: gives you the item directly.
// for (const fruit of fruits) {
//   console.log(fruit);
// }
