import React, { MouseEvent } from 'react'
import { styled } from 'styled-components'
import { xsmallRadius } from '../../style/border'
import { semiboldWeight } from '../../style/font'

interface ButtonWrapperProps {
    $width: string
    $height: string | null
}

const ButtonWrapper = styled.button<ButtonWrapperProps>`
    width: ${(props) => `${props.$width}`};
    height: ${(props) => `${props.$height}`};
    text-align: center;
    border-radius: ${xsmallRadius};
    background-color: rgb(229, 9, 20);
    font-weight: ${semiboldWeight};
`
interface ButtonProps {
    name: string
    onClick: (e?: MouseEvent<HTMLButtonElement>) => void
    width?: string
    height?: string | null
}

function Button({
    name,
    onClick,
    width = '4.5rem',
    height = null,
}: ButtonProps) {
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
