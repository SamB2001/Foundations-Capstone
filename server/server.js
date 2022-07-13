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


const {seed, createUser, loginUser} = require('./controller.js');

app.use(express.json())
app.use(cors())

app.post('/seed', seed)
app.post('/users', createUser)
app.get('/loginUser', loginUser)

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



app.get('/signup', (req, res) => {
    console.log('signup attempted')
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