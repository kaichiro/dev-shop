const express = require('express')
const app = express()
const path = require('path')
const {
    host,
    port_db,
    user,
    password,
    database,
    client,
} = require('./config-db.json')

require('dotenv/config')

const categoryModel = require('./models/category')

const categoriesController = require('./controllers/categories')
const productsController = require('./controllers/products')
const homeController = require('./controllers/home')

const port = process.env.PORT || 3000

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

app.set('view engine', 'ejs')
app.use(express.static('public'))

/** middleware */
app.use(async (req, res, next) => {
    const categories = await categoryModel.getCategories(db)()
    res.locals = {
        categories,
    }
    next()
})

app.get('/', homeController.getIndex)
app.get('/category/:id/:slug', categoriesController.getCategories(db))
app.get('/product/:id/:slug', productsController.getProduct(db))

app.listen(port, err => {
    const linkApp = 'http://localhost'
    if (err) {
        console.log(`Server doesn't work! `, err)
    } else {
        console.log(`DevShop is running at ${linkApp}:${port}`)
    }
})
