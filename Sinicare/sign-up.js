var users = [
    {
        name : '이성계',
        id : 'taejo',
        password : 'qwer1234',
        telnumber : '01011111111',
    },
    {
        name : '이방과',
        id : 'jungjong',
        password : 'qwer1234',
        telnumber : '01022222222',
    },
    {
        name : '이방원',
        id : 'taejong',
        password : 'qwer1234',
        telnumber : '01033333333',
    }
];



var userNameElement = document.getElementById('user-name');
var userIdElement = document.getElementById('user-id');
var userPasswordElement = document.getElementById('user-password');
var userPasswordCheckElement = document.getElementById('user-password-check');
var userTelnumberElement = document.getElementById('user-telnumber');
var userAuthNumberElement = document.getElementById('auth-number');

var userNameMessageElement = document.getElementById('user-name-message');
var userIdMessageElement = document.getElementById('user-id-message');
var userPasswordMessageElement = document.getElementById('user-password-message');
var userPasswordCheckMessageElement = document.getElementById('user-password-check-message');
var userTelnumberMessageElement = document.getElementById('user-telnumber-message');
var userAuthNumberMessageElement = document.getElementById('auth-number-message');

var userIdButtonElement = document.getElementById('user-id-button');
var userAuthNumberMessageElement = document.getElementById('user-telnumber-button');
var userAuthNumberMessageElement = document.getElementById('auth-number-button');
var userAuthNumberMessageElement = document.getElementById('sign-up-message');

function userIdInputHandler (event) {
    var userId = event.target.value;

    userIdMessageElement.textContent = '';
    userIdMessageElement.className = 'message';

    // if (userId) {
    //     userIdButtonElement.className = 'input-button active';
    // } else {
    //     userIdButtonElement.className = 'input-button disable';

    // }

    userIdButtonElement.className = 'input-button' + (userId ? 'active' : 'disabled');
};

function userIdButtonClickHandler (event) {
    var userId = userIdElement.value;
    if (!userId) return;

    var existedId = users.some(function (item, index) {
        return item.id === userId;
    });
    
    if (existedId) {
        userIdMessageElement.textContent = '이미 존재하는 아이디입니다.';
        userIdMessageElement.className = 'message error';
    } else {
        userIdMessageElement.textContent = '사용 가능한 아이디입니다.'
        userIdMessageElement.className = 'message primary';
    }
}

userIdElement.addEventListener('input',userIdInputHandler);
userIdButtonElement.addEventListener('click', userIdButtonClickHandler);