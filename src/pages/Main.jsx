import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import Carousel from '../components/main/Carousel'
import SearchBar from '../components/main/SearchBar'
import Trending from '../components/main/Trending'
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

    const handleSetIsOpen = () => {
        setIsOpen(!isOpen)
    }

    const scrollToSearchBar = () => {
        window.scrollTo({
            top: window.innerHeight * 0.62,
            behavior: 'smooth',
        })
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
                    >
                        <SearchBar
                            isOpen={isOpen}
                            handleSetIsOpen={handleSetIsOpen}
                        />
                    </UtilityBar>
                </div>
                <Trending trendingData={data} />
            </MainWrapper>
        )
    )
}
