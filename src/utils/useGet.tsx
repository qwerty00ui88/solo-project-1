import axios from 'axios'
import { useEffect, useState } from 'react'

export interface Params {
    query?: string
    include_adult?: string
    language?: string
    page?: string
}

export interface ContentType {
    adult: boolean
    backdrop_path: string
    id: number
    title?: string
    name?: string
    original_language: string
    original_name: string
    overview: string
    poster_path: string
    media_type: string
    genre_ids: number[]
    popularity: number
    release_date?: string
    first_air_date?: string
    vote_average: number
    vote_count: number
    origin_country: string[]
}

export interface PeopleType {
    adult: boolean
    id: number
    name: string
    original_name: string
    media_type: string
    popularity: number
    gender: number
    known_for_department: string
    profile_path: string
    known_for: ContentType[]
    total_pages: number
    total_results: number
}

export interface TrendingContent {
    page: number
    results: ContentType[]
    total_pages: number
    total_results: number
}

export interface TrendingPeople {
    page: 1
    results: PeopleType[]
    total_pages: number
    total_results: number
}

export interface Video {
    id: number
    results: {
        iso_639_1: string
        iso_3166_1: string
        name: string
        key: string
        site: string
        size: number
        type: string
        official: boolean
        published_at: string
        id: string
    }[]
}

export interface Genre {
    id: number
    name: string
}

export interface ContentDetail {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: {
        id: number
        name: string
        poster_path: string
        backdrop_path: string
    }
    budget: number
    genres: {
        id: number
        name: string
    }[]

    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: {
        id: number
        logo_path: string
        name: string
        origin_country: string
    }[]

    production_countries: {
        iso_3166_1: string
        name: string
    }[]
    release_date: string
    revenue: 0
    runtime: 110
    spoken_languages: {
        english_name: string
        iso_639_1: string
        name: string
    }[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

function useGet<T>(url: string, params: Params, dependency?: string[]) {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<null | Error>(null)

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
            setLoading(false)
        } catch (axiosError) {
            setError(axiosError as Error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [url, JSON.stringify(params), ...(dependency || [])])

    return { data, loading, error }
}

export default useGet
