const init = db => {
    const express = require('express')
    const app = express()
    const bodyParser = require('body-parser')
    const session = require('express-session')

    const categoryModel = require('./models/category')
    const routes = require('./routes')

    app.use(session({
        secret: 'MyDevShopRulez!',
        name: 'sessionId',
    }))

    app.use(bodyParser.json({ extended: true }))
    app.use(bodyParser.urlencoded({ extended: true }))

    app.set('view engine', 'ejs')
    app.use(express.static('public'))

    /** middleware */
    app.use(async (req, res, next) => {
        const categories = await categoryModel.getCategories(db)()
        const { user } = req.session
        res.locals = {
            categories,
            user,
        }
        next()
    })

    app.use(routes(db))

    return app
}

module.exports = init