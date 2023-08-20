import React from 'react'
import styled from 'styled-components'
import { largeSize } from '../style/font'
import { Info } from './Carousel'
import { ReactComponent as Star } from '../assets/star.svg'

const CardContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex: 1 0 100%;
`

const Card = styled.div`
    flex-basis: 24.5%;
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
    font-size: ${largeSize};
`

const Img = styled.img`
    width: 100%;
`

interface Props {
    info: Info[]
}

function CarouselCards({ info }: Props) {
    return (
        <CardContainer>
            {info.map((el) => {
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
        </CardContainer>
    )
}
export default CarouselCards
