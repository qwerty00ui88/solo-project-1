import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import Carousel from '../components/main/Carousel'
import SearchBar from '../components/main/SearchBar'
import Trending from '../components/main/Trending'
import { getData } from '../api/server'
import useBoolean from '../hooks/useBoolean'

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
    const { boolean: isOpen, setTrue: open, setFalse: close } = useBoolean()
    const { boolean: isScrolledDown, set: setIsScrollDown } = useBoolean()

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
        if (isOpen) scrollToSearchBar()
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
                        <SearchBar isOpen={isOpen} open={open} close={close} />
                    </UtilityBar>
                </div>
                <Trending trendingData={data} />
            </MainWrapper>
        )
    )
}
