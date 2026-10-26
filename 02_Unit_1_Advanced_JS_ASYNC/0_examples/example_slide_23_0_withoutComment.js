// Slide 23 - Understanding Promise, resolve(), reject(), and .then()

let successfn = (msg) => {
    console.log(`The promise resolved with message: ${msg}`);
};

let rejectedfn = (reason) => {
    console.log(`The promise rejected with reason: ${reason}`);
};

// This function accepts a bid amount and RETURNS a Promise.
// The caller can use .then() to handle the eventual result.
let checkBid = (placedBid) => {
    return new Promise((resolve, reject) => {
        const minimumBid = 100;

        if (placedBid >= minimumBid) {
            resolve(`Success, bid accepted with value: ${placedBid}`);
        } else {
            reject(`Bid too low (${placedBid}). Minimum bid is ${minimumBid}.`);
        }
    });
};

console.clear();

// Generate a random bid between 1 and 200.
let randomBid = Math.floor(Math.random() * 200) + 1;

checkBid(randomBid).then(successfn, rejectedfn);



