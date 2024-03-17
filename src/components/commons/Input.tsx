import React, { ChangeEvent } from 'react'
import { styled } from 'styled-components'
import { xsmallRadius } from '../../style/border'

interface InputWrapperProps {
    $width?: string
    $height?: string
}

interface InputProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: string
    value?: string | number
    width?: string
    height?: string
    id?: string
    name?: string
    label?: string
}

const InputSetWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    text-align: left;
`

const InputWrapper = styled.input<InputWrapperProps>`
    width: ${(props) => `${props.$width}`};
    height: ${(props) => `${props.$height}`};
    padding: 5px 10px;
    border: 1px solid #e5e5e5;
    border-radius: ${xsmallRadius};
`

function Input({
    onChange,
    type = 'text',
    value = '',
    width = undefined,
    height = undefined,
    id = undefined,
    name = undefined,
    label = undefined,
}: InputProps) {
    return (
        <InputSetWrapper>
            <Label htmlFor={id}>{label}</Label>
            <InputWrapper
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                $width={width}
                $height={height}
            />
        </InputSetWrapper>
    )
}

export default Input
