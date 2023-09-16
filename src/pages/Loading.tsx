import React from 'react'
import styled from 'styled-components'
import { fontLogo, logoSize } from '../style/font'

const SvgContainer = styled.svg`
    width: 100%;
    height: 99vh;
`

const TextElement = styled.text`
    text-anchor: middle;
    fill: none;
    stroke-width: 1;
    stroke-linejoin: round;
    stroke-dasharray: 80 320;
    stroke-dashoffset: 0;
    animation: stroke 4.8s infinite linear;
    font-size: ${logoSize};
    font-family: ${fontLogo};

    @keyframes stroke {
        100% {
            stroke-dashoffset: -400;
        }
    }

    &:nth-child(4n + 1) {
        stroke: #fcb045;
        animation-delay: -1.2s;
    }

    &:nth-child(4n + 2) {
        stroke: #fd1d1d;
        animation-delay: -2.4s;
    }

    &:nth-child(4n + 3) {
        stroke: #833ab4;
        animation-delay: -3.6s;
    }

    &:nth-child(4n + 4) {
        stroke: #e5e5e5;
        animation-delay: -4.8s;
    }
`

function Loading() {
    return (
        <SvgContainer viewBox="0 0 600 300">
            <TextElement textAnchor="middle" x="50%" y="50%" dy=".35em">
                C U T
            </TextElement>
            <TextElement x="50%" y="50%" dy=".35em">
                C U T
            </TextElement>
            <TextElement x="50%" y="50%" dy=".35em">
                C U T
            </TextElement>
            <TextElement x="50%" y="50%" dy=".35em">
                C U T
            </TextElement>
            <TextElement x="50%" y="50%" dy=".35em">
                C U T
            </TextElement>
        </SvgContainer>
    )
}

export default Loading
