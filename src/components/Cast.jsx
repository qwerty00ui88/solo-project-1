import React from 'react'
import styled from 'styled-components'
import CastCard from './CastCard'
import { xlargeSize } from '../style/font'

const CastList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
`

const Title = styled.h3`
    font-size: ${xlargeSize};
`

export default function Cast({ credits }) {
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
