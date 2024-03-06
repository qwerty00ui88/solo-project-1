import React, { ChangeEvent } from 'react'
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

function DropDown({
    selectId,
    onChange,
    options,
    labelText = undefined,
}: {
    selectId: string
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void
    options: { value: string; name: string }[]
    labelText?: string | undefined
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

export default DropDown
