import React from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import { xsmallRadius } from '../../style/border'
import { semiboldWeight } from '../../style/font'

interface LinkWrapperProps {
    $width?: string
    $height?: string | null
}

const LinkWrapper = styled(Link)<LinkWrapperProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props) => `${props.$width}`};
    height: ${(props) => `${props.$height}`};
    text-align: center;
    border-radius: ${xsmallRadius};
    background-color: rgb(229, 9, 20);
    font-weight: ${semiboldWeight};
`

interface LinkToProps {
    name: string
    to: string
    width?: string
    height?: string | null
}

function LinkTo({ name, to, width = '4.5rem', height = null }: LinkToProps) {
    return (
        <LinkWrapper to={to} $width={width} $height={height}>
            {name}
        </LinkWrapper>
    )
}

export default LinkTo
