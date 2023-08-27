import React, { useState } from 'react'
import { styled } from 'styled-components'
import Carousel from './Carousel'
import SearchBar from './SearchBar'
import FloatingBar from './FloatingBar'
import Header from './Header'

const Main = styled.main`
    margin: 0 24px;
    & > * {
        border: 1px solid;
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
    // $isScrolledDown: boolean
    $isClicked: boolean
}

const UtilityBarTemplate = styled.div<UtilityBarTemplateProps>`
    display: flex;
    height: ${(props) => (props.$isClicked ? `36vh` : `6vh`)};
`

const SearchBarTemplate = styled.div`
    flex: 1 1 70%;
    height: 100%;
    z-index: 1;
`

interface FloatingBarTemplateProps {
    $isScrolledDown: boolean
    $isClicked: boolean
}

const FloatingBarTemplate = styled.div<FloatingBarTemplateProps>`
    flex: 0 0 30%;
    width: 6vh;
    height: 6vh;
    position: ${(props) =>
        props.$isScrolledDown || props.$isClicked ? `fixed` : `null`};
    right: ${(props) =>
        props.$isScrolledDown || props.$isClicked ? `24px` : `null`};
    top: ${(props) =>
        props.$isScrolledDown || props.$isClicked ? `88vh` : `null`};
`

function Template() {
    const [isScrolledDown, setIsScrollDown] = useState(false)
    const [isClicked, setIsClicked] = useState(false)

    window.addEventListener('scroll', () => {
        const { scrollY } = window
        setIsScrollDown(scrollY >= 12)
    })

    const handleOnClick = () => {
        setIsClicked(true)
        window.scrollTo({
            top: 660,
            behavior: 'smooth',
        })
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
                <UtilityBarTemplate $isClicked={isClicked}>
                    <SearchBarTemplate onClick={handleOnClick}>
                        <SearchBar />
                    </SearchBarTemplate>
                    <FloatingBarTemplate
                        $isScrolledDown={isScrolledDown}
                        $isClicked={isClicked}
                    >
                        <FloatingBar />
                    </FloatingBarTemplate>
                </UtilityBarTemplate>
            </Main>
            <div>
                fdfsfsad
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
