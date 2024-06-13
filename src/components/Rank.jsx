import React from 'react'
import { styled } from 'styled-components'
import RankItem from './RankItem'

const RankWrapper = styled.div`
    width: 100%;
`

export default function Rank({ category, rankingArr, start }) {
    return (
        rankingArr && (
            <RankWrapper>
                {rankingArr.map((d, idx) => {
                    return (
                        <RankItem
                            key={d.tmdbId}
                            category={category}
                            data={d}
                            rank={start + idx}
                        />
                    )
                })}
            </RankWrapper>
        )
    )
}
