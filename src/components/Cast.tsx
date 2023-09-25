import React from 'react'
import styled from 'styled-components'
import CastCard from './CastCard'
import { Credits } from '../utils/useGet'
import { xlargeSize } from '../style/font'

const CastList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
`

const Title = styled.h3`
    font-size: ${xlargeSize};
    margin-bottom: 10px;
`

function Cast({ credits }: { credits: Credits }) {
    return (
        <div>
            <Title>출연</Title>
            <CastList>
                {credits?.cast.slice(0, 12)?.map((el) => {
                    return <CastCard key={el.id} personData={el} />
                })}
            </CastList>
        </div>
    )
}

export default Cast
