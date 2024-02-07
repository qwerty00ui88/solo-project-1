import React, { ChangeEvent } from 'react'
import { styled } from 'styled-components'
import { xsmallRadius } from '../../style/border'

interface InputWrapperProps {
    $width: string
    $height: string
}

const InputWrapper = styled.input<InputWrapperProps>`
    width: ${(props) => `${props.$width}`};
    height: ${(props) => `${props.$height}`};
    padding: 5px 10px;
    border: 1px solid #e5e5e5;
    border-radius: ${xsmallRadius};
`
interface InputProps {
    value: string | number | undefined
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    width?: string
    height?: string
    id?: string
}

function Input({
    value,
    onChange,
    width = 'calc(20rem - 20px)',
    height = 'calc(3rem - 10px)',
    id = '',
}: InputProps) {
    return (
        <InputWrapper
            id={id}
            value={value}
            onChange={onChange}
            $width={width}
            $height={height}
        />
    )
}

export default Input
