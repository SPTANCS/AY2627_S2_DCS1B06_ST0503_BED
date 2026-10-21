// Slide 27

console.clear();

let promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("#1 resolved!");
            resolve("this is the resolved value");
        }, 2000);
    }).then(function (onResolvedValue) {
        setTimeout(function () {
            console.log("#2 resolved!");
        }, 3000);
    }).then(function (onResolvedValue) {
        setTimeout(function () {
            console.log("#3 resolved!");
        }, 1500);
    });