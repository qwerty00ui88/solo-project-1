import React from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import { xsmallRadius } from '../../style/border'
import { semiboldWeight } from '../../style/font'

const LinkWrapper = styled(Link)`
    width: ${(props) => `${props.$width}`};
    height: ${(props) => `${props.$height}`};
    border-radius: ${xsmallRadius};
    background-color: rgb(229, 9, 20);
    font-weight: ${semiboldWeight};
    padding: 0.5rem;
    > * {
        height: 100%;
    }
`

function LinkTo({
    to,
    name = undefined,
    children = undefined,
    width = undefined,
    height = undefined,
}) {
    return (
        <LinkWrapper to={to} $width={width} $height={height}>
            {name || children}
        </LinkWrapper>
    )
}

export default LinkTo
