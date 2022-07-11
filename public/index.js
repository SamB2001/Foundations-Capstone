
const signUp = document.querySelector('#createAccount')
const username = document.querySelector('#signupUsername')
const email = document.querySelector('#signupEmail')
const password = document.querySelector('#pass')
const signUpBtn = document.querySelector('#signUpBtn')
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const SERVER_PORT = process.env.PORT || 4000
const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
})
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


document.addEventListener("DOMContentLoaded", () => {
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
        let username = req.body.loginUsername
    let password = req.body.loginPassword
    if (username && password){
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields){
            if (error) throw error
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('https://www.modernmetalsutah.com/fire-table-look-book')
            } else {
                res.send('Incorrect Username or Password')
            }
            res.end()
        })
    } else {
        res.send('Please enter Username and Password')
        res.end()
    }

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


