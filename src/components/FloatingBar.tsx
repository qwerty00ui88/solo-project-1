import React from 'react'
import { styled } from 'styled-components'

const FloatingBarWrapper = styled.div`
    height: 100%;
    background-color: #5d4ffe;
    border-radius: 30px;
    overflow: hidden;
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
function FloatingBar() {
    return (
        <FloatingBarWrapper>
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
