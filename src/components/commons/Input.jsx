import React from 'react'
import { styled } from 'styled-components'
import { xsmallRadius } from '../../style/border'

const InputSetWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    text-align: left;
`

const InputWrapper = styled.input`
    width: ${(props) => `${props.$width}`};
    height: ${(props) => `${props.$height}`};
    padding: 5px 10px;
    border: 1px solid #e5e5e5;
    border-radius: ${xsmallRadius};
`

export default function Input({
    onChange,
    type = 'text',
    value = '',
    width = undefined,
    height = undefined,
    id = undefined,
    name = undefined,
    label = undefined,
    placeholder = undefined,
}) {
    return (
        <InputSetWrapper>
            <Label htmlFor={id}>{label}</Label>
            <InputWrapper
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                $width={width}
                $height={height}
            />
        </InputSetWrapper>
    )
}
