const { default: axios } = require("axios")

const signUp = document.querySelector('#createAccount')
const username = document.querySelector('#signupUsername')
const email = document.querySelector('#signupEmail')
const password = document.querySelector('#pass')
const signUpBtn = document.querySelector('#signUpBtn')
const loginUser = document.querySelector('#loginUsername')
const loginPass = document.querySelector('#loginPassword')
const signupURL = `https://sb-foundations-capstone.herokuapp.com/`


function setFormMessage(formElement, type, message){
    const messageElement = formElement.querySelector(".form__message")
    
    messageElement.textContent = message
    messageElement.classList.remove("form__message--success", "form__message--error")
    messageElement.classList.add(`form__message--${type}`)
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error")
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error")
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = ""
}


document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });
    document.querySelector("#linkLogin").addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });
    
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let body = {
            username: loginUser.value,
            password: loginPass.value
        }
        axios.post('https://sb-foundations-capstone.herokuapp.com/db', body)
        .then(() => {
            loginUser.value = ''
            loginPass.value = ''
        })

        setFormMessage(loginForm, "error", "Invalid username or password")
    })
    
    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", event =>{
            if (event.target.id === "signupUsername" && event.target.value.length > 0 && event.target.value.length < 3) {
                setInputError(inputElement, "Username must be at least 3 characters long")
            }
        })
        inputElement.addEventListener("input", event => {
            clearInputError(inputElement)
        })
    })
});

const sendSignup = (body) => {
    axios.post(signupURL, body)
    .then(res => {
        if (res.data.success){
            alert('Signup Successful!')
        } else {
            console.log('no axios error, but signup not successful')
        }
    })
    .catch(err => {
        console.log('axios error:')
        console.log(err)
    })
}

function submitHandler(event) {
    event.preventDefault()
    let body = {
        username: username.value,
        email: email.value,
        password: password.value
    }

    username.value = ''
    email.value = ''
    password.value = ''
    
    sendSignup(body)
}
signUpBtn.addEventListener('submit', sendSignup)


