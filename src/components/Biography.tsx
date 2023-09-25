import React from 'react'
import styled from 'styled-components'
import { xlargeSize } from '../style/font'

const BiographyWrapper = styled.div``

const SubTitle = styled.h3`
    font-size: ${xlargeSize};
    margin-bottom: 10px;
`

function Biography({ data }: { data: string }) {
    return (
        <BiographyWrapper>
            <SubTitle>Biography</SubTitle>
            <div>{data}</div>
        </BiographyWrapper>
    )
}

export default Biography
