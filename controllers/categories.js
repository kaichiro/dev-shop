const categoryModel = require('../models/category')
const productModel = require('../models/product')

const getCategories = db => async (req, res) => {
    const idCategory = req.params.id
    const category = await categoryModel.getCategoryById(db)(idCategory)
    const products = await productModel.getProductsByCategoryId(db)(idCategory)
    res.render('category', {
        category,
        products,
    })
}

const adminGetCategories = db => async (req, res) => {
    const categories = await categoryModel.getCategories(db)()
    res.render('admin/categories/index', {
        categories,
    })
}

const adminCreateCategory = db => async (req, res) => {
    if (req.method === 'GET' || req.method === 'get') {
        res.render('admin/categories/Create')
    } else {
        await db('categories').insert(req.body)
        res.send(req.body)
    }
}

module.exports = {
    getCategories,
    adminGetCategories,
    adminCreateCategory,
}