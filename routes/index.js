const init = db => {
    const router = require('express').Router()

    const homeController = require('../controllers/home')
    const categoriesRouter = require('./categories')
    const productsRouter = require('./products')

    router.get('/', homeController.getIndex)
    router.use('/category', categoriesRouter(db))
    router.use('/product', productsRouter(db))

    return router
}

module.exports = init