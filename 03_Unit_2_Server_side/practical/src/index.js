import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger-output.json');

const app = express();

app.use(express.json());

// Swagger UI documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// In-memory data arrays
const snacks = [
  { id: 1, name: 'Chips', price: 2.99, quantity: 50 },
  { id: 2, name: 'Cookies', price: 3.49, quantity: 30 },
  { id: 3, name: 'Candy Bar', price: 1.25, quantity: 80 },
  { id: 4, name: 'Pretzels', price: 4.49, quantity: 40 },
  { id: 5, name: 'Popcorn', price: 1.99, quantity: 60 },
  { id: 6, name: 'Granola Bar', price: 2.50, quantity: 70 },
  { id: 7, name: 'Trail Mix', price: 5.99, quantity: 25 },
  { id: 8, name: 'Gummy Bears', price: 3.25, quantity: 90 },
  { id: 9, name: 'Beef Jerky', price: 7.99, quantity: 15 },
  { id: 10, name: 'Rice Cakes', price: 3.99, quantity: 35 },
];

const electronics = [
  { id: 1, name: 'Headphones', price: 29.99, quantity: 20 },
  { id: 2, name: 'USB Cable', price: 9.99, quantity: 100 },
  { id: 3, name: 'Mouse', price: 19.99, quantity: 45 },
  { id: 4, name: 'Keyboard', price: 49.99, quantity: 30 },
  { id: 5, name: 'Webcam', price: 39.99, quantity: 25 },
  { id: 6, name: 'USB Hub', price: 14.99, quantity: 60 },
  { id: 7, name: 'Monitor Stand', price: 24.99, quantity: 15 },
  { id: 8, name: 'HDMI Cable', price: 7.99, quantity: 80 },
  { id: 9, name: 'Power Bank', price: 34.99, quantity: 35 },
  { id: 10, name: 'Phone Charger', price: 12.99, quantity: 90 },
];

// ============================================================
// TODO: Implement the routes below
// ============================================================

// GET /snacks - return all snacks as JSON
// Optional query params:
//   ?maxPrice=<number> - filter items where price <= maxPrice (return error JSON if invalid/negative)
//   ?sort=asc|desc     - sort results by price (return error JSON if invalid value)
//   When both are provided, filter first then sort
app.get('/snacks', (req, res) => {
  // TODO: Implement this route
  res.json(snacks);
});

// GET /electronics - return all electronics as JSON
// Same query param support as /snacks
app.get('/electronics', (req, res) => {
  // TODO: Implement this route
  res.json(electronics);
});

// GET /snacks/:id - return a single snack by ID
// If found: return the snack object as JSON
// If not found: return { "error": "Item not found" }
app.get('/snacks/:id', (req, res) => {
  // TODO: Implement this route
  // Hint: use req.params.id to get the ID from the URL
  // Hint: use Number() to convert the string ID to a number
  // Hint: use .find() to search the snacks array

  const snackID = Number(req.params.id);
  console.log(`the snack id is ${snackID}`);

  // let resultSnack = undefined;
  // for (let i = 0; i < snacks.length; i++) {
  //   if (snacks[i].id == snackID) {
  //     resultSnack = snacks[i];
  //     break;
  //   }
  // }

  let resultSnack = snacks.find(element => element.id == snackID);
  
  if (resultSnack) {
    res.json(resultSnack);
  } else {
    res.json({error: "item not found"});
  }
});

// GET /electronics/:id - return a single electronic by ID
// Same behavior as /snacks/:id but searches the electronics array
app.get('/electronics/:id', (req, res) => {
  // TODO: Implement this route

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
  let electronicsID = Number(req.params.id);

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  const foundItem = electronics.find(
    (currentItem) => currentItem.id === electronicsID,
  );

  if (foundItem) {
    res.json(foundItem);
  } else {
    res.json({ error: "Item not found" });
  }
});

// GET / - return all products
// Without query params: return { snacks: [...], electronics: [...] }
// With ?category=snacks: return only the snacks array
// With ?category=electronics: return only the electronics array
// With invalid category: return { "error": "Invalid category. Use 'snacks' or 'electronics'." }
// Also supports ?maxPrice= and ?sort= (same rules as collection endpoints)
app.get('/', (req, res) => {

  const { category, sort } = req.query;
  const maxPrice           = req.query.maxPrice === undefined ? undefined : Number(req.query.maxPrice);

  if (maxPrice !== undefined) { // Check if maxPrice is provided
    if (Number.isNaN(maxPrice) || maxPrice <= 0) {  // Validate maxPrice
      res.json({ error: "Invalid maxPrice. Must be a positive number." });
      return; // Return early if invalid
    }
  }

  if (sort !== undefined) { // Check if sort is provided
    if (sort !== "asc" && sort !== "desc") { // Validate sort
      res.json({ error: "Invalid sort. Use 'asc' or 'desc'." });
      return; // Return early if invalid
    }
  }

  // Validate category
  if (category !== undefined && category !== "snacks" && category !== "electronics") {
    res.json({
      error: "Invalid category. Use 'snacks' or 'electronics'.",
    });
    return; // Return early if invalid
  }

  // Function to apply filters and sorting
  const applyFilters = (items, maxPrice, sort) => {
    const results = items.filter( 
      (item) => maxPrice === undefined || item.price <= maxPrice, // Filter by maxPrice if provided
      // maxPrice === undefined means no filtering, so we include all items
      // || only evaluates the second condition if the first is false, so if maxPrice is undefined, we include all items
    );

    if (sort === "asc") { // Sort by price ascending
      results.sort((a, b) => a.price - b.price); 
    } else if (sort === "desc") { // Sort by price descending
      results.sort((a, b) => b.price - a.price); 
    }
    return results;
  };

  if (category === "snacks") { // If category is snacks, return only snacks
    res.json(applyFilters(snacks, maxPrice, sort)); 
  } else if (category === "electronics") { // If category is electronics, return only electronics
    res.json(applyFilters(electronics, maxPrice, sort));
  } else { // If no category is provided, return both snacks and electronics
    res.json({
      snacks: applyFilters(snacks, maxPrice, sort),
      electronics: applyFilters(electronics, maxPrice, sort),
    });
  }

});

app.use(function (req, res) {
  res
    .status(404)
    .type('.html') 
    .end('<html><title>NOT FOUND</title><body><h1>SORRY FILE NOT FOUND</h1></body></html>');
})

// ============================================================
// Server startup
// ============================================================
const PORT = 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
