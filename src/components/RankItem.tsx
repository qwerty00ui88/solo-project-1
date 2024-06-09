import React from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import { xlargeSize } from '../style/font'
import { smallRadius } from '../style/border'
import { RankItemType } from '../types/common'

const ChartWrapper = styled.div<{ $backdrop: string | null }>`
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

export const Poster = styled.img`
    width: 60px;
    aspect-ratio: 2/3;
    margin-right: 20px;
`

const Title = styled(Link)`
    flex: 1;
`

interface RankItemProps {
    category: string
    data: RankItemType
    rank: number
}

function RankItem({ category, data, rank }: RankItemProps) {
    const { itemImagePath, backgroundImagePath } = data
    const title = data.item

    return (
        <ChartWrapper $backdrop={backgroundImagePath}>
            <Rank>{rank}</Rank>
            <Poster
                src={`https://image.tmdb.org/t/p/w92${itemImagePath}`}
                alt=""
            />
            <Title to={`/detail/${category}/${data.tmdbId}`}>{title}</Title>
        </ChartWrapper>
    )
}

export default RankItem
