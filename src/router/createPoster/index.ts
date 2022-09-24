import express from 'express'
const nodeHtmlToImage = require('node-html-to-image')
import fs from 'fs'
import html from './html'

async function createPoster(req: express.Request, res: express.Response) {
    const currentTime = new Date().valueOf()
    const output = currentTime + '.png'

    const image = await nodeHtmlToImage({
        output,
        html
    }) as Buffer

    const base64Image = Buffer.from(image).toString('base64')
    const dataURI = 'data:image/jpeg;base64,' + base64Image

    fs.unlink(output, () => void console.log(`删除文件：${output}`))
    res.set({ 'Content-Type': 'text/html' })
    res.send(`<img src=${dataURI} />`)

}

export default createPoster

