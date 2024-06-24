import React from 'react'
import { styled } from 'styled-components'
import { xsmallRadius } from '../../style/border'
import { semiboldWeight } from '../../style/font'

export const ButtonWrapper = styled.button`
    display: block;
    width: ${(props) => props.$width};
    height: ${(props) => props.$height};
    text-align: center;
    border-radius: ${xsmallRadius};
    background-color: rgb(229, 9, 20);
    font-weight: ${semiboldWeight};
    padding: 0.5rem;
    white-space: nowrap;
`

export default function Button({
    onClick,
    name = undefined,
    children = undefined,
    width = undefined,
    height = undefined,
}) {
    return (
        <ButtonWrapper
            type="button"
            onClick={onClick}
            $width={width}
            $height={height}
        >
            {name || children}
        </ButtonWrapper>
    )
}
