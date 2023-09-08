import React from 'react'
import RankItem from './RankItem'
import { Data } from './Slide'

interface RankProps {
    category: string
    rankingArr: Data[]
    start: number
}

function Rank({ category, rankingArr, start }: RankProps) {
    return (
        <div>
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
        </div>
    )
}

export default Rank
