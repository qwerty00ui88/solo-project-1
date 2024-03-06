import React, { MouseEvent } from 'react'
import { styled } from 'styled-components'
import { xsmallRadius } from '../../style/border'
import { semiboldWeight } from '../../style/font'

export interface ButtonWrapperProps {
    $width: string | null
    $height: string | null
}

export const ButtonWrapper = styled.button<ButtonWrapperProps>`
    width: ${(props) => `${props.$width}`};
    height: ${(props) => `${props.$height}`};
    text-align: center;
    border-radius: ${xsmallRadius};
    background-color: rgb(229, 9, 20);
    font-weight: ${semiboldWeight};
    padding: 0.5rem;
`
interface ButtonProps {
    name: string
    onClick: (e?: MouseEvent<HTMLButtonElement>) => void
    width?: string | null
    height?: string | null
}

function Button({ name, onClick, width = null, height = null }: ButtonProps) {
    return (
        <ButtonWrapper
            type="button"
            onClick={onClick}
            $width={width}
            $height={height}
        >
            {name}
        </ButtonWrapper>
    )
}

export default Button
