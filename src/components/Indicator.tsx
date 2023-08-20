import React from 'react'
import { styled } from 'styled-components'
import { ReactComponent as Pre } from '../assets/pre.svg'
import { ReactComponent as Next } from '../assets/next.svg'

const IndicatorWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const Pagenation = styled.div`
    width: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Bullet = styled.div`
    width: 10px;
    height: 10px;
    background-color: gray;
    border-radius: 100%;
`

function Indicator() {
    return (
        <IndicatorWrapper>
            <Pre />
            <Pagenation>
                <Bullet />
                <Bullet />
                <Bullet />
            </Pagenation>
            <Next />
        </IndicatorWrapper>
    )
}

export default Indicator
