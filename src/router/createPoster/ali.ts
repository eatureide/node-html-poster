import axios from 'axios'

export function uploadFile(formData) {
    return axios('https://mystore-img-test.was.ink/', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
}

