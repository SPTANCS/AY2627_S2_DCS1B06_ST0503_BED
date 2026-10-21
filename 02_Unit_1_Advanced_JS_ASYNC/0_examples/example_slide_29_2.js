function delay(msg, mSecond) {
    return new Promise(function (resolve) {
        setTimeout(() => resolve(msg), mSecond);
    });
}

async function run() {
    let resultStr = await delay('#1 resolved!', 2000);
    console.log(resultStr);

    resultStr = await delay('#2 resolved!', 3000);
    console.log(resultStr);

    resultStr = await delay('#3 resolved!', 1500);
    console.log(resultStr);
}

run();