import axios from 'axios'
import qs from 'qs'

let instance = axios.create(({
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: data => qs.stringify(data)
}))

const api = {
    get(url, params) {
        return instance({
            method: 'get',
            url,
            params,
        })
    },
    post(url, data) {
        return instance({
            method: 'post',
            url,
            data: data,
        })
    },
    put (url, params, data) {
        const config = {
            method: 'put',
            url: url
        }
        if (params) {
            config.params = params
        }
        if (data) {
            config.data = data
        }
        return instance(config)
    },
    delete (url, params) {
        const config = {
            method: 'delete',
            url: url
        }
        if (params) {
            config.params = params
        }
        return instance(config)
    }
}

export default api
