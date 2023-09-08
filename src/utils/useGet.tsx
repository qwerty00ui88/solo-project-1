import axios from 'axios'
import { useEffect, useState } from 'react'

interface ParamsType {
    query?: string
    include_adult?: string
    language?: string
    page?: string
}

export interface Data {
    adult: boolean
    backdrop_path: string
    id: number
    title?: string
    original_language: string
    original_title: string
    overview: string
    poster_path: string
    media_type: string
    genre_ids: number[]
    popularity: number
    release_date?: string
    video: boolean
    vote_average: number
    vote_count: number
    name?: string
    first_air_date?: string
}

function useGet(
    key: string,
    url: string,
    params: ParamsType,
    dependency?: string[]
) {
    const [data, setData] = useState([])
    const options = {
        method: 'GET',
        url,
        params,
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTUyOWMwZTgyNzcxZTg2NzdkY2Q5ZGY1NDBlZTEyYyIsInN1YiI6IjY0ZTA5ODEyYTNiNWU2MDFkNTllNjA2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D9VKIXgwklDnixzscKkkoyBRJdQJsetwFke4bU9KiP0',
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
