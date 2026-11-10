// Part 1: Named imports - go inside curly braces, names must match
import { hawkerFoods, shout } from "./foods.js";

console.log(hawkerFoods);
console.log(shout("laksa"));

// Part 2: Default import - no braces, you choose the name
import menu from "./menu.js";

console.log(menu.centre);
console.log(menu.stalls);

// Part 3: Default and named on one line - default comes first
import popular, { allDrinks, isCold } from "./drinks.js";

console.log(popular);
console.log(allDrinks);
console.log(isCold("Ice Kopi"));

// Renaming a named import with "as"
import { isCold as checkIfCold } from "./drinks.js";

console.log(checkIfCold("Ice Milo")); // true

// Grabbing every named export at once as one object
import * as drinkStuff from "./drinks.js";

console.log(drinkStuff.allDrinks);
console.log(drinkStuff.isCold("Kopi O")); // false
