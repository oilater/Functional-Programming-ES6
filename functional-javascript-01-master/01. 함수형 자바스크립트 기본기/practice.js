// const log = console.log;

// const arr = [1, 2, 3];
// // Arr
// for (const a of arr) log(a);

// log(arr[Symbol.iterator]());

// // // Set
// // const set = new Set([1, 2, 3]);
// // for (const a of set) log(a);

// // // Map
// // const map = new Map(["a", 1], ["b", 2], ["c", 3]);
// // for (const a of map) log(a);

const numbers = [1, 2, 3];
const numbersIterator = numbers[Symbol.iterator]();

console.log(numbersIterator.next());
console.log(numbersIterator.next());
console.log(numbersIterator.next());
console.log(numbersIterator.next());
