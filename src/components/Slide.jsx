import React from 'react'
import styled from 'styled-components'
import { xlargeRadius } from '../style/border'
import Poster from './commons/Poster'

const SlideWrapper = styled.div`
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

const CardContainer = styled.ul`
    flex: 0 0 calc(100% - 30vw);
    column-gap: 20px;
    justify-content: space-between;
    width: calc(100% - 30vw);
    display: flex;
`

export const PosterLi = styled.li`
    flex: 1;
    width: 18%;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(0.95);
    }
`

export const Img = styled.img`
    flex: 1 0; // 세로
    border-radius: ${xlargeRadius};
`

export default function Slide({ data, slideRef }) {
    return (
        <SlideWrapper ref={slideRef}>
            <CardContainer>
                {data.map((el) => {
                    return (
                        <PosterLi key={el.mediaType + el.tmdbId}>
                            <Poster data={el} />
                        </PosterLi>
                    )
                })}
            </CardContainer>
        </SlideWrapper>
    )
}
