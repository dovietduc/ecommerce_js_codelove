// 1. chọn element
const btnSignUpSelector = document.querySelector('.btn-signup');
const inputAllSelector = document.querySelectorAll('.form-group input');
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// validate cho từng field một (từng ô input một)
// Trong từng ô input check sẽ đính kèm các rule(quy tắc validate) của nó


// =============== Start Listener Function ===============
function handleSignUpClick(event) {
    event.preventDefault();
    let isNameValid;
    let isEmailValid;
    let isPassValid;
    let isConfirmPassValid;
    // 1. Thực hiện validate
    for(let i = 0; i < inputAllSelector.length; i++) {

        let inputSelector = inputAllSelector[i];
        let name = inputSelector.name;

        // validate not empty
        if(name === 'name') {
            isNameValid = validateName(inputSelector);            
        } else if(name === 'email') {
            isEmailValid = validateEmail(inputSelector);
        } else if(name === 'password') {
            isPassValid = validatePassword(inputSelector);
        } else {
            isConfirmPassValid = validateConfirmPassword(inputSelector)
        }
      
    }

    // kiểm tra không có ô input nào có lỗi validate
    if(isNameValid && isEmailValid && isPassValid && isConfirmPassValid) {
        console.log('login page');
    }


}

// hàm chỉ chạy khi người dùng nhập value có sự thay đổi
function handleChangeValue(event) {
    let inputSelector = event.target;
    let nameInput = inputSelector.name;
    if(nameInput === 'name') {
        validateName(inputSelector);    
    } else if(nameInput === 'email') {
        validateEmail(inputSelector);
    } else if(nameInput === 'password') {
        validatePassword(inputSelector)
    } else {
        validateConfirmPassword(inputSelector);
    }
}
// =============== End Listener Function ===============


// =============== Start Validate Input Function ===============
function validateName(inputSelector) {
    let isValid = false;
    // require
    if(!require(inputSelector)) {
        showError(inputSelector, 'Tên không được để trống');
    } else {
        // show success
        showSuccess(inputSelector);
        isValid = true;
    }
    return isValid;
}
function validateEmail(inputSelector) {
    let isValid = false;
    if(!require(inputSelector)) {
        showError(inputSelector, 'email không được để trống');
    } else if(!minlength(inputSelector)) {
        showError(inputSelector, `email tối thiểu ${inputSelector.getAttribute('min_length')} kí tự`);
    } else if(!emailRegex(inputSelector)) {
        showError(inputSelector, 'email khồng đúng định dạng');
    } else {
        showSuccess(inputSelector);
        isValid = true;
    }
    return isValid;
}
function validatePassword(inputSelector) {
    let isValid = false;
    if(!require(inputSelector)) {
        showError(inputSelector, 'password không được để trống');
    } else if(!minlength(inputSelector)) {
        showError(inputSelector, `password tối thiểu ${inputSelector.getAttribute('min_length')} kí tự`);
    } else {
        showSuccess(inputSelector);
        isValid = true;
    }
    return isValid;
}
function validateConfirmPassword(inputSelector) {
    let isValid = false;
    if(!require(inputSelector)) {
        showError(inputSelector, 'confirm password không được để trống');
    } else if(!minlength(inputSelector)) {
        showError(inputSelector, `confirm password tối thiểu ${inputSelector.getAttribute('min_length')} kí tự`);
    } else if(!comparePass(inputSelector)) {
        showError(inputSelector, 'confirm password không trùng với password');
    } else {
        showSuccess(inputSelector);
        isValid = false;
    }
    return isValid;
}
// =============== End Validate Input Function ===============


// =============== Start Rules Function ===============
function require(inputSelector) {
    return inputSelector.value ? true : false;
}
function minlength(inputSelector) {
    let minLength = inputSelector.getAttribute('min_length');
    let inputValue = inputSelector.value;
    if(inputValue.length < minLength) {
        return false;
    }
    return true;
}
function emailRegex(inputSelector) {
    let inputValue = inputSelector.value;
    return regexEmail.test(inputValue);
}

function comparePass(inputSelector) {
    let valueConfirmPass = inputSelector.value;
    let passwordSelector = document.querySelector('.' + inputSelector.getAttribute('selector_compare'));
    let valuePassword = passwordSelector.value;

    return valueConfirmPass === valuePassword;

}
// =============== End Rules Function ===============



// =============== Start Messages Function ===============
function showError(inputSelector, message = null) {
    // 1. Hiển thị mầu đỏ cho ô input
    inputSelector.classList.add('error');
    // 2. Thêm nội dung lỗi cho div mesage dưới ô input
    let divMessageSelector = inputSelector.closest('.form-group').querySelector('.error_message');
    divMessageSelector.textContent = message;
}

function showSuccess(inputSelector) {
    let divMessageSelector = inputSelector.closest('.form-group').querySelector('.error_message');
    inputSelector.classList.remove('error');
    divMessageSelector.textContent = '';
}
// =============== End Messages Function ===============








// 3. Thêm sự kiện cho phần tử
btnSignUpSelector.addEventListener('click', handleSignUpClick);
// Thêm sự kiện input cho các ô input nhập liệu
for(let i = 0; i < inputAllSelector.length; i++) {
    let inputElement = inputAllSelector[i];
    inputElement.addEventListener('input', handleChangeValue);
}

