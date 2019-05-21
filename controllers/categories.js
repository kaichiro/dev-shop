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

module.exports = {
    getCategories,
}