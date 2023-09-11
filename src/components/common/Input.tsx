import React, { ChangeEvent } from 'react'
import { styled } from 'styled-components'

interface InputWrapperProps {
    $width: number
    $height: number
}

const InputWrapper = styled.input<InputWrapperProps>`
    width: ${(props) => `${props.$width}px`};
    height: ${(props) => `${props.$height}px`};
    border: 1px solid white;
`
interface InputProps {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    width?: number
    height?: number
}

function Input({ value, onChange, width = 200, height = 50 }: InputProps) {
    return (
        <InputWrapper
            value={value}
            onChange={onChange}
            $width={width}
            $height={height}
        />
    )
}

export default Input
