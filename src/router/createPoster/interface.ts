import express from 'express'

export interface createPosterMiddleWareNextParams extends express.Request {
    body: {
        html: string
        plat: string
        version: string
        timestamp: string
        app_version: string
        app_key: string
        session_token: string
        access_token: string
        api_sign: string
        aliyunParams: {
            signature: string
            OSSAccessKeyId: string
            key: string
            policy: string
            'x-oss-security-token': string
        },
        aliyunUploadResponse: {
            successKey: string
            successPath: string
        }
        posterStream: object
    }

}