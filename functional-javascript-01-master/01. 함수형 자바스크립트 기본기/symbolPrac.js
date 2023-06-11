// Symbol 함수를 호출하여 유일무이한 심벌 값을 생성한다.

const mySymbol = Symbol();
// console.log(typeof mySymbol); // symbol

// 심벌 값은 외부로 노출되지 않아 확인할 수 없다.
console.log(mySymbol); // Symbol();

// 심벌 함수의 인수에 들어있는 문자열은 심벌 값에 대한 설명으로 디버깅 용으로만 사용되며, 심벌 값 생성에 어떠한 영향도 주지 않는다.
const mySymbol1 = Symbol("mySymbol");
const mySymbol2 = Symbol("mySymbol");

console.log(mySymbol1 === mySymbol2); // false

// Symbol.for 메서드는 인수로 전달받은 문자열을 키로 사용하여
// 키와 심벌 값의 쌍들이 저장되어 있는 전역 심벌 레지스트리에서 해당 키와 일치하는 심벌 값을 검색한다.
// 1. 검색에 성공하면 새로운 심벌 값을 생성하지 않고 검색된 심벌 값을 반환한다.
// 2. 검색에 실패하면 새로운 심벌 값을 생성하여 Symbol.for 메서드의 인수로 전달된 키로 전역 심벌 레지스트리에 저장한 후, 생성된 심벌 값을 반환한다.
const s1 = Symbol.for("mySymbol");
const s2 = Symbol.for("mySymbol");
console.log(s1 === s2); // true

console.log(Symbol.keyFor(s1)); // mySymbol

//Symbol 함수를 호출하여 생성한 심벌 값은 전역 심벌 레지스트리에 등록되어 관리되지 않는다.
const s3 = Symbol("foo");
console.log(Symbol.keyFor(s3)); // undefined

// 4방향, 즉 위, 아래, 왼쪽, 오른쪽을 나타내는 상수를 정의한다고 생각해보자.

const Direction = {
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
};

// 변수에 상수를 할당
const myDirection = Direction.UP;

if (myDirection === Direction.UP) console.log("You are going UP");

// 이처럼 값에는 특별한 의미가 없고 상수 이름 자체에 의미가 있는 경우 상수값이 변경되거나 다른 변수 값과 중복될 수 있다는 문제를 안고 있다.
// 이럴 경우 중복될 가능성이 없는 유일무이한 심벌 값을 사용할 수 있다.

const Direction1 = {
  UP: Symbol("up"),
  DOWN: Symbol("down"),
  LEFT: Symbol("left"),
  RIGHT: Symbol("right"),
};

const myDirection1 = Direction.UP;
if (myDirection1 === Direction.UP) console.log("You are going UP.");

// 심벌 값으로 프로퍼티 키 만들기
// 심벌 값은 유일 무이한 값이므로 심벌 값으로 프로퍼티 키를 만들면 다른 프로퍼티 키와 절대 충돌하지 않는다.

const obj = {
  // 심벌 값을 프로퍼티 키로 사용하려면 프로퍼티 키로 사용할 심벌 값에 대괄호를 사용해야 한다.
  [Symbol.for("mySymbol")]: 1,
};

console.log(obj[Symbol.for("mySymbol")]); // 1

// 심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티는 for...in 문이나 Object.keys, Object.getOwnPropertyNames 메서드로 찾을 수 없다.
// 즉 심벌을 잘 활용하면 외부에 노출할 필요가 없는 프로퍼티를 은닉할 수 있다.

const obj2 = {
  [Symbol.for("mySymbol")]: 1,
};

for (const key in obj2) {
  console.log(key); // 아무것도  출력되지 않는다.
}

console.log(Object.keys(obj2)); // []
console.log(Object.getOwnPropertyNames(obj2)); // []

// 아래의 메서드를 쓰면 바로 찾을 수 있기 때문에 완벽하게 숨길 수 있는 것은 아니다.
console.log(Object.getOwnPropertySymbols(obj2)); // []

// getOwnPropertySymbols 메서드로 심벌 값도 찾을 수 있다.
const symbolKey1 = Object.getOwnPropertySymbols(obj2)[0];
console.log(obj2[symbolKey1]); // 1

// 배열은 Array.prototype의 Symbol.iterator 메서드를 상속받는 이터러블이다.
// 이터러블은 for...of 문으로 순회할 수 있으며, 스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 있다.

const array = [1, 2, 3];
console.log(Symbol.iterator in array); // true

// 이터러블인 배열은 for...of 문으로 순회 가능하다.
for (const item of array) {
    console.log(item);
}

// 이터러블인 배열은 스프레드 문법의 대상으로 사용할 수 있다.
console.log([...array]); // [1, 2, 3]

// 이터러블인 배열은 배열 디스트럭처링 할당의 대상으로 사용할 수 있다.
const [a, ...rest] = array;
console.log(a, rest); // 1, [2, 3]