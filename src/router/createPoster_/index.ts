import express from 'express'
import nodeHtmlToImage from 'node-html-to-image'

interface requestBody extends express.Response {
    body: {
        html: string
        type: string
        [key: string]: any
    }
}

// 生成base64
async function createBse64(image: Buffer) {
    const base64Image = Buffer.from(image).toString('base64');
    const dataURI = 'data:image/jpeg;base64,' + base64Image
    return dataURI
}

// 上传图片至阿里云并返回
async function uploadImage(image: Buffer) {
    const blob = new Blob([image])
}

async function createPoster(req: requestBody, res: express.Response) {
    // 随机图片的名称
    const currentTime = new Date().valueOf()
    // 文件保存后的路径
    const filePath = currentTime + '.png'
    const { html, type } = req.body

    // 生成海报
    const image = await nodeHtmlToImage({
        output: filePath,
        html: decodeURIComponent(html)
    }) as Buffer


    const handleResult = () => {
        switch (type) {
            case 'base64':
                return createBse64(image)
            case 'imgUrl':
                return uploadImage(image)
        }
    }

    const result = await handleResult()

    // 返回给前端
    res.set({ 'Content-Type': 'application/json' })
    res.json({
        code: 10000,
        data: {
            image: result
        }
    })
}

module.exports = createPoster