import axios, { AxiosPromise } from 'axios'
import { aliyunTokenResInterface } from './interface'

export function aliyunToken(params): AxiosPromise<aliyunTokenResInterface> {
    const url = process.env.BASE_URL + '/gfm/minami/material/token/aliyun?' + params
    return axios(url, { method: 'get' })
}

export default function upload(formData) {
    return axios('https://mystore-img-test.was.ink/', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
}

