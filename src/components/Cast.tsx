import React from 'react'
import styled from 'styled-components'
import PersonCard from './PersonCard'
import { Credits } from '../utils/useGet'
import { largeSize } from '../style/font'

const CastList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
`

const Title = styled.h4`
    font-size: ${largeSize};
    margin-bottom: 10px;
`

function Cast({ credits }: { credits: Credits }) {
    return (
        <div>
            <Title>출연</Title>
            <CastList>
                {credits.cast.slice(0, 12).map((el) => {
                    return <PersonCard key={el.id} personData={el} />
                })}
            </CastList>
        </div>
    )
}

export default Cast
