import React from 'react'
import styled from 'styled-components'
import { largeSize, semiboldWeight } from '../style/font'

const CreditsWrapper = styled.li`
    position: relative;
    height: 100px;
    padding: 20px 0;

    &::after {
        content: '●';
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
    }
    &::before {
        content: ' ';
        display: block;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 5px;
        height: 100%;
        background-color: #282828;
    }
`

const YearAndTitle = styled.div`
    width: fit-content;
    text-align: ${(props) => (props.$media === 'movie' ? 'right' : `left`)};
    position: absolute;
    left: ${(props) => (props.$media === 'movie' ? null : `53%`)};
    right: ${(props) => (props.$media === 'movie' ? '53%' : null)};
`

const Title = styled.div`
    font-size: ${largeSize};
    font-weight: ${semiboldWeight};
`

function Credits({ data }) {
    return (
        <CreditsWrapper key={data.id}>
            <YearAndTitle $media={data.media_type}>
                <Title>{data.title || data.name}</Title>
                <div>
                    {(data.release_date || data.first_air_date)
                        ?.slice(0, 7)
                        .replace('-', '.') || '-'}
                </div>
            </YearAndTitle>
        </CreditsWrapper>
    )
}

export default Credits
