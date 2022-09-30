import { Duplex } from 'stream'
import nodeHtmlToImage from 'node-html-to-image'
import { bodyInterface } from './interface'
import express from 'express'
import { ERROR_CODE } from '@/constant'

export async function createPoster(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const { html, type }: bodyInterface = req.body
        const startTime = new Date().valueOf()
        const imageBuffer = await nodeHtmlToImage({
            transparent: true,
            html: html
        }) as Buffer
        const endTime = new Date().valueOf()
        const resultTime =  ((endTime - startTime) / 1000 ) + 's'
        console.log(resultTime)

        const returnBase64 = () => {
            const base64Image = Buffer.from(imageBuffer).toString('base64');
            res.send({
                code: 10000,
                data: {
                    base64: base64Image
                }
            })
        }

        const returnPng = () => {
            const stream = new Duplex()
            stream.push(imageBuffer)
            stream.push(null)
            req.body.posterStream = stream
            next()
        }

        switch (type) {
            case 'base64':
                returnBase64()
                return
            case 'png':
            default:
                returnPng()
                return
        }
    } catch (error) {
        res.send({
            code: ERROR_CODE,
            data: error
        })
    }
}