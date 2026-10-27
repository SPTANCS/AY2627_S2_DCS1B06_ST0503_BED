// https://www.npmjs.com/package/express
// https://www.npmjs.com/package/nodemon

import express from 'express';

const app = express();

app.use((req, res, next) => {
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

app.get('/hello/:name', function (req, res ) {

  const requestedNum = Number(req.query.num);

  // If the query parameter is not a number or is less than or equal to 0, default to 1
  const num = Number.isFinite(requestedNum) && requestedNum > 0 ? requestedNum : 1;
  console.log(num);

  // console.log(req.params.name);
  // const name = req.params.name;
  const {name} = req.params;

  let str = "";
  for (let i=0; i<num; i++) {
    str += `Hello ! ${name}<br>`;
  }
  res.send(str);
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
