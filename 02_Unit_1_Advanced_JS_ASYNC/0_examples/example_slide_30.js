// Slide 30
let resolvefn = function (result) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('#' + result + ' resolved!');
            resolve(result + 1);
        }, 3000);
    });
}

let promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        console.log('#1 resolved!');
        resolve(2);
    }, 2000);
  })
  .then(resolvefn)
  .then(resolvefn);