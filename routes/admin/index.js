const init = db => {
    const router = require('express').Router()

    const categoriesRouter = require('./categories')

    router.use((req, res, next) => {
        if (req.session.user) {
            if (req.session.user.roles.indexOf('admin') < 0) {
                res.redirect('/')
            } else {
                next()
            }
        } else {
            res.redirect('/login')
        }
    })

    router.get('/', (req, res) => res.send('/admin/'))
    router.use('/categories', categoriesRouter(db))

    return router
}

module.exports = init