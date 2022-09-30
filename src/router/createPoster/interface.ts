export const allBodyKey = [
    'html',
    'type',
    'plat',
    'version',
    'timestamp',
    'app_version',
    'app_key',
    'session_token',
    'access_token',
    'api_sign'
]
export interface bodyInterface {
    type: 'base64' | 'png'
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

export interface aliyunParamsInterface {
    domain: string
    signature: string
    OSSAccessKeyId: string
    key: string
    policy: string
    'x-oss-security-token': string
}

export interface aliyunUploadResponseInterface {
    successKey: string
    successPath: string
}

export interface posterStreamInterface {
    posterStream: object
}

export interface createPosterMiddleWareNextParams extends
    bodyInterface,
    posterStreamInterface,
    aliyunParamsInterface,
    aliyunUploadResponseInterface { }