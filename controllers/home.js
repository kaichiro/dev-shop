const getIndex = async (req, res) => {
    // const categories = await getCategories(db)()
    /* o middleware já vai passar esta informação */
    res.render('home')
}

module.exports = {
    getIndex
}