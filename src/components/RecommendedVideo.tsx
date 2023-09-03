import React from 'react'
import { styled } from 'styled-components'
import { xlargeSize, mediumWeight } from '../style/font'

const RecommendedVideoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 30px;
    padding: 80px 100px;
    background-color: white;
    overflow: hidden;
`

const Title = styled.h2`
    font-size: ${xlargeSize};
    font-weight: ${mediumWeight};
    margin-bottom: 10px;
`

const Detail = styled.p`
    margin-bottom: 36px;
`

const VideoListContainer = styled.div`
    display: flex;

    & > .original {
        animation: rollingleft1 33s linear infinite;
        background-color: yellow;
    }

    & > .clone {
        animation: rollingleft2 33s linear infinite;
    }

    @keyframes rollingleft1 {
        0% {
            transform: translateX(0);
        }
        50% {
            transform: translateX(-100%);
        }
        50.01% {
            transform: translateX(100%);
        }
        100% {
            transform: translateX(0);
        }
    }

    @keyframes rollingleft2 {
        0% {
            transition: translateX(0);
        }
        100% {
            transform: translateX(-200%);
        }
    }
`

const VideoList = styled.ul`
    display: flex;
    & > li {
        width: 300px;
        display: inline;
        border: 1px solid red;
        margin-right: 1.6rem;
        height: 100%;
    }
`

function RecommendedVideo() {
    const autoRolling = () => {
        const roller = document.querySelector('.rolling-list') as HTMLElement
        roller.id = 'roller1'

        const clone = roller.cloneNode(true) as HTMLElement
        clone.id = 'roller2'

        const wrap = document.querySelector('.container') as HTMLElement
        wrap.appendChild(clone)

        const roller1 = document.querySelector('#roller1') as HTMLElement
        const roller2 = document.querySelector('#roller2') as HTMLElement
        roller1.style.left = '0px'
        roller2.style.left = `${roller.offsetWidth}px`

        roller.classList.add('original')
        clone.classList.add('clone')
    }

    window.onload = autoRolling

    return (
        <RecommendedVideoWrapper>
            <Title>추천 영상</Title>
            <Detail>추천 영상을 봐라</Detail>
            <VideoListContainer className="container">
                <VideoList className="rolling-list">
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>7</li>
                </VideoList>
            </VideoListContainer>
        </RecommendedVideoWrapper>
    )
}
export default RecommendedVideo
