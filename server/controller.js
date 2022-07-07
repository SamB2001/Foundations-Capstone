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

    createUser: (req, res) => {
        let { username, userEmail, password } = req.body

        sequelize.query(`
        INSERT INTO users (username, user_email, password)
            VALUES ('${username}', '${userEmail}', '${password}')
        `)
        .then(dbres => res.status(200).send(dbRes[0]))
    },
    seed: (req, res) => {
        sequelize.query(`
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            user_email VARCHAR(100) NOT NULL,
            password VARCHAR(50) NOT NULL

            INSERT INTO users 
            (username, user_email, password)
            VALUES
            ('Sam', 's@g.com', '1234')
        )
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },
  }