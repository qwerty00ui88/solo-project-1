import React, { useState } from 'react'
import useGet, { TrendingContent } from '../utils/useGet'
import MainPageTemplate from '../components/templates/MainPageTemplate'

function Main() {
    const { data, loading, error } = useGet<TrendingContent>(
        'https://api.themoviedb.org/3/trending/all/day',
        { language: 'ko-KR' }
    )
    // eslint-disable-next-line no-console
    console.log({ data, loading, error })

    const [isScrolledDown, setIsScrollDown] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    window.addEventListener('scroll', () => {
        const { scrollY } = window
        setIsScrollDown(scrollY >= 12)
    })

    const scrollToSearchBar = () => {
        window.scrollTo({
            top: window.innerHeight * 0.62,
            behavior: 'smooth',
        })
    }

    const handleSetIsOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleOnClick = () => {
        if (!isOpen) {
            handleSetIsOpen()
        }
        scrollToSearchBar()
    }
    return (
        data && (
            <MainPageTemplate
                data={(data as TrendingContent).results}
                handleOnClick={handleOnClick}
                isOpen={isOpen}
                isScrolledDown={isScrolledDown}
                handleSetIsOpen={handleSetIsOpen}
            />
        )
    )
}

export default Main
