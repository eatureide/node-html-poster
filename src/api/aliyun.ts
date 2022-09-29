import axios, { AxiosPromise } from 'axios'
import { aliyunTokenResInterface } from './interface'

export function aliyunToken(params): AxiosPromise<aliyunTokenResInterface> {
    const url = process.env.BASE_URL + '/gfm/minami/material/token/aliyun?' + params
    return axios(url, { method: 'get' })
}

export function upload(formData) {
    const { url, data } = formData
    return axios(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}

