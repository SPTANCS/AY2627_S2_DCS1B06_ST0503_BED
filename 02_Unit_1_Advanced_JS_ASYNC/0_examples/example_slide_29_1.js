// Slide 25 and 29
let promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        console.log('#1 resolved!');
        resolve();
    }, 2000);
  })
  .then(function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('#2 resolved!');
            resolve();
        }, 3000);
    });
  })
  .then(function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('#3 resolved!');
            resolve();
        }, 1500);
    });
});