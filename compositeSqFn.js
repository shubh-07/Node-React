const sqaureAsync = (number, cb) => {
    setTimeout(() => {
        return cb(number * number)
    }, 1000)
}

// const newPromiseFunc = (number) => {
//     return new Promise((resolve, reject) => {
//         sqaureAsync(number, (num) => {
//             resolve(num);
//         });
//     });
// }

const sqaureAsyncArray = [sqaureAsync, sqaureAsync, sqaureAsync];

function compositeSquareFn(num, fnArr) {
    let result = fnArr.reduce(async (val, fn) => {
        const accumulatedValue = await val;
        return new Promise((resolve, reject) => {
            fn(accumulatedValue, (newVal) => {
                resolve(newVal);
            });
        });
    }, num);
    return result;
}

async function caller() {
    let res = await compositeSquareFn(2, sqaureAsyncArray) // ==> prints 256 after 3seconds
    console.log(res);
}

caller();