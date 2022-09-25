import express from 'express'
import nodeHtmlToImage from 'node-html-to-image'
import fs from 'fs'
import html from './html'
import { uploadFile } from './ali'
import axios, { AxiosResponse } from 'axios'

interface uploadResultInterface extends AxiosResponse {
    status: number
}

async function createPoster(req: express.Request, res: express.Response) {
    const currentTime = new Date().valueOf()
    const output = './' + currentTime + '.png'

    const image = await nodeHtmlToImage({
        output,
        html
    }) as Buffer

    const uploadResult: uploadResultInterface = await uploadFile({
        ...req.body,
        file: fs.createReadStream(output)
    })

    fs.unlink(output, () => {
        console.log('文件', output, '已删除')
    })

    res.set({ 'Content-Type': 'application/json' })

    if (uploadResult.status !== 204) {
        res.send({
            code: 99999,
            data: 'fail:图片生成或者上传失败'
        })
    }

    res.send({
        code: 10000,
        data: {
            fullPath: `https://mystore-img-test.was.ink/${req.body.key}`
        }
    })
}

export default createPoster

