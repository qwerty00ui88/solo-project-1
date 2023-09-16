import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useGet, { TrendingContent } from '../utils/useGet'
import Carousel from '../components/Carousel'
import SearchBar from '../components/SearchBar'
import PageTemplate from '../components/templates/PageTemplate'
import FloatingBar from '../components/FloatingBar'
import Trending from '../components/Trending'
import RecommendedVideo from '../components/RecommendedVideo'

interface UtilityBarProps {
    $isOpen: boolean
}

const UtilityBar = styled.div<UtilityBarProps>`
    display: flex;
    column-gap: 10px;
    height: ${(props) => (props.$isOpen ? null : `6vw`)};
    min-height: ${(props) => (props.$isOpen ? null : `44px`)};
    max-height: ${(props) => (props.$isOpen ? null : `57px`)};
    margin-bottom: 16px;
`

function Main() {
    const { data } = useGet<TrendingContent>(
        'https://api.themoviedb.org/3/trending/all/day',
        { language: 'ko-KR' }
    )

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
            <PageTemplate>
                <Carousel data={data.results} />
                <UtilityBar $isOpen={isOpen}>
                    <SearchBar
                        isOpen={isOpen}
                        handleSetIsOpen={handleSetIsOpen}
                    />
                    <FloatingBar
                        isOpen={isOpen}
                        isScrolledDown={isScrolledDown}
                    />
                </UtilityBar>
                <Trending />
                <RecommendedVideo videoData={data.results} />
            </PageTemplate>
        )
    )
}

export default Main
