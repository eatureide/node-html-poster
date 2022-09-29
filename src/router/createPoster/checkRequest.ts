import express from 'express'
import { createPosterMiddleWareNextParams } from './interface'

export function checkRequest(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { html }: createPosterMiddleWareNextParams = req.body
    // 如果不是html的话，返回报错
    if (!html) {
        res.send({
            code: 99999,
            message: '缺少html或不是标准html字符串'
        })
    }
    next()
}