const init = db => {
    const router = require('express').Router()
    const categories = require('../../controllers/categories')

    router.get('/', categories.adminGetCategories(db))

    router.get('/Create', categories.adminCreateCategory(db))
    router.post('/Create', categories.adminCreateCategory(db))

    return router
}

module.exports = init