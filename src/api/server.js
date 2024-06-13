import axios from 'axios'

const serverUrl = process.env.REACT_APP_SERVER_URL

export async function getData(url, config = {}) {
    return axios
        .get(`${serverUrl}${url}`, { ...config, withCredentials: true })
        .then((res) => {
            return res.data
        })
}

export async function postData(url, data, config = {}) {
    return axios
        .post(`${serverUrl}${url}`, data, { ...config, withCredentials: true })
        .then((res) => {
            return res.data
        })
}

export async function deleteData(url, config = {}) {
    return axios
        .delete(`${serverUrl}${url}`, {
            ...config,
            withCredentials: true,
        })
        .then((res) => {
            return res.data
        })
}

export async function updateData(url, data, config = {}) {
    return axios
        .put(`${serverUrl}${url}`, data, {
            ...config,
            withCredentials: true,
        })
        .then((res) => {
            return res.data
        })
}
