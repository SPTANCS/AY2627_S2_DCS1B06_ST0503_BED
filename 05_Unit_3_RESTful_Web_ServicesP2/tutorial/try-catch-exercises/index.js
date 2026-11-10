// 1. Wrapping a risky line so a failure does not kill the program
const broken = '{ "name": "Laksa", price: 5 }'; // price has no quotes

console.log("before");

try {
  const food = JSON.parse(broken);
  console.log(food);
} catch (error) {
  console.log("Could not parse:", error.message);
}

console.log("after");

// 2. Throwing errors yourself
function getPrice(food) {
  if (!food) {
    throw new Error("No food given");
  }
  return food.price;
}

try {
  console.log(getPrice({ price: 5 }));
  console.log(getPrice());
} catch (error) {
  console.log("Caught:", error.message);
}

// 3. The same block handles awaited promises that reject
async function loadMenu() {
  try {
    const res = await fetch("https://example.com/does-not-exist");
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log("Fetch failed:", error.message);
  }
}

loadMenu();
