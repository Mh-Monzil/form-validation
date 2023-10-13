const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const Form = document.getElementById('Form');

function showError(input,message){
    const FormControl = input.parentElement;
    FormControl.className = "form-control error";
    const small = document.querySelector("small");
    small.innerHTML = message;
}

function showSuccess (input){
    const FormControl = input.parentElement;
    FormControl.className = "form-control success";
}

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSuccess(input)
    }else {
        showError(input,'Email is not invalid');
    }
}

function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim()=== ""){
            showError(input,`${getFieldName(input)} is required`)
        }else{
            showSuccess(input);
        }
    });
}

function checkLength(input,min,max){
    if(input.value.length < min){
        showError(input,`${getFieldName(input)} must be at least ${min} characters`);
    }else if(input.value.length > max){
        showError(input,`${getFieldName(input)} must be less than ${max} characters`);
    }else{
        showSuccess(input);
    }
}


function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


function checkPasswordMatch(pass1,pass2){
    if(pass1.value !== pass2.value){
        showError(pass2, "passwords do not match")
    }
}

Form.addEventListener('submit', function(e){
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username,3,15);
    checkLength(password,3,15);
    checkEmail(email);
    checkPasswordMatch(password, password2);
});