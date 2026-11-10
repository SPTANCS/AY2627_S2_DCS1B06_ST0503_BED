// Part 1: Named exports
export const hawkerFoods = ["Chicken Rice", "Laksa", "Nasi Lemak"];

export function shout(name) {
  return name.toUpperCase();
}

const secretRecipe = "extra pandan and ginger"; // no export, stays private
