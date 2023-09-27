// 1. chọn element
const btnSignUpSelector = document.querySelector('.btn-signup');
const inputAllSelector = document.querySelectorAll('.form-group input');
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const errorMessageAll = document.querySelectorAll('.error_message');

// validate cho từng field một (từng ô input một)
// Trong từng ô input check sẽ đính kèm các rule(quy tắc validate) của nó


// 2. function xử lí sự kiện + chạy lần đầu khi load
function handleSignUpClick(event) {
    event.preventDefault();
    // 1. Thực hiện validate
    for(let i = 0; i < inputAllSelector.length; i++) {

        let inputSelector = inputAllSelector[i];
        let valueInput = inputSelector.value;
        let divMessageSelector = inputSelector.closest('.form-group').querySelector('.error_message');
        let name = inputSelector.name;

        // validate not empty
        if(name === 'name') {
            // require
            if(!require(inputSelector)) {
                showError(inputSelector, 'Tên không được để trống');
            } else {
                // show success
                showSuccess(inputSelector);
            }
        } else if(name === 'email') {
            if(!require(inputSelector)) {
                showError(inputSelector, 'email không được để trống');
            } else if(!minlength(inputSelector)) {
                showError(inputSelector, `email tối thiểu ${inputSelector.getAttribute('min_length')} kí tự`);
            } else if(!emailRegex(inputSelector)) {
                showError(inputSelector, 'email khồng đúng định dạng');
            } else {
                showSuccess(inputSelector);
            }
        } else if(name === 'password') {
            if(!require(inputSelector)) {
                showError(inputSelector, 'password không được để trống');
            } else if(!minlength(inputSelector)) {
                showError(inputSelector, `password tối thiểu ${inputSelector.getAttribute('min_length')} kí tự`);
            } else {
                showSuccess(inputSelector);
            }
        } else {
            if(!require(inputSelector)) {
                showError(inputSelector, 'confirm password không được để trống');
            } else if(!minlength(inputSelector)) {
                showError(inputSelector, `confirm password tối thiểu ${inputSelector.getAttribute('min_length')} kí tự`);
            } else if(!comparePass(inputSelector)) {
                showError(inputSelector, 'confirm password không trùng với password');
            } else {
                showSuccess(inputSelector);
            }
        }
      
    }

    // kiểm tra không có ô input nào có lỗi validate
    // 1. lưu user vào localStorage
    // 2. redirect đến màn hình login


}

// rule require
// output: return true or false
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

// hàm chỉ chạy khi người dùng nhập value có sự thay đổi
function handleChangeValue(event) {
    console.log(event.target);
}





// 3. Thêm sự kiện cho phần tử
btnSignUpSelector.addEventListener('click', handleSignUpClick);
// Thêm sự kiện input cho các ô input nhập liệu
for(let i = 0; i < inputAllSelector.length; i++) {
    let inputElement = inputAllSelector[i];
    inputElement.addEventListener('input', handleChangeValue);
}

