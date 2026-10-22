// https://www.npmjs.com/package/express
// https://www.npmjs.com/package/nodemon

import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .type('.html') 
    .end('<html><title>My 1st Server</title><body><h1>Welcome to My First Server</h1></body></html>');
})

app.listen(3000, function ready () {
  console.log('Server is running on http://localhost:3000');
} )
