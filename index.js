const express = require('express')
const app = express()
const path = require('path')

require('dotenv')

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('DevShop')
})

app.listen(port, err => {
    const linkApp = 'http://localhost'
    if (err) {
        console.log(`Server doesn't work! `, err)
    } else {
        console.log(`DevShop is running at ${linkApp}:${port}`)
    }
})