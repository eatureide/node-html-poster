import { Duplex } from 'stream'
import nodeHtmlToImage from 'node-html-to-image'
import { bodyInterface } from './interface'
import express from 'express'
import { ERROR_CODE } from '@/constant'
import path from 'path'
import font2base64 from 'node-font2base64'

export async function createPoster(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const { html, type, font }: bodyInterface = req.body
        const createFontFace = () => {
            let style = ''
            const fontArr = font.split(',')
            if (!fontArr.length) return style
            fontArr.forEach((item) => {
                const fontStream = path.resolve(__dirname, `../../static/font/${item}.woff2`)
                const data = font2base64.encodeToDataUrlSync(fontStream)
                style = style += `
                    <style>
                      @font-face {
                        font-family: ${item};
                        src: url(${data}) format('woff2');
                      }
                    </style>
                  `
            })

            return style
        }

        const imageBuffer = await nodeHtmlToImage({
            transparent: true,
            html: createFontFace() + html
        }) as Buffer

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
        console.log(error)
        res.send({
            code: ERROR_CODE,
            data: error
        })
    }
}