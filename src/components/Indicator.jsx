import React from 'react'
import { styled } from 'styled-components'
import { ReactComponent as Pre } from '../assets/pre.svg'
import { ReactComponent as Next } from '../assets/next.svg'
import { roundRadius } from '../style/border'

const IndicatorWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex: 0;
    margin: 30px 0;
`

const Pagenation = styled.div`
    width: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Bullet = styled.div`
    width: 8px;
    height: 8px;
    background-color: gray;
    border-radius: ${roundRadius};
`
function Indicator({ goToPre, goToNext }) {
    return (
        <IndicatorWrapper>
            <Pre onClick={goToPre} />
            <Pagenation>
                <Bullet />
                <Bullet />
                <Bullet />
            </Pagenation>
            <Next onClick={goToNext} />
        </IndicatorWrapper>
    )
}

export default Indicator
