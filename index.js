const path = require('path')
require('dotenv/config')
const usersModel = require('./models/user')

const port = process.env.PORT || 3000
const {
    host,
    port_db,
    user,
    password,
    database,
    client,
} = require('./config-db.json')

const db = require('knex')({
    client: client,
    connection: {
        host: host,
        user: user,
        password: password,
        database: database,
        port: parseInt(port_db),
    }
})

db.on('query', query => {
    if ('true' === process.env.SHOW_DEBUG_SQL_CMD) {
        console.log('sql:', query.sql)
    }
})

const app = require('./app')(db)

usersModel.initUser(db)()

app.listen(port, err => {
    const linkApp = 'http://localhost'
    if (err) {
        console.log(`Server doesn't work! `, err)
    } else {
        console.log(`DevShop is running at ${linkApp}:${port}`)
    }
})
