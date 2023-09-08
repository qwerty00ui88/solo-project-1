import React from 'react'
import { styled } from 'styled-components'
import { Data } from './Slide'
import { ReactComponent as Star } from '../assets/star.svg'
import { ReactComponent as Heart } from '../assets/heart.svg'
import { xlargeSize } from '../style/font'

interface ChartWrapperProps {
    $backdrop: string
}

const ChartWrapper = styled.div<ChartWrapperProps>`
    display: flex;
    align-items: center;
    background: ${(props) =>
        `no-repeat center url(https://image.tmdb.org/t/p/w780${props.$backdrop})`};
    background-color: rgba(0, 0, 0, 0.83);
    background-blend-mode: overlay;
    border-radius: 0.7rem;
    & > svg {
        margin-right: 5px;
    }
`

const Rank = styled.div`
    width: 40px;
    text-align: center;
    font-size: ${xlargeSize};
    background-color: black;
`

const Poster = styled.img`
    width: 60px;
    aspect-ratio: 2/3;
    margin-right: 20px;
`

const Title = styled.div`
    flex: 1;
`

const VoteAvg = styled.div`
    margin-right: 20px;
`

interface ChartProps {
    category: string
    data: Data
    rank: number
}

function RankItem({ category, data, rank }: ChartProps) {
    return (
        <ChartWrapper $backdrop={data.backdrop_path}>
            <Rank>{rank}</Rank>
            <Poster
                src={`https://image.tmdb.org/t/p/w92${
                    data.poster_path || data.profile_path
                }`}
                alt=""
            />
            <Title>{data.title || data.name}</Title>
            {category === 'person' ? <Heart /> : <Star />}
            <VoteAvg>
                {(data.vote_average || data.popularity).toFixed(1)}
            </VoteAvg>
        </ChartWrapper>
    )
}

export default RankItem
