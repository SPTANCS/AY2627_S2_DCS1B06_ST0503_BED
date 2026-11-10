/**
 * Finds an item by numeric id in any array of objects that has an `id`.
 * Works for blocks, reports, inspectors, anything.
 */
const findById = (collection, id) =>
  collection.find((item) => item.id === Number(id));

/**
 * Returns the next id for an in-memory collection.
 * Safer than collection.length + 1, which repeats an id if a record is ever removed.
 */
const getNextId = (collection) => {
  let highestId = 0;

  for (const item of collection) {
    if (item.id > highestId) {
      highestId = item.id;
    }
  }

  return highestId + 1;
};

export { findById, getNextId };