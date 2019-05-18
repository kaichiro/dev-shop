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
    const {
        method,
        options,
        __knexQueryUid,
        sql,
    } = query
    console.log('\n/// BEGIN \\\\\\')
    console.log('method:', method)
    console.log('options:', options)
    console.log('__knexQueryUid:', __knexQueryUid)
    console.log('sql:', sql)
    console.log('\\\\\\ END ///\n')
})

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', async (req, res) => {
    const categories = await db('categories').select('*')
    console.log(categories)
    res.render('home', {
        categories,
    })
})

app.get('/category/:id', async (req, res) => {
    // const products = await db('products as p').select('p.*').where('p.id', function () {
    //     this
    //         .select('cp.product_id')
    //         .from('categories_products as cp')
    //         .whereRaw('cp.product_id = p.id')
    //         .where('cp.category_id', req.params.id)
    // })
    const products = await db('products as p')
        .innerJoin('categories_products as cp', 'p.id', 'cp.product_id')
        .where('cp.category_id', req.params.id)
        // .select('p.*')
        .distinct('p.*')
    res.send(products)
})

app.listen(port, err => {
    const linkApp = 'http://localhost'
    if (err) {
        console.log(`Server doesn't work! `, err)
    } else {
        console.log(`DevShop is running at ${linkApp}:${port}`)
    }
})