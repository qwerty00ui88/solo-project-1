import React from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import { xlargeSize } from '../../style/font'
import { smallRadius } from '../../style/border'
import { ReactComponent as Star } from '../../assets/star.svg'
import Poster from '../commons/Poster'

const ChartWrapper = styled.div`
    display: flex;
    align-items: center;
    background: ${(props) =>
        `no-repeat center url(https://image.tmdb.org/t/p/w780${props.$backdrop})`};
    background-color: rgba(0, 0, 0, 0.83);
    background-blend-mode: overlay;
    border-radius: ${smallRadius};
    & > svg {
        margin-right: 5px;
    }
`

const Rank = styled.div`
    width: 40px;
    text-align: center;
    font-size: ${xlargeSize};
`

const Title = styled(Link)`
    flex: 1;
    margin-left: 1rem;
`

const VoteAverage = styled.div`
    display: flex;
    width: 60px;
`

export default function RankItem({ category, data, rank }) {
    const { title, backdropPath, voteAverage } = data

    return (
        <ChartWrapper $backdrop={backdropPath}>
            <Rank>{rank}</Rank>
            <Poster data={data} width="60px" />
            <Title to={`/detail/${category}/${data.tmdbId}`}>{title}</Title>
            <VoteAverage>
                <Star />
                <div>{voteAverage.toFixed(1)}</div>
            </VoteAverage>
        </ChartWrapper>
    )
}
