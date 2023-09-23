import React from 'react'
import styled from 'styled-components'
import { Cast } from '../utils/useGet'

const CreditsWrapper = styled.li`
    background-color: gray;
    border: 1px solid red;
    position: relative;
    height: 50px;
    &::after {
        content: ' ';
        display: block;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 5px;
        height: 100%;
        background-color: yellow;
    }
`

function Credits({ data }: { data: Cast }) {
    return (
        <CreditsWrapper key={data.id}>
            <div>
                {(data.release_date || data.first_air_date)?.slice(0, 4) || '-'}
            </div>
            <div>{data.title || data.name}</div>
        </CreditsWrapper>
    )
}

export default Credits
