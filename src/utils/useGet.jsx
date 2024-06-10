import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useGet(url, params, dependency) {
    const [data, setData] = useState(null)

    const options = {
        method: 'GET',
        url,
        params,
        headers: {
            accept: 'application/json',
            Authorization: process.env.REACT_APP_TMDB_KEY,
        },
    }

    const getData = async () => {
        try {
            const response = await axios.request(options)
            setData(response.data)
        } catch (axiosError) {
            // eslint-disable-next-line no-console
            console.log(axiosError)
        }
    }

    useEffect(() => {
        getData()
    }, [url, JSON.stringify(params), ...(dependency || [])])

    return { data }
}
