require('dotenv').config()
const express = require('express')
const session = require('express-session');
const app = express()
const cors = require('cors')
const path = require('path')
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'https://sb-foundations-capstone.herokuapp.com/',
    user: 'hfgbnalmrzqfkn',
    password: '7052a6d4a668253f09f392fcdee27478891ed925ba3540d765c42ad884857e67',
    database: 'dcdkpp79d8r136'
})
const SERVER_PORT = process.env.PORT || 4000
const {seed, createUser} = require('./controller.js');

app.use(express.json())
app.use(cors())

app.post('/seed', seed)
app.post('/users', createUser)

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.css'))
})

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.js'))
})

app.post('https://sb-foundations-capstone.herokuapp.com/', (req, res) => {
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
})

app.get('https://www.modernmetalsutah.com/fire-table-look-book', (req, res) => {
    if (req.session.loggedin){
        res.send('Welcome back, ' + req.session.username + '!')
    } else {
        res.send('Please login to view this page')
    }
    res.end()
})

app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`)
})