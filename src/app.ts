import express from 'express'
import createPoster from './router/createPoster'
import { config } from 'dotenv'
import { demo } from './router/demo'

const app = express()
const port = 3000
const path = process.env.BUILD_ENV === 'uat' ? '.env.uat' : '.env'

config({ path })
app.use(express.urlencoded({ extended: false }))

// 生成海报图
app.post(
    '/create/poster',
    createPoster.checkRequest, // 检查参数
    createPoster.aliyunToken, // 获取阿里云token
    createPoster.createPoster, // 生成海报
    createPoster.upload // 上传海报并返回结果给前端
)

app.get('/demo', demo)

app.listen(port, () => {
    console.log(`当前环境:`, process.env.BUILD_ENV)
    console.log(`启动端口:`, port)
})