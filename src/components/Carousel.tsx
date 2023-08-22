import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import axios from 'axios'
import Slide from './Slide'
import Indicator from './Indicator'

const Viewer = styled.div`
    flex: 1; // 세로
    overflow: hidden;
    margin-bottom: 10px;
`

interface SlidesProps {
    $currentindex: number
    $slidewidth: number
    $animation: boolean
}

const Slides = styled.div<SlidesProps>`
    display: flex;
    transition: ${(props) => props.$animation && `transform 0.8s ease`};
    transform: ${(props) =>
        `translateX(-${props.$currentindex * props.$slidewidth}px)`};
    height: 100%;
`

const CarouselWrapper = styled.div`
    display: flex;
    flex-direction: column;
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
    const [slideWidth, setSlideWidth] = useState<number>(0)
    const [animation, setAnimation] = useState(false)
    const slideRef = useRef<HTMLDivElement>(null)

    const slideData: { id: number; data: Data[] }[] = [
        { id: 0, data: data.slice(12, 18) },
        { id: 1, data: data.slice(0, 6) },
        { id: 2, data: data.slice(6, 12) },
        { id: 3, data: data.slice(12, 18) },
        { id: 4, data: data.slice(0, 6) },
    ]

    const goToPre = () => {
        if (currentIndex > 0) {
            setAnimation(true)
            setCurrentIndex((ci) => ci - 1)
        }
    }

    const goToNext = () => {
        if (currentIndex < slideData.length - 1) {
            setAnimation(true)
            setCurrentIndex((ci) => ci + 1)
        }
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

    const getSlideWidth = () => {
        setAnimation(false)
        setSlideWidth(slideRef.current ? slideRef.current.clientWidth : 0)
    }

    const changeIndex = (index: number) => {
        const slides = slideRef.current?.parentElement as HTMLElement
        const handleTransitionEnd = () => {
            setAnimation(false)
            setCurrentIndex(() => index)
            slides.removeEventListener('transitionend', handleTransitionEnd)
        }
        slides.addEventListener('transitionend', handleTransitionEnd)
    }

    useEffect(() => {
        fetchData()
        getSlideWidth()
        window.addEventListener('resize', getSlideWidth)
        return () => {
            window.removeEventListener('resize', getSlideWidth)
        }
    }, [])

    useEffect(() => {
        if (currentIndex === 0) changeIndex(slideData.length - 2)
        else if (currentIndex === 4) changeIndex(1)
    }, [currentIndex])

    return (
        <CarouselWrapper>
            <Viewer>
                <Slides
                    $currentindex={currentIndex}
                    $slidewidth={slideWidth}
                    $animation={animation}
                >
                    {slideData.map((el) => {
                        return (
                            <Slide
                                key={el.id}
                                data={el.data}
                                slideRef={slideRef}
                            />
                        )
                    })}
                </Slides>
            </Viewer>
            <Indicator goToPre={goToPre} goToNext={goToNext} />
        </CarouselWrapper>
    )
}

export default Carousel
