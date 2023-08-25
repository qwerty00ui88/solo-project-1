import React from 'react'
import { styled } from 'styled-components'
import { ReactComponent as Pre } from '../assets/pre.svg'
import { ReactComponent as Next } from '../assets/next.svg'

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
    width: 10px;
    height: 10px;
    background-color: gray;
    border-radius: 100%;
`
interface Props {
    goToPre: () => void
    goToNext: () => void
}
function Indicator({ goToPre, goToNext }: Props) {
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
