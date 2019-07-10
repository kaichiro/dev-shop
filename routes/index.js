const init = db => {
    const router = require('express').Router()

    const auth = require('../controllers/auth')

    const homeController = require('../controllers/home')

    const adminRouter = require('./admin')
    const categoriesRouter = require('./categories')
    const productsRouter = require('./products')

    router.get('/', homeController.getIndex)
    router.get('/logout', auth.logout)
    router.post('/login', auth.login(db))

    router.use('/admin', adminRouter(db))
    router.use('/category', categoriesRouter(db))
    router.use('/product', productsRouter(db))

    return router
}

module.exports = init