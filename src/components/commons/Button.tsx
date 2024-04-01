import React, { MouseEvent, ReactElement } from 'react'
import { styled } from 'styled-components'
import { xsmallRadius } from '../../style/border'
import { semiboldWeight } from '../../style/font'

export interface ButtonWrapperProps {
    $width?: string
    $height?: string
}

export const ButtonWrapper = styled.button<ButtonWrapperProps>`
    display: block;
    width: ${(props) => `${props.$width}`};
    height: ${(props) => `${props.$height}`};
    text-align: center;
    border-radius: ${xsmallRadius};
    background-color: rgb(229, 9, 20);
    font-weight: ${semiboldWeight};
    padding: 0.5rem;
    white-space: nowrap;
`
interface ButtonProps {
    onClick: (e?: MouseEvent<HTMLButtonElement>) => void
    name?: string
    children?: ReactElement
    width?: string
    height?: string
}

function Button({
    onClick,
    name = undefined,
    children = undefined,
    width = undefined,
    height = undefined,
}: ButtonProps) {
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

export default Button
