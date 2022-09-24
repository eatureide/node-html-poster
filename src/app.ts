import createPoster from './router/createPoster'
import express from 'express'

const app = express()
const port = 3000

const json = express.json({ type: 'application/json' })

// 只接收application/json
app.use(json)

// 生成海报图
app.get('/', createPoster)
app.get('/createPoster', createPoster)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})