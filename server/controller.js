require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  })

  module.exports = {
    loginUser: (req, res) => {
        app.post('/login', (req, res) => {
            let username = req.body
            let password = req.body
            if (username && password){
                sequelize.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, [username, password], function(error, results, fields){
                    if (error) throw error
                    if (results.length > 0) {
                        req.session.loggedin = true;
                        req.session.username = username;
                        console.log('login is running controller on backend')
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
    },

    createUser: (req, res) => {
        let { username, userEmail, password } = req.body

        sequelize.query(`
        INSERT INTO users (username, user_email, password)
            VALUES ('${username}', '${userEmail}', '${password}')
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
    },
    seed: (req, res) => {
        sequelize.query(`
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            user_email VARCHAR(100) NOT NULL,
            password VARCHAR(50) NOT NULL
            );

            INSERT INTO users 
            (username, user_email, password)
            VALUES
            ('Sam', 's@g.com', '1234');
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },
  }