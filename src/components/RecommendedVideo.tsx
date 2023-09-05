import React from 'react'
import { styled } from 'styled-components'
import { xlargeSize, mediumWeight } from '../style/font'

const RecommendedVideoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 30px;
    padding: 80px 100px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.534);
    box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 0.36);
`

const Title = styled.h2`
    font-size: ${xlargeSize};
    font-weight: ${mediumWeight};
    margin-bottom: 10px;
    color: #e5e5e5;
`

const Detail = styled.p`
    margin-bottom: 36px;
    color: #e5e5e5;
`

const VideoList = styled.ul`
    display: flex;
    position: relative;
    left: -100px;
    width: calc(250px * 14);
    height: 100%;
    animation: autoPlay 20s linear infinite;
    color: #e5e5e5;
    @keyframes autoPlay {
        0% {
            transition: translateX(0);
        }
        100% {
            transform: translateX(calc(-250px * 7));
        }
    }

    & > li {
        width: 250px;
        border: 1px solid red;
        padding: 0 1.6rem;
        font-size: ${xlargeSize};
    }
`

function RecommendedVideo() {
    const listEl = [1, 2, 3, 4, 5, 6, 7]
    return (
        <RecommendedVideoWrapper>
            <Title>추천 영상</Title>
            <Detail>관심 있는 영상을 시청해 보세요.</Detail>
            <VideoList>
                {listEl.concat(listEl).map((el) => {
                    return <li key={Math.random()}>{el}</li>
                })}
            </VideoList>
        </RecommendedVideoWrapper>
    )
}

export default RecommendedVideo
