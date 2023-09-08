import axios from 'axios'
import { useEffect, useState } from 'react'

interface Params {
    query?: string
    include_adult?: string
    language?: string
    page?: string
}

function useGet(
    key: string,
    url: string,
    params: Params,
    dependency?: string[]
) {
    const [data, setData] = useState([])
    const options = {
        method: 'GET',
        url,
        params,
        headers: {
            accept: 'application/json',
            Authorization: process.env.REACT_APP_API_KEY,
        },
    }

    const getData = async () => {
        try {
            const response = await axios.request(options)
            setData(response.data[key])
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error)
        }
    }

    useEffect(() => {
        getData()
    }, [url, JSON.stringify(params), ...(dependency || [])])

    return data
}

export default useGet
