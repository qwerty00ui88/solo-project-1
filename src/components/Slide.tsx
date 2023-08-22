import React from 'react'
import styled from 'styled-components'
import { largeSize, smallSize } from '../style/font'
import { ReactComponent as Star } from '../assets/star.svg'
import { Data } from './Carousel'

interface SlideWrapperProps {
    ref: React.ForwardedRef<HTMLDivElement>
}

const SlideWrapper = styled.div<SlideWrapperProps>`
    flex: 0 0 calc(100% + 30vw);
    width: calc(100% + 30vw);
    display: flex;
    justify-content: space-between;
    &::after {
        content: '';
        display: block;
        flex: 1 0 30vw;
    }
`

const Card = styled.div`
    flex: 0 0 calc((100% - 30vw) / 6);
    width: calc((100% - 30vw) / 6);
    display: flex;
    flex-direction: column;
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
    flex: 1 1; // 세로
    font-size: ${largeSize};
    & > h3 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    & > p {
        font-size: ${smallSize};
    }
`

const Img = styled.img`
    flex: 0 0; // 세로
`

interface SlideProps {
    data: Data[]
    slideRef: React.ForwardedRef<HTMLDivElement>
}

function Slide({ data, slideRef }: SlideProps) {
    return (
        <SlideWrapper ref={slideRef}>
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
        </SlideWrapper>
    )
}
export default Slide
