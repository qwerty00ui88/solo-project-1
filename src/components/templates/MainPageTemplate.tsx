import React from 'react'
import { styled } from 'styled-components'
import PageTemplate from './PageTemplate'
import Carousel from '../Carousel'
import SearchBar from '../SearchBar'
import FloatingBar from '../FloatingBar'
import RecommendedVideo from '../RecommendedVideo'
import Trending from '../Trending'
import { ContentType } from '../../utils/useGet'

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
`

interface TemplateProps {
    data: ContentType[]
    isOpen: boolean
    isScrolledDown: boolean
    handleOnClick: () => void
    handleSetIsOpen: () => void
}

function MainPageTemplate({
    data,
    isOpen,
    isScrolledDown,
    handleOnClick,
    handleSetIsOpen,
}: TemplateProps) {
    return (
        <PageTemplate>
            <>
                <CarouselTemplate>
                    <Carousel data={data} />
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
                    <RecommendedVideo videoData={data} />
                </RecommendedVideoTemplate>
            </>
        </PageTemplate>
    )
}

export default MainPageTemplate
