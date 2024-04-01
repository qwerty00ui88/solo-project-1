import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Carousel from '../components/Carousel'
import SearchBar from '../components/SearchBar'
import FloatingBar from '../components/FloatingBar'
import Trending from '../components/Trending'
import RecommendedVideo from '../components/RecommendedVideo'
import StatModal from '../components/StatModal'
import { MovieType, TVType } from '../components/MyFavorite'

const MainWrapper = styled.main``

interface UtilityBarProps {
    $isOpen: boolean
    $isScrolledDown: boolean
    $floatingBarOpen: boolean
}

interface DataType {
    allTrending: (MovieType | TVType)[]
    movieTrending: MovieType[]
    allTrendingVideo: string[]
}

const UtilityBar = styled.div<UtilityBarProps>`
    display: flex;
    column-gap: ${(props) =>
        props.$isOpen || props.$isScrolledDown || props.$floatingBarOpen
            ? null
            : `10px`};
    height: ${(props) => (props.$isOpen ? null : `6vw`)};
    min-height: ${(props) => (props.$isOpen ? null : `44px`)};
    max-height: ${(props) => (props.$isOpen ? null : `57px`)};
`

function Main() {
    const serverUrl = process.env.REACT_APP_SERVER_URL
    const [data, setData] = useState<DataType | undefined>()
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolledDown, setIsScrollDown] = useState(false)
    const [floatingBarOpen, setFloatingBarOpen] = useState(false)

    const handleSetIsOpen = () => {
        setIsOpen(!isOpen)
    }

    const scrollToSearchBar = () => {
        window.scrollTo({
            top: window.innerHeight * 0.62,
            behavior: 'smooth',
        })
    }

    const handleSetFloatingBarOpen = () => {
        setFloatingBarOpen(!floatingBarOpen)
    }

    window.addEventListener('scroll', () => {
        const { scrollY } = window
        setIsScrollDown(scrollY >= 12)
    })

    useEffect(() => {
        if (isOpen) {
            scrollToSearchBar()
        }
    }, [isOpen])

    useEffect(() => {
        axios
            .get(`${serverUrl}/mainpage/`, {
                withCredentials: true,
            })
            .then((response) => {
                setData(response.data)
            })
    }, [])

    return (
        data && (
            <MainWrapper>
                <div>
                    <Carousel data={data.allTrending} />
                    <UtilityBar
                        $isOpen={isOpen}
                        $isScrolledDown={isScrolledDown}
                        $floatingBarOpen={floatingBarOpen}
                    >
                        <SearchBar
                            isOpen={isOpen}
                            handleSetIsOpen={handleSetIsOpen}
                        />
                        {floatingBarOpen ? (
                            <StatModal handleClose={handleSetFloatingBarOpen} />
                        ) : (
                            <button
                                type="button"
                                onClick={handleSetFloatingBarOpen}
                                aria-label="floatingBar"
                            >
                                <FloatingBar
                                    isOpen={isOpen}
                                    isScrolledDown={isScrolledDown}
                                />
                            </button>
                        )}
                    </UtilityBar>
                </div>
                <Trending trendingData={data.movieTrending} />
                <RecommendedVideo videoData={data.allTrendingVideo} />
            </MainWrapper>
        )
    )
}

export default Main
