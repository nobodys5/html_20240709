/*
    매개변수 기본값 : 
    - 함수 호출시 매개변수를 전달하지 않으면 사용할 기본값을 지정할 수 있음  
*/
const add = (a = 5, b = 10) => a + b;
console.log( add() );
console.log( add(50,99) );


console.log('========================================');

/*
    rest 매개변수 : 
    - 함수 선언시 매개변수 앞에 ...을 붙여서 정의한 매개변수
    - 함수에 전달받은 매개변수의 배열을 전달받음
    - 다른 매개변수와 같이 rest 매개변수를 사용할 
*/
const restFunction = (...arg) => {
    console.log(arg);
}
restFunction(1, 2, 3, 4, 5);

const restFunction2 = (arg1, ...args) => {
    console.log(arg1);
    console.log(args);
};
restFunction2(1, 2, 4, 5, 7, 8);

console.log('========================================');

/*
    spread 연산자 : 
    - ...을 사용하여 대상의 요소를 하나씩 분리
    - 연산자의 피연산자는 반드시 반복 가능한 객체(배열, 객체, 문자열, ...) 이어야 함
*/
const numbers = [1, 2, 3, 4];
console.log(numbers);
console.log(...numbers);
console.log(1, 2, 3, 4);


console.log('========================================');

// 배열 복사에 사용
const newNumbers = [...numbers];  // => [1, 2, 3, 4]
console.log(newNumbers);

newNumbers[0] = 20;
console.log(numbers);
console.log(newNumbers);

// 배열 연결에 사용
const number2 = [5, 6, 7, 8];
let newNumbers2 = [ ...numbers, ...number2];
console.log(newNumbers2);
newNumbers2 = [ ...number2, ...numbers];
console.log(newNumbers2);

// 배열 요소 추가에 사용
newNumbers2 = [ ...newNumbers2, 9, 10];
console.log(newNumbers2);

// 객체 복사, 연결, 요소 추가에 사용
const king = {
    name: '이성계',
    tombName: '태조'
};

let newKIng = { ...king};
newKIng.name = '이방과';
console.log(king);
console.log(newKIng);

const kingInfo = {
    address: '서울특별시',
    country: '고려'
};

newKIng = { ...king, ...kingInfo};
console.log(newKIng);

newKIng = { ...kingInfo, ...king};
console.log(newKIng);

newKIng = { ...king, birth: '1355-11-04' };
console.log(newKIng);

newKIng = { ...king, name: '이단', birth: '1355-11-04' };
console.log(newKIng);

newKIng = { name: '이단' , ...king, birth: '1355-11-04' };
console.log(newKIng);