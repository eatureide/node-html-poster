import { Duplex } from 'stream'
import nodeHtmlToImage from 'node-html-to-image'
import { createPosterMiddleWareNextParams } from './interface'
import express from 'express'

export async function createPoster(req: createPosterMiddleWareNextParams, res: express.Response, next: express.NextFunction) {
    const { html } = req.body

    const imageBuffer = await nodeHtmlToImage({
        transparent: true,
        html: html
    }) as Buffer

    const stream = new Duplex()
    stream.push(imageBuffer)
    stream.push(null)

    req.body.posterStream = stream
    next()
}