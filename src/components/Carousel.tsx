import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import axios from 'axios'
import CarouselCards from './CarouselCards'
import Indicator from './Indicator'

const Viewer = styled.div`
    overflow: hidden;
`

interface SlideProps {
    currentindex: number
    movewidth: number
}

const Slide = styled.div<SlideProps>`
    display: flex;
    transition: transform 0.8s ease;
    transform: ${(props) =>
        `translateX(-${props.currentindex * props.movewidth}px)`};
`

const CarouselWrapper = styled.div`
    height: 100%;
`

export interface Data {
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
    const [data, setData] = useState<Data[]>([])
    const [currentIndex, setCurrentIndex] = useState(1)
    const ref = useRef<HTMLDivElement>(null)

    const slideData: { id: number; data: Data[] }[] = [
        { id: 0, data: data.slice(10, 15) },
        { id: 1, data: data.slice(0, 5) },
        { id: 2, data: data.slice(5, 10) },
        { id: 3, data: data.slice(10, 15) },
        { id: 4, data: data.slice(0, 5) },
    ]

    const goToPre = () => {
        setCurrentIndex(currentIndex - 1)
    }

    const goToNext = () => {
        setCurrentIndex(currentIndex + 1)
    }

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
            setData(response.data.results)
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
            <Viewer>
                <Slide
                    currentindex={currentIndex}
                    movewidth={ref.current ? ref.current.clientWidth : 0}
                >
                    {slideData.map((el) => {
                        return (
                            <CarouselCards
                                key={el.id}
                                data={el.data}
                                CarouselCardsRef={ref}
                            />
                        )
                    })}
                </Slide>
            </Viewer>
            <Indicator goToPre={goToPre} goToNext={goToNext} />
        </CarouselWrapper>
    )
}

export default Carousel
