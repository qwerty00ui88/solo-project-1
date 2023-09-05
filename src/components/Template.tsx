import React, { useState } from 'react'
import { styled } from 'styled-components'
import Carousel from './Carousel'
import SearchBar from './SearchBar'
import FloatingBar from './FloatingBar'
import Header from './Header'
import RecommendedVideo from './RecommendedVideo'
import Footer from './Footer'

const MainTemplate = styled.main`
    margin: 0 10vw;
    &::after {
        content: '';
        display: block;
        height: 15vh;
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
    height: ${(props) => (props.$isOpen ? `36vh` : `6vh`)};
    margin-bottom: 16px;
`

const SearchBarTemplate = styled.div`
    flex: 1 1 70%;
    height: 100%;
    z-index: 2;
`

const RecommendedVideoTemplate = styled.div`
    height: 50vh;
`

interface FloatingBarTemplateProps {
    $isScrolledDown: boolean
    $isOpen: boolean
}

const FloatingBarTemplate = styled.div<FloatingBarTemplateProps>`
    flex: 0 0 30%;
    width: 6vh;
    height: 6vh;
    z-index: 1;
    position: ${(props) =>
        props.$isScrolledDown || props.$isOpen ? `fixed` : `null`};
    right: ${(props) =>
        props.$isScrolledDown || props.$isOpen ? `24px` : `null`};
    top: ${(props) =>
        props.$isScrolledDown || props.$isOpen ? `88vh` : `null`};
`

const FooterTemplate = styled.footer`
    padding: 50px 10vw;
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
                        <FloatingBar />
                    </FloatingBarTemplate>
                </UtilityBarTemplate>
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
