import React, { ReactElement } from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import { xsmallRadius } from '../../style/border'
import { semiboldWeight } from '../../style/font'

interface LinkWrapperProps {
    $width?: string | null
    $height?: string | null
}

const LinkWrapper = styled(Link)<LinkWrapperProps>`
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

interface LinkToProps {
    to: string
    name?: string
    children?: ReactElement
    width?: string
    height?: string
}

function LinkTo({
    to,
    name = undefined,
    children = undefined,
    width = undefined,
    height = undefined,
}: LinkToProps) {
    return (
        <LinkWrapper to={to} $width={width} $height={height}>
            {name || children}
        </LinkWrapper>
    )
}

export default LinkTo
