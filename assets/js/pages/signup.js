// 1. chọn element
const btnSignUpSelector = document.querySelector('.btn-signup');
const inputAllSelector = document.querySelectorAll('.form-group input');
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// input
const rules = {
    name: {
        required: true
    },
    email: {
        required: true,
        minlength: 3,
        email: true
    },
    password: {
        required: true,
        minlength: 8 
    },
    confirm_password: {
        required: true,
        minlength: 8,
        equal_to: 'password'
    }
}

const methodsRule = {
    required: (valueInput, paramsInput) => {
        console.log('require running');
        return valueInput !== '';
    },
    minlength: function(valueInput, paramsInput) {
        console.log('minlength running');
        return valueInput.length >= paramsInput;
    },
    email: function(valueInput, paramsInput) {
        console.log('email running');
        return regexEmail.test(valueInput);
    },
    equal_to: function(valueInput, paramsInput) {
        console.log('equal_to running');
        let passSelector = document.querySelector('.' + paramsInput);
        let valuePass = passSelector.value;
        return valuePass === valueInput;
    }
}

const messages = {
    name_required: 'Tên không được để trống',
    email_required: 'Email không được để trống'
}

// =============== Start Listener Function ===============
function handleSignUpClick(event) {
    event.preventDefault();
    // loop qua từng phần tử input validate
    for(const keyNameInput in rules) {
        console.group();

        let inputElement = document.querySelector('.' + keyNameInput);
        let valueInput = inputElement.value;
        console.log(inputElement);

        // reset all error
        inputElement.classList.remove('error');
        inputElement.nextElementSibling.textContent = '';

        let ruleAllForInput = rules[keyNameInput];
        // loop qua từng rule validate của input đấy
        for(const ruleItemKey in ruleAllForInput) {
            let paramsInput = ruleAllForInput[ruleItemKey];
            let result = methodsRule[ruleItemKey](valueInput, paramsInput);
            let keyMessage = keyNameInput + '_' + ruleItemKey;
            console.log(messages[keyMessage]);
            console.log('result', result);

            // kiểm tra validate rule thất bại
            if(!result) {
                inputElement.classList.add('error');
                inputElement.nextElementSibling.textContent = messages[keyMessage] ? messages[keyMessage] : keyNameInput + ' not valid';
                break;
            }
        }
        console.groupEnd();
    }

}



// 3. Thêm sự kiện cho phần tử
btnSignUpSelector.addEventListener('click', handleSignUpClick);


