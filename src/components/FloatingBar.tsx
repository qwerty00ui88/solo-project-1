import React from 'react'
import { styled } from 'styled-components'

import { xlargeRadius, roundRadius } from '../style/border'

interface FloatingBarTemplateProps {
    $isScrolledDown: boolean
    $isOpen: boolean
}

const FloatingBarWrapper = styled.div<FloatingBarTemplateProps>`
    height: 100%;
    background-color: #5d4ffe;
    border-radius: ${(props) =>
        props.$isScrolledDown || props.$isOpen
            ? `${roundRadius}`
            : `${xlargeRadius}`};
    overflow: hidden;

    flex: 0 0 30%;
    width: ${(props) =>
        props.$isScrolledDown || props.$isOpen ? `4rem` : `6vw`};
    height: ${(props) =>
        props.$isScrolledDown || props.$isOpen ? `4rem` : null};
    position: ${(props) =>
        props.$isScrolledDown || props.$isOpen ? `fixed` : null};
    right: ${(props) =>
        props.$isScrolledDown || props.$isOpen ? `24px` : null};
    top: ${(props) => (props.$isScrolledDown || props.$isOpen ? `88vh` : null)};
    @media screen and (max-width: 768px) {
        display: none;
    }
`

const Text = styled.ul`
    display: flex;
    height: 100%;
    align-items: center;
    animation: TextAutoPlay 10s linear infinite;
    width: fit-content;

    @keyframes TextAutoPlay {
        0% {
            transition: translateX(0);
        }
        100% {
            transform: translateX(calc(-100% / 2));
        }
    }

    & > li {
        white-space: nowrap;
    }
`
interface FloatingBarProps {
    isOpen: boolean
    isScrolledDown: boolean
}

function FloatingBar({ isOpen, isScrolledDown }: FloatingBarProps) {
    return (
        <FloatingBarWrapper $isScrolledDown={isScrolledDown} $isOpen={isOpen}>
            <Text>
                <li>
                    👉포트폴리오라는거시다~~~!!!👉포트폴리오라는거시다~~~!!!👉포트폴리오라는거시다~~~!!!👉포트폴리오라는거시다~~~!!!
                </li>
                <li>
                    👉포트폴리오라는거시다~~~!!!👉포트폴리오라는거시다~~~!!!👉포트폴리오라는거시다~~~!!!👉포트폴리오라는거시다~~~!!!
                </li>
            </Text>
        </FloatingBarWrapper>
    )
}
export default FloatingBar
