import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import Slide from './Slide'
import Indicator from './Indicator'

const Viewer = styled.div`
    flex: 1; // 세로
    overflow: hidden;
`

const Slides = `
    display: flex;
    transition: ${(props) => props.$animation && `transform 0.8s ease`};
    transform: ${(props) =>
        `translateX(-${props.$currentindex * props.$slidewidth}px)`};
    height: 100%;
`

const CarouselWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

export default function Carousel({ data }) {
    const [currentIndex, setCurrentIndex] = useState(1)
    const [slideWidth, setSlideWidth] = useState(0)
    const [animation, setAnimation] = useState(false)
    const slideRef = useRef(null)

    const updateSlideCount = () => {
        const screenWidth =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth

        if (screenWidth <= 375) return 1
        if (screenWidth <= 600) return 2
        if (screenWidth <= 768) return 3
        if (screenWidth <= 1024) return 4
        return 5
    }

    const count = updateSlideCount()

    const slideData = [
        { id: 0, data: data.slice(count * 2, count * 3) },
        { id: 1, data: data.slice(0, count) },
        { id: 2, data: data.slice(count, count * 2) },
        { id: 3, data: data.slice(count * 2, count * 3) },
        { id: 4, data: data.slice(0, count) },
    ]

    const goToPre = () => {
        if (currentIndex > 0) {
            setAnimation(true)
            setCurrentIndex((ci) => ci - 1)
        }
    }

    const goToNext = () => {
        if (currentIndex < slideData.length - 1) {
            setAnimation(true)
            setCurrentIndex((ci) => ci + 1)
        }
    }

    const getSlideWidth = () => {
        setAnimation(false)
        setSlideWidth(slideRef.current ? slideRef.current.clientWidth : 0)
    }

    const changeIndex = (index) => {
        const slides = slideRef.current?.parentElement
        const handleTransitionEnd = () => {
            setAnimation(false)
            setCurrentIndex(() => index)
            slides.removeEventListener('transitionend', handleTransitionEnd)
        }
        slides.addEventListener('transitionend', handleTransitionEnd)
    }

    useEffect(() => {
        getSlideWidth()
        window.addEventListener('resize', updateSlideCount)
        window.addEventListener('resize', getSlideWidth)
        return () => {
            window.addEventListener('resize', updateSlideCount)
            window.removeEventListener('resize', getSlideWidth)
        }
    }, [])

    useEffect(() => {
        if (currentIndex === 0) changeIndex(slideData.length - 2)
        else if (currentIndex === 4) changeIndex(1)
    }, [currentIndex])

    return (
        <CarouselWrapper>
            <Viewer>
                <Slides
                    $currentindex={currentIndex}
                    $slidewidth={slideWidth}
                    $animation={animation}
                >
                    {slideData.map((el) => {
                        return (
                            <Slide
                                key={el.id}
                                data={el.data}
                                slideRef={slideRef}
                            />
                        )
                    })}
                </Slides>
            </Viewer>
            <Indicator goToPre={goToPre} goToNext={goToNext} />
        </CarouselWrapper>
    )
}
