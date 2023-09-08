import React, { useState } from 'react'
import { styled } from 'styled-components'
import Carousel from './Carousel'
import SearchBar from './SearchBar'
import FloatingBar from './FloatingBar'
import Header from './Header'
import RecommendedVideo from './RecommendedVideo'
import Footer from './Footer'
import Trending from './Trending'

const MainTemplate = styled.main`
    margin: 0 10vw;
    &::after {
        content: '';
        display: block;
        height: 15vh;
    }
    @media screen and (max-width: 768px) {
        margin: 0 8vw;
    }
    @media screen and (max-width: 375px) {
        margin: 0 7vw;
    }
`

const HeaderTemplate = styled.header`
    height: 15vh;
`

const CarouselTemplate = styled.div``

interface UtilityBarTemplateProps {
    $isOpen: boolean
}

const UtilityBarTemplate = styled.div<UtilityBarTemplateProps>`
    display: flex;
    column-gap: 10px;
    height: ${(props) => (props.$isOpen ? null : `6vw`)};
    min-height: ${(props) => (props.$isOpen ? '36vh' : `44px`)};
    max-height: ${(props) => (props.$isOpen ? null : `57px`)};
    margin-bottom: 16px;
`

const SearchBarTemplate = styled.div`
    flex: 1 1 70%;
    z-index: 2;
`

const RecommendedVideoTemplate = styled.div``

export interface FloatingBarTemplateProps {
    $isScrolledDown: boolean
    $isOpen: boolean
}

const FloatingBarTemplate = styled.div<FloatingBarTemplateProps>`
    flex: 0 0 30%;
    width: ${(props) =>
        props.$isScrolledDown || props.$isOpen ? `4rem` : `6vw`};
    height: ${(props) =>
        props.$isScrolledDown || props.$isOpen ? `4rem` : null};
    position: ${(props) =>
        props.$isScrolledDown || props.$isOpen ? `fixed` : null};
    right: ${(props) =>
        props.$isScrolledDown || props.$isOpen ? `24px` : null};
    top: ${(props) => (props.$isScrolledDown || props.$isOpen ? `88vh` : null)};
    @media screen and (max-width: 768px) {
        display: none;
    }
`

const TrendingTemplate = styled.div`
    width: 100%;
    margin-bottom: 25px;
    height: 80vh;
`

const FooterTemplate = styled.footer`
    padding: 50px 10vw;
    @media screen and (max-width: 768px) {
        display: none;
    }
`

function Template() {
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
        <>
            <HeaderTemplate>
                <Header />
            </HeaderTemplate>
            <MainTemplate>
                <CarouselTemplate>
                    <Carousel />
                </CarouselTemplate>
                <UtilityBarTemplate $isOpen={isOpen}>
                    <SearchBarTemplate onClick={handleOnClick}>
                        <SearchBar
                            isOpen={isOpen}
                            handleSetIsOpen={handleSetIsOpen}
                        />
                    </SearchBarTemplate>
                    <FloatingBarTemplate
                        $isScrolledDown={isScrolledDown}
                        $isOpen={isOpen}
                    >
                        <FloatingBar
                            isScrolledDown={isScrolledDown}
                            isOpen={isOpen}
                        />
                    </FloatingBarTemplate>
                </UtilityBarTemplate>
                <TrendingTemplate>
                    <Trending />
                </TrendingTemplate>
                <RecommendedVideoTemplate>
                    <RecommendedVideo />
                </RecommendedVideoTemplate>
            </MainTemplate>
            <FooterTemplate>
                <Footer />
            </FooterTemplate>
        </>
    )
}

export default Template
