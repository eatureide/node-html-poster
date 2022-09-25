import express from 'express'
import nodeHtmlToImage from 'node-html-to-image'
import { AxiosResponse } from 'axios'
import uploadFile from './uploadFile'
import fs from 'fs'

interface uploadResultInterface extends AxiosResponse {
    status: number
}

interface createPosterInterReqInterface {
    signature: string
    OSSAccessKeyId: string
    key: string
    policy: string
    'x-oss-security-token': string
    html: string
}

const bodyKeys = ['signature', 'OSSAccessKeyId', 'key', 'policy', 'x-oss-security-token', 'html']

async function createPoster(req: express.Request, res: express.Response) {

    const currentTime = new Date().valueOf()
    const output = '../../static' + currentTime + '.png'
    const { html, ...reset }: createPosterInterReqInterface = req.body
    // 检查必传字段
    const findErrorKey = bodyKeys.find((key) => {
        return !req.body[key] || typeof req.body[key] !== 'string'
    })

    // 如有空或者类型不正确则返回错误
    if (findErrorKey) {
        res.send({
            code: 99999,
            data: findErrorKey + '必传且类型必须为字符串'
        })
        return
    }

    // 生成图片
    await nodeHtmlToImage({
        output,
        transparent: true,
        html: html
    })

    // 生成完成后上传至阿里云
    const uploadResult: uploadResultInterface = await uploadFile({
        ...reset,
        file: fs.createReadStream(output)
    })

    // 上传完成后删除本地图片
    fs.unlink(output, () => {
        console.log('文件', output, '已删除')
    })

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