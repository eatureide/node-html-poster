const createPoster = require('./createPoster')
const express = require('express')
const app = express()
const port = 3000

// 生成海报图
app.get('/', createPoster)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})