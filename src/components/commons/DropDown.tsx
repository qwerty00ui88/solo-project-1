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

function DropDown({
    selectName,
    selectId,
    options,
    labelText = undefined,
}: {
    selectName: string
    selectId: string
    options: { name: string; value: string }[]
    labelText?: string | undefined
}) {
    return (
        <>
            {labelText && <label htmlFor={selectId}>{labelText}</label>}

            <SelectWrapper name={selectName} id={selectId}>
                {options.map((option) => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.value}
                        </option>
                    )
                })}
            </SelectWrapper>
        </>
    )
}

export default DropDown
