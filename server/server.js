require('dotenv').config()
const express = require('express')
const session = require('express-session');
const app = express()
const cors = require('cors')
const path = require('path')
const { Client } = require('pg');
const {CONNECTION_STRING} = process.env
const {SERVER_PORT} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  })


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
app.use(express.static(path.join(__dirname, '../public/test.html')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/test.html'))
})

app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.css'))
})

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.js'))
})

app.get('/axios', (req, res) => {
    res.sendFile(path.join(__dirname, '/node_modules/axios/dist/axios.min.js'))
  })

app.get('/signup', (req, res) => {
    console.log('signup attempted')
})

app.post('/login', (req, res) => {
    // console.log('hit')
    let { username }= req.body
    let { password } = req.body
    if (username && password) {
        sequelize.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`)
        .then((dbRes) => {
            console.log(dbRes)
            if (dbRes[0].length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                // console.log('login is running controller on backend')
                res.status(200).send(dbRes[0])
                return
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

app.get('/fire-table-look-book', (req, res) => {
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