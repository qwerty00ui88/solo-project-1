import React, { useState } from 'react'
import { styled } from 'styled-components'
import Carousel from './Carousel'
import SearchBar from './SearchBar'
import FloatingBar from './FloatingBar'
import Header from './Header'
import RecommendedVideo from './RecommendedVideo'

const Main = styled.main`
    margin: 0 24px;
    & > * {
        /* border: 1px solid; */
    }
`

const HeaderTemplate = styled.div`
    height: 15vh;
    border: 1px solid;
`

const CarouselTemplate = styled.div`
    height: 73vh;
`

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

function Template() {
    const [isScrolledDown, setIsScrollDown] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    window.addEventListener('scroll', () => {
        const { scrollY } = window
        setIsScrollDown(scrollY >= 12)
    })

    const scrollToSearchBar = () => {
        window.scrollTo({
            top: 660,
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
            <Main>
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
            </Main>
            <div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br /> <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br /> <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        </>
    )
}

export default Template
