// Slide 27
// V2 resolve() function added.  However, the .then() functions are not run in sequence.

let promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log("#1 resolved!");
      resolve();
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
