import express from 'express'
import { createPosterMiddleWareNextParams } from './interface'
import { upload as aliyunUpload } from '../../api/aliyun'

export async function upload(req: createPosterMiddleWareNextParams, res: express.Response) {
    const { domain, signature, OSSAccessKeyId, key, policy } = req.body.aliyunParams
    const { posterStream } = req.body
    const x_oss_security_token = req.body.aliyunParams['x-oss-security-token']
    try {
        await aliyunUpload({
            url: domain,
            data: {
                signature,
                OSSAccessKeyId,
                key,
                policy,
                'x-oss-security-token': x_oss_security_token,
                file: posterStream
            }
        })
        const { successKey, successPath } = req.body.aliyunUploadResponse
        const responseData = {
            domain,
            key: successKey,
            fullPath: successPath
        }

        // 返回给前端
        res.send({
            code: 10000,
            data: responseData
        })
    } catch (error) {
        res.send({
            code: 9999,
            data: error
        })
    }
}