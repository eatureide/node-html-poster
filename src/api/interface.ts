export interface aliyunTokenResInterface {
    code: number
    message: string
    data: {
        domain: string
        prefix: string
        token: string
        region: string
        access_key_id: string
        access_key_secret: string
        bucket: string
        policy: string
        expire: string
    }
}
