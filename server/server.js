require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const {SERVER_PORT} = process.env
const {seed, createUser} = require('./controller.js')

app.use(express.json())
app.use(cors())

app.post('/seed', seed)
app.post('/users', createUser)

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.css'))
})

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.js'))
})


app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`)
})