const slug = require('../utils/slug')

const getProductsByCategoryId = db => async (idCategory) => {
    // const products = await db('products as p').select('p.*').where('p.id', function () {
    //     this
    //         .select('cp.product_id')
    //         .from('categories_products as cp')
    //         .whereRaw('cp.product_id = p.id')
    //         .where('cp.category_id', req.params.id)
    // })
    const products = await db('products as p')
        .innerJoin('categories_products as cp', 'p.id', 'cp.product_id')
        .where('cp.category_id', idCategory)
        .distinct('p.*')
    return products
}

module.exports = {
    getProductsByCategoryId,
}