import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Movie } from '../assets/movie.svg'
import { ReactComponent as TV } from '../assets/tv.svg'
import { xlargeRadius } from '../style/border'

const NumberOfWorksWrapper = styled.div`
    display: flex;
    position: sticky;
    top: 2rem;
    z-index: 1;
    background: linear-gradient(to right, #fcb045b0, #fd1d1db0, #833ab4b0);
    padding: 20px 0;
    border-radius: ${xlargeRadius};
    & > * {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

const Count = styled.div`
    font-size: 3rem;
`

function NumberOfWorks({ data }) {
    return (
        <NumberOfWorksWrapper>
            <div>
                <Movie />
                <Count>{data.movie}</Count>
            </div>
            <div>
                <TV />
                <Count>{data.tv}</Count>
            </div>
        </NumberOfWorksWrapper>
    )
}

export default NumberOfWorks
