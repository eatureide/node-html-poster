import express from 'express'
import { allBodyKey, bodyInterface } from './interface'
import { ERROR_CODE } from '@/constant'

export function checkRequest(req: express.Request, res: express.Response, next: express.NextFunction) {
    // 检查参数，找到为空或者不为字符串的
    const body: bodyInterface = req.body
    const findNullProperty = allBodyKey.find((key) => {
        if (typeof body[key] !== 'string') return key
        if (!body[key]) return key
    })
    if (findNullProperty) {
        const errorData = {
            code: ERROR_CODE,
            message: findNullProperty + '为空或类型不为字符串'
        }
        res.send(errorData)
        return
    }
    next()
}