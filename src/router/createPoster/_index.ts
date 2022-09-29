import express from 'express'
import nodeHtmlToImage from 'node-html-to-image'
import { Duplex } from 'stream'
import { aliyunToken } from '../../api/aliyun'
import { CryptoJS } from '../../utils/aes'
import uploadFile from './uploadFile'
import qs from 'qs'

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

export async function createPoster(req: express.Request, res: express.Response) {

    // 获取请求参数
    const { html, ...reset } = req.body
    const fileType = '.png'

    // 如果不是html的话，返回报错
    if (!html) {
        res.send({
            code: 99999,
            message: '缺少html或不是标准html字符串'
        })
    }

    const aliyunTokenRes = await aliyunToken(qs.stringify(reset))
    const { domain, prefix, token, region, access_key_id, access_key_secret, bucket, policy, expire } = aliyunTokenRes.data.data
    const policyBase64 = getPolicyBase64(expire)
    const signature = getSignature(access_key_secret, policyBase64) //获取签名

    // 生成图片
    const imageBuffer = await nodeHtmlToImage({
        transparent: true,
        html: html
    }) as Buffer

    // 创建stream流
    const stream = new Duplex()
    stream.push(imageBuffer)
    stream.push(null)

    // 生成完成后上传至阿里云
    const successKey = `${prefix}${fileType}`
    const successPath = `${domain}${successKey}`
    const uploadResult = await uploadFile({
        'signature': signature,
        'OSSAccessKeyId': access_key_id,
        'key': successKey,
        'policy': policyBase64,
        'x-oss-security-token': token,
        file: stream
    })

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
}

