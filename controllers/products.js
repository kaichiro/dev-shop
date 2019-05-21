const productModel = require('../models/product')

const getProduct = db => async (req, res) => {
    const product = await productModel.getProductById(db)(req.params.id)
    res.render('product-detail', {
        product,
    })
}

module.exports = {
    getProduct,
}