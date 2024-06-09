import React from 'react'
import { styled } from 'styled-components'
import RankItem from './RankItem'
import { RankItemType } from '../types/common'

const RankWrapper = styled.div`
    width: 100%;
`

interface RankProps {
    category: string
    rankingArr: RankItemType[]
    start: number
}

function Rank({ category, rankingArr, start }: RankProps) {
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

export default Rank
