const iterable = {
  // 이 iterable 값은 Symbol.iterator 메서드를 구현하고 있어야 한다.
  [Symbol.iterator]() {
    let i = 3;
    // 이 메서드는 iterator를 반환해야 한다.
    // iterator는 next를 메서드를 가지고 있으며
    // next는 value 와 done을 가지고 있는 객체를 return 해야 한다.
    return {
      next() {
        return i == 0 ? { done: true } : { value: i--, done: false };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  },
};

let iterator = iterable[Symbol.iterator]();
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());

// iterable에 Symbol.iterator 가 구현되어 있기 때문에 for...of 문에 들어갈 수 있다.

for (const a of iterable) {
  console.log(a);
}

const arr2 = [1, 2, 3];
let iter2 = arr2[Symbol.iterator]();
iter2.next();
for (const a of iter2) console.log(a);

console.log(iter2[Symbol.iterator]() == iter2);
