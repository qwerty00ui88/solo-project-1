import React from 'react'
import styled from 'styled-components'
import { largeSize } from '../style/font'
import { ReactComponent as Star } from '../assets/star.svg'
import { Data } from './Carousel'

interface CarouselCardsWrapperProps {
    ref: React.ForwardedRef<HTMLDivElement>
}

const CarouselCardsWrapper = styled.div<CarouselCardsWrapperProps>`
    display: flex;
    justify-content: space-between;
    flex: 1 0 calc(100% + 30vw);
    &::after {
        content: '';
        display: block;
        flex: 1 0 30vw;
        background-color: red;
    }
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 20%;
    padding: 35px;
    border: 1px solid;
    border-radius: 30px;
    background-color: black;
    color: white;
    transition: transform 0.3s ease;
    &:hover {
        transform: scale(0.95);
    }
`
const Text = styled.div`
    flex: 1;
    font-size: ${largeSize};
`

const Img = styled.img`
    width: 100%;
`

interface CarouselCardsProps {
    data: Data[]
    CarouselCardsRef: React.ForwardedRef<HTMLDivElement>
}

function CarouselCards({ data, CarouselCardsRef }: CarouselCardsProps) {
    return (
        <CarouselCardsWrapper ref={CarouselCardsRef}>
            {data.map((el) => {
                return (
                    <Card key={el.id}>
                        <Text>
                            <span>
                                <Star />
                                {el?.vote_average}
                            </span>
                            <h3>{el?.title}</h3>
                            <p>{el?.release_date}</p>
                        </Text>
                        <Img
                            alt=""
                            src={`https://image.tmdb.org/t/p/w500${el?.poster_path}`}
                        />
                    </Card>
                )
            })}
        </CarouselCardsWrapper>
    )
}
export default CarouselCards
