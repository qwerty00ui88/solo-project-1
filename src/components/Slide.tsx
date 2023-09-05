import React from 'react'
import styled from 'styled-components'
// import { largeSize, smallSize } from '../style/font'
// import { ReactComponent as Star } from '../assets/star.svg'
import { Data } from './Carousel'

interface SlideWrapperProps {
    ref: React.ForwardedRef<HTMLDivElement>
}

const SlideWrapper = styled.div<SlideWrapperProps>`
    flex: 0 0 calc(100% + 30vw);
    width: calc(100% + 30vw);
    display: flex;
    &::after {
        content: '';
        display: block;
        width: 30vw;
        flex: 0 0 30vw;
    }
`

const CardContainer = styled.div`
    flex: 0 0 calc(100% - 30vw);
    width: calc(100% - 30vw);
    display: flex;
    justify-content: space-between;
`

const Card = styled.div`
    width: 18%;
    display: flex;
    flex-direction: column;
    color: #e5e5e5;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(0.95);
    }
`

const Img = styled.img`
    flex: 1 0; // 세로
    border-radius: 30px;
`

interface SlideProps {
    data: Data[]
    slideRef: React.ForwardedRef<HTMLDivElement>
}

function Slide({ data, slideRef }: SlideProps) {
    return (
        <SlideWrapper ref={slideRef}>
            <CardContainer>
                {data.map((el) => {
                    return (
                        <Card key={el.id}>
                            <Img
                                alt=""
                                src={`https://image.tmdb.org/t/p/w500${el?.poster_path}`}
                            />
                        </Card>
                    )
                })}
            </CardContainer>
        </SlideWrapper>
    )
}
export default Slide
