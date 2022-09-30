import { CryptoJS } from '@/utils/aes'
import { aliyunToken as getAliYunToken } from '@/api/aliyun'
import { createPosterMiddleWareNextParams } from './interface'
import qs from 'qs'
import express from 'express'
import { ERROR_CODE } from '@/constant'

function getPolicyBase64(expire) {
    const date = new Date(expire)
    date.setHours(date.getHours() + 24) // 过期时间为获取的时间+24小时
    const srcT = date.toISOString() // 如果不是ISO标准，使用 toISOString转一下格式
    const policyText = {
        'expiration': srcT, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
        'conditions': [
            ['content-length-range', 0, 10 * 1024 * 1024] // 设置上传文件的大小限制,10mb
        ]
    }
    const jsonText = JSON.stringify(policyText)
    const policyBase64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(jsonText))
    return policyBase64
}

function getSignature(accessKeySecret, policyBase64) {
    const bytes = CryptoJS.HmacSHA1(policyBase64, accessKeySecret)
    return CryptoJS.enc.Base64.stringify(bytes)
}

export async function aliyunToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const { html, posterStream, ...reset }: createPosterMiddleWareNextParams = req.body
        const aliyunTokenRes = await getAliYunToken(qs.stringify(reset)) // 获取aliyun上传token，摘掉
        const { domain, prefix, token, region, access_key_id, access_key_secret, bucket, policy, expire } = aliyunTokenRes.data.data
        const policyBase64 = getPolicyBase64(expire)
        const signature = getSignature(access_key_secret, policyBase64) //获取签名
        const fileType = '.png'
        const successKey = `${prefix}${fileType}`
        const successPath = `${domain}${successKey}`
        const nextParams = {
            signature: signature,
            OSSAccessKeyId: access_key_id,
            key: successKey,
            policy: policyBase64,
            'x-oss-security-token': token,
            domain
        }
        const aliyunUploadResponse = {
            successKey,
            successPath
        }
        req.body.aliyunParams = nextParams
        req.body.aliyunUploadResponse = aliyunUploadResponse
        next()
    } catch (error) {
        res.send({
            code: ERROR_CODE,
            data: error
        })
    }
}