// Part 3: Mixing a default export with named exports
const popular = "Teh Tarik";

export const allDrinks = ["Teh Tarik", "Kopi O", "Bandung"];

export function isCold(name) {
  return name.includes("Ice");
}

export default popular;
