import express from 'express'
import createPoster from './router/createPoster'

const app = express()
const port = 3000

const json = express.json({ type: 'application/json' })

// 只接收application/json
app.use(json)

// 生成海报图
app.post('/createPoster', createPoster)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})