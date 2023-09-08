import React from 'react'
import styled from 'styled-components'

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
    column-gap: 20px;
    justify-content: space-between;
    width: calc(100% - 30vw);
    display: flex;
`

const Card = styled.div`
    flex: 1;
    width: 18%;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(0.95);
    }
`

const Img = styled.img`
    flex: 1 0; // 세로
    border-radius: 1.8rem;
`

export interface Data {
    adult: boolean
    backdrop_path: string
    id: number
    title?: string
    original_language: string
    original_title: string
    overview: string
    poster_path: string
    media_type: string
    genre_ids: number[]
    popularity: number
    release_date?: string
    video: boolean
    vote_average: number
    vote_count: number
    name?: string
    first_air_date?: string
    profile_path?: string
}

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
