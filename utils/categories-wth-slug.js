const slug = require('./slug')

module.exports = (categories) => {
    const categoriesWithSlug = categories.map(category => {
        const newCategory = { ...category, slug: slug(category.category) }
        return newCategory
    })
    return categoriesWithSlug
}