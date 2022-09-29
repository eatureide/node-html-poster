import express from 'express'

interface bodyInterface {
    html: string
    plat: string
    version: string
    timestamp: string
    app_version: string
    app_key: string
    session_token: string
    access_token: string
    api_sign: string
}

type posterStream = object

interface aliyunParamsInterface {
    domain: string
    signature: string
    OSSAccessKeyId: string
    key: string
    policy: string
    'x-oss-security-token': string
}

interface aliyunUploadResponseInterface {
    successKey: string
    successPath: string
}

type k1 = keyof bodyInterface

export interface createPosterMiddleWareNextParams extends bodyInterface, aliyunParamsInterface, aliyunUploadResponseInterface { }