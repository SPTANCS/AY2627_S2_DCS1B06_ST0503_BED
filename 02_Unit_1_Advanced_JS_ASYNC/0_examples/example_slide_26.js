// Slide 26
// V1 Promise object that cannot be chained properly because resolve() function was not called in new Promise object.

console.clear();
let promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log("#1 resolved!");
    }, 2000); 
  })
  .then(function (onResolvedValue) {
    setTimeout(function () {
      console.log("#2 resolved!");
    }, 3000);
  })
  .then(function (onResolvedValue) {
    setTimeout(function () {
      console.log("#3 resolved!");
    }, 1500);
  });

