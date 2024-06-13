import React from 'react'
import styled from 'styled-components'
import { xlargeSize } from '../style/font'

const BiographyWrapper = styled.div``

const SubTitle = styled.h3`
    font-size: ${xlargeSize};
`

export default function Biography({ data }) {
    return (
        <BiographyWrapper>
            <SubTitle>Biography</SubTitle>
            <div>{data}</div>
        </BiographyWrapper>
    )
}
