/*
    화살표 함수 : 
    - function 키워드 대신에 화살표(=>)를 사용하여 함수를 생성하는 방법 (기본적으로 일회성, 익명 함수)
*/
// const func1 = function (arg1, arg2) {
//     return arg1 + arg2;
// }

// const func2 = (arg1, arg2) => {
//     return arg1 + arg2;
// }

/* 
    매개변수 지정 방법 
*/

// 매개변수가 없을 경우
// func2 = () => {

// }

// 매개변수가 하나일 경우, 매개변수 위치의 소괄호를 제거할 수 있음
// func2 = (arg) => { }
// func2 = arg => { }

// 매개변수가 여러개 일 경우, 매개변수 위치의 소괄호를 제거할 수 없음
// func2 = (arg1, arg2) => { }
// func2 = arg1, arg2 => { }       // 1. func2 = arg1; / 2. arg2 => { }


/*
    구현부 지정 방법
*/

// // single line block 
// func2 = (arg) => {
//     return arg * arg;
// }


// 구현부가 한줄이면 중괄호 생략 가능,  만약에 코드가 return 작업이라면 return 키워드를 제거해야함
// func2 = (arg) => arg * arg; 



// 구현부가 한줄이면서 객체 리터럴을 반환할 때는 함수의 코드블럭을 제거하면 객체 리터럴을 소괄호로 묶어야함
// func2 = (name, tombName) => { return {name,tombName } }

// func2 = (name, tombName) => ({name, tombName});


/*
    화살표 함수의 호출 : 
    - 화살표 함수는 익명 함수로만 선언되기 때문에 함수 표현식을 이용해서 변수에 저장하여 사용
    - 콜백 함수에 많이 사용
*/
// const pow = (x) => {
//     return x * y;
// };

// console.log( pow(10) );

const numbers = [1, 2, 4, 5, 7, 8];
numbers.forEach(function (item, index) {
    console.log(`index: ${index}, item: ${item}`);
})

numbers.forEach((item, index) => {
    console.log(`index: ${index}, item: ${item}`);
})

const forEachArg = (item, index) => {
    console.log(`index: ${index}, item: ${item}`);
};
numbers.forEach(forEachArg);