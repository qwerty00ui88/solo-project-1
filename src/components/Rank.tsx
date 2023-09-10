import React from 'react'
import { styled } from 'styled-components'
import RankItem from './RankItem'
import { ContentType, PeopleType } from '../utils/useGet'
import { Category } from './Trending'

const RankWrapper = styled.div`
    width: 100%;
`

interface RankProps {
    category: Category
    rankingArr: PeopleType[] | ContentType[]
    start: number
}

function Rank({ category, rankingArr, start }: RankProps) {
    return (
        rankingArr && (
            <RankWrapper>
                {rankingArr.map((d, idx) => {
                    return (
                        <RankItem
                            key={d.id}
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
