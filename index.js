const express = require('express')
const app = express()
const path = require('path')
const {
    getCategoryById,
    getCategories,
} = require('./models/Category')
const {
    getProductsByCategoryId,
    getProductById,
} = require('./models/Product')
const {
    host,
    port_db,
    user,
    password,
    database,
    client,
} = require('./config-db.json')

require('dotenv/config')

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
    if ('true' === process.env.DEBUG_SQL_CMD) {
        const {
            method,
            options,
            __knexQueryUid,
            sql,
        } = query
        // console.log(`\n${new Date()}`)
        // console.log('/// BEGIN \\\\\\')
        // console.log('method:', method)
        // console.log('options:', options)
        // console.log('__knexQueryUid:', __knexQueryUid)
        console.log('sql:', sql)
        // console.log('\\\\\\ END ///\n')
    }
})

app.set('view engine', 'ejs')
app.use(express.static('public'))

/** middleware */
app.use(async (req, res, next) => {
    const categories = await getCategories(db)()
    res.locals = {
        categories
    }
    next()
})

app.get('/', async (req, res) => {
    // const categories = await getCategories(db)()
    /* o middleware já vai passar esta informação */
    res.render('home')

})

app.get('/category/:id/:slug', async (req, res) => {
    const idCategory = req.params.id
    const category = await getCategoryById(db)(idCategory)
    // const categories = await getCategories(db)()
    const products = await getProductsByCategoryId(db)(idCategory)
    res.render('category', {
        category,
        // categories,
        products,
    })
})

app.get('/product/:id/:slug', async (req, res) => {
    const product = await getProductById(db)(req.params.id)
    // const categories = await getCategories(db)()
    res.render('product-detail', {
        product,
        // categories,
    })
})

app.listen(port, err => {
    const linkApp = 'http://localhost'
    if (err) {
        console.log(`Server doesn't work! `, err)
    } else {
        console.log(`DevShop is running at ${linkApp}:${port}`)
    }
})
