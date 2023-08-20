import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import axios from 'axios'
import CarouselCards from './CarouselCards'
import Indicator from './Indicator'

const Div = styled.div`
    display: flex;
    width: 100%;
`

const CarouselWrapper = styled.div`
    /* overflow: hidden; */
    height: 100%;
`

export interface Info {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

function Carousel() {
    const [info, setInfo] = useState<Info[]>([])

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/movie',
        params: {
            include_adult: 'false',
            include_video: 'false',
            language: 'ko-KR',
            page: '1',
            sort_by: 'popularity.desc',
        },
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTUyOWMwZTgyNzcxZTg2NzdkY2Q5ZGY1NDBlZTEyYyIsInN1YiI6IjY0ZTA5ODEyYTNiNWU2MDFkNTllNjA2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D9VKIXgwklDnixzscKkkoyBRJdQJsetwFke4bU9KiP0',
        },
    }

    const fetchData = async () => {
        try {
            const response = await axios.request(options)
            // eslint-disable-next-line no-console
            setInfo(response.data.results)
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <CarouselWrapper>
            <Div>
                <CarouselCards info={info.slice(0, 4)} />
                <CarouselCards info={info.slice(4, 8)} />
                <CarouselCards info={info.slice(8, 12)} />
            </Div>
            <Indicator />
        </CarouselWrapper>
    )
}

export default Carousel
