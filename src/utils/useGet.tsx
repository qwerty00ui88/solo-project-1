import axios from 'axios'
import { useEffect, useState } from 'react'

export interface Params {
    query?: string
    include_adult?: boolean
    include_video?: boolean
    language?: string
    page?: number
    append_to_response?: string
    sort_by?: string
    without_genres?: string
    'vote_count.gte'?: number | null
    with_release_type?: number | null
    'release_date.gte'?: string | null
    'release_date.lte'?: string | null
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

export interface PersonCommon {
    adult: boolean
    id: number
    name: string
    original_name: string
    popularity: number
    gender: number
    known_for_department: string
    profile_path: string
}

export interface PersonType extends PersonCommon {
    media_type: string
    known_for: ContentType[]
    total_pages: number
    total_results: number
}

export interface Contents {
    page: number
    results: ContentType[]
    total_pages: number
    total_results: number
}

export interface People {
    page: number
    results: PersonType[]
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

export interface Person extends PersonCommon {
    character: string
    credit_id: string
    order: number
}

export interface Credits {
    cast: Person[]
    crew: Person[]
}

export interface MovieDetail {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: {
        id: number
        name: string
        poster_path: string
        backdrop_path: string
    }
    budget: number
    genres: Genre[]
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
    revenue: number
    runtime: number
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
    credits: Credits
}

export interface Episode {
    id: number
    name: string
    overview: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    episode_type: string
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: null | string
}

export interface TVDetail {
    adult: boolean
    backdrop_path: string
    created_by: []
    episode_run_time: number[]
    first_air_date: string
    genres: Genre[]
    homepage: string
    id: number
    in_production: boolean
    languages: string[]
    last_air_date: string
    last_episode_to_air: Episode
    name: string
    next_episode_to_air: Episode
    networks: {
        id: number
        logo_path: string
        name: string
        origin_country: string
    }[]
    number_of_episodes: number
    number_of_seasons: number
    origin_country: string[]
    original_language: string
    original_name: string
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
    seasons: {
        air_date: string
        episode_count: number
        id: number
        name: string
        overview: string
        poster_path: string
        season_number: number
        vote_average: number
    }[]
    spoken_languages: {
        english_name: string
        iso_639_1: string
        name: string
    }[]
    status: string
    tagline: string
    type: string
    vote_average: number
    vote_count: number
    credits: Credits
}

export interface CastAndCrewCommon {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title?: string
    overview: string
    popularity: number
    poster_path: string
    release_date?: string
    title?: string
    video: boolean
    vote_average: number
    vote_count: number
    credit_id: string
    media_type: string
    origin_country?: string[]
    original_name?: string
    first_air_date?: string
    name?: string
    episode_count?: number
}

export interface Cast extends CastAndCrewCommon {
    character: string
    order: number
}

export interface Crew extends CastAndCrewCommon {
    department: string
    job: string
}

export interface PersonDetail {
    adult: boolean
    also_known_as: string[]
    biography: string
    birthday: string
    deathday: null | string
    gender: number
    homepage: null | string
    id: number
    imdb_id: string
    known_for_department: string
    name: string
    place_of_birth: string
    popularity: number
    profile_path: string
    combined_credits: {
        cast: Cast[]
        crew: Crew[]
    }
}

function useGet<T>(url: string, params: Params, dependency?: string[]) {
    const [data, setData] = useState<T | null>(null)
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState<null | Error>(null)

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

export default useGet
