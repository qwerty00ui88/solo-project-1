import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import Carousel from '../components/Carousel'
import SearchBar from '../components/SearchBar'
import FloatingBar from '../components/FloatingBar'
import Trending from '../components/Trending'
import StatModal from '../components/StatModal'
import { getData } from '../api/server'

const MainWrapper = styled.main``

const UtilityBar = styled.div`
    display: flex;
    column-gap: ${(props) =>
        props.$isOpen || props.$isScrolledDown || props.$floatingBarOpen
            ? null
            : `10px`};
    height: ${(props) => (props.$isOpen ? null : `6vw`)};
    min-height: ${(props) => (props.$isOpen ? null : `44px`)};
    max-height: ${(props) => (props.$isOpen ? null : `57px`)};
`

export default function Main() {
    const { data } = useQuery({
        queryKey: ['trending-movie-day'],
        queryFn: () => getData(`/trending/movie/day`),
    })
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

    return (
        data && (
            <MainWrapper>
                <div>
                    <Carousel data={data} />
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
                <Trending trendingData={data} />
                {/* <RecommendedVideo videoData={data.allTrendingVideo} /> */}
            </MainWrapper>
        )
    )
}
