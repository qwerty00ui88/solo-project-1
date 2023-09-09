import React, { useState } from 'react'
import useGet from '../utils/useGet'
import MainPageTemplate from '../components/templates/MainPageTemplate'

function Main() {
    const data = useGet(
        'results',
        'https://api.themoviedb.org/3/trending/all/day',
        {
            language: 'ko-KR',
        }
    )

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
        <MainPageTemplate
            data={data}
            handleOnClick={handleOnClick}
            isOpen={isOpen}
            isScrolledDown={isScrolledDown}
            handleSetIsOpen={handleSetIsOpen}
        />
    )
}

export default Main
