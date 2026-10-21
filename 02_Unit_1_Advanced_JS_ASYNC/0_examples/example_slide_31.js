// Slide 31
let resolvefn = function (result) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log("#" + result + " resolved!");
      resolve(result + 1);
    }, 3000);
  });
};

let rejectfn = function (result) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log("#" + result + " rejected!");
      reject(result + 1);
    }, 3000);
  });
};

let catchfn = function () {
  return new Promise(() => console.log("Caught final rejection!"));
};

let promise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    console.log("#1 rejected!");
    reject(2); // change to resolve(2) and test
  }, 2000);
  })
  .then(resolvefn, rejectfn)
  .then(resolvefn, rejectfn)
  .catch(catchfn)
  .finally(() => {
    console.log("End of Promise");
  });
