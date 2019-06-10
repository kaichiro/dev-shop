const init = db => {
    const router = require('express').Router()

    const auth = require('../controllers/auth')

    const homeController = require('../controllers/home')
    const categoriesRouter = require('./categories')
    const productsRouter = require('./products')

    router.get('/', homeController.getIndex)
    router.post('/login', auth.login(db))
    router.get('/logout', auth.logout)
    router.use('/category', categoriesRouter(db))
    router.use('/product', productsRouter(db))

    return router
}

module.exports = init