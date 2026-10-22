// https://www.npmjs.com/package/express
// https://www.npmjs.com/package/nodemon

import express from 'express';

const app = express();


app.use(function (req, res, next) {
  const {url, method, path} = req;

  console.log("A new request");
  console.log(`URL   : ${url}`);
  console.log(`Method: ${method}`);
  console.log(`Path  : ${path}\n`);

  next();
});


app.get('/', (req, res) => {
  res
    .status(200)
    .type('.html') 
    .end('<html><title>My 1st Server</title><body><h1>Welcome to My First Server</h1></body></html>');
})

app.get('/hello', function (req, res ) {
  res.send("Hello !");
});


app.use(function (req, res) {
  res
    .status(404)
    .type('.html') 
    .end('<html><title>NOT FOUND</title><body><h1>SORRY FILE NOT FOUND</h1></body></html>');
})


app.listen(3000, function ready () {
  console.log('Server is running on http://localhost:3000');
} )
