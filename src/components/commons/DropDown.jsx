import React from 'react'
import styled from 'styled-components'
import { mediumWeight } from '../../style/font'
import { xsmallRadius } from '../../style/border'

const SelectWrapper = styled.select`
    width: 7rem;
    padding: 3px 0 3px 3px;
    font-weight: ${mediumWeight};
    color: black;
    border-radius: ${xsmallRadius};
`

export default function DropDown({
    selectId,
    onChange,
    options,
    labelText = undefined,
}) {
    return (
        <>
            {labelText && <label htmlFor={selectId}>{labelText}</label>}

            <SelectWrapper id={selectId} onChange={onChange}>
                {options.map((option) => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    )
                })}
            </SelectWrapper>
        </>
    )
}
