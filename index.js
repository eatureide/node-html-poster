const createPoster = require('./createPoster')
const createPoster_ = require('./createPoster_')
const express = require('express')
const app = express()
const port = 3000

const json = express.json({ type: 'application/json' })

// 只接收application/json
app.use(json)

// 生成海报图
app.get('/', createPoster)

// 生成海报图post
app.post('/create/poster', createPoster_)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})