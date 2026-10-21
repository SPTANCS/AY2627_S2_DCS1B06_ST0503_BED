// Slide 25 and 29
console.clear();

let promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        console.log("#1 resolved!");
        resolve("this is the resolved value from step 1\n");
    }, 2000);
  })
  .then(function (onResolvedValue) {
    console.log("Value from previous step:", onResolvedValue);
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        console.log("#2 resolved!");
        resolve("this is the resolved value from step 2\n");
      }, 3000);
    });
  })
  .then(function (onResolvedValue) {
    console.log("Value from previous step:", onResolvedValue);
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        console.log("#3 resolved!");
        resolve("this is the resolved value from step 3\n");
      }, 1500);
    });
  })
  .then(function (onResolvedValue) {
    console.log("Value from previous step:", onResolvedValue);
    console.log("All steps completed!");
  });
