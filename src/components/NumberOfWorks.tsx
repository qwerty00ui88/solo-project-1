import React from 'react'
import styled from 'styled-components'

const NumberOfWorksWrapper = styled.div``

function NumberOfWorks({ data }: { data: { movie: number; tv: number } }) {
    return (
        <NumberOfWorksWrapper>
            <div>{data.movie}</div>
            <div>{data.tv}</div>
        </NumberOfWorksWrapper>
    )
}

export default NumberOfWorks
