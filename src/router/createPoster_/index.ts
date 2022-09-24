import express from 'express'
const nodeHtmlToImage = require('node-html-to-image')

const html = "%3Chtml%3E%0A%0A%3Chead%3E%0A%20%20%20%20%3Cstyle%3E%0A%20%20%20%20%20%20%20%20*%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20padding:0;%0A%20%20%20%20%20%20%20%20%20%20%20%20margin:0;%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20body%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20width:%20318px;%0A%20%20%20%20%20%20%20%20%20%20%20%20height:%20504px;%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20body%20img%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20width:100%25;%0A%20%20%20%20%20%20%20%20%20%20%20%20height:100%25%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20div%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20width:%20318px;%0A%20%20%20%20%20%20%20%20%20%20%20%20height:%20504px;%0A%20%20%20%20%20%20%20%20%20%20%20%20background:%20url('https://mystore-h5.watsonsvip.com.cn/b-makeup%252Fb-makeup-look.png')%20center-repeast;%0A%20%20%20%20%20%20%20%20%20%20%20%20background-size:%20contain;%0A%20%20%20%20%20%20%20%20%20%20%20%20color:%20%22#fff%22;%0A%20%20%20%20%20%20%20%20%20%20%20%20font-size:%2030px;%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20p%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20color:#202124;%0A%20%20%20%20%20%20%20%20%20%20%20%20font-size:30px;%0A%20%20%20%20%20%20%20%20%20%20%20%20text-align:center;%0A%20%20%20%20%20%20%20%20%20%20%20%20position:absolute;%0A%20%20%20%20%20%20%20%20%20%20%20%20top:0;%0A%20%20%20%20%20%20%20%20%20%20%20%20left:0;%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%3C/style%3E%0A%3C/head%3E%0A%0A%3Cbody%3E%0A%3Cp%3E%E7%89%9B%E9%80%BC%E6%99%B6%E6%99%B6%E9%97%AA%E4%BA%AE%E4%BA%AE%3C/p%3E%0A%3Cimg%20src=%22https://mystore-h5.watsonsvip.com.cn/b-makeup%252Fb-makeup-look.png%22/%3E%0A%3C/body%3E%0A%0A%3C/html%3E"

async function createPoster(req: express.Request, res: express.Response) {

    // 随机图片的名称
    const currentTime = new Date().valueOf()
    // 文件保存后的路径
    const output = currentTime + '.png'
    // 生成海报
    const image = await nodeHtmlToImage({
        output,
        html: decodeURIComponent(req.body.html)
    }) as Buffer
    // 转为base64
    const base64Image = Buffer.from(image).toString('base64');
    const dataURI = 'data:image/jpeg;base64,' + base64Image

    // 返回给前端
    res.set({ 'Content-Type': 'application/json' })
    res.json({
        base64Image: dataURI
    })
}

module.exports = createPoster