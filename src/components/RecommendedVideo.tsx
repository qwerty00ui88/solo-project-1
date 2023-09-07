import React from 'react'
import { styled } from 'styled-components'
import { titleWeb, mediumWeight, titleTablet, titleMobile } from '../style/font'

const RecommendedVideoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 30px;
    padding: 4.8vw 6vw;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.534);
    box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 0.36);
`

const Title = styled.h2`
    font-size: ${titleWeb};
    font-weight: ${mediumWeight};
    margin-bottom: max(1vw, 8px);
    @media screen and (max-width: 768px) {
        font-size: ${titleTablet};
    }
    @media screen and (max-width: 375px) {
        font-size: ${titleMobile};
    }
`

const Detail = styled.p`
    margin-bottom: max(3vw, 32px);
`

const VideoList = styled.ul`
    display: flex;
    position: relative;
    left: -9vw;
    width: calc((300px + 3rem) * 14);
    animation: autoPlay 20s linear infinite;

    @keyframes autoPlay {
        0% {
            transition: translateX(0);
        }
        100% {
            transform: translateX(calc((-300px + 3rem) * 7));
        }
    }

    & > li {
        width: calc(300px + 3rem);
        padding: 0 1.5rem;
        font-size: ${titleWeb};
    }
`

function RecommendedVideo() {
    const listEl = [
        <img
            src="https://img.youtube.com/vi/QkTnsXUedsw/hqdefault.jpg"
            alt="fds"
            width={300}
        />,
        <img
            src="https://img.youtube.com/vi/QkTnsXUedsw/hqdefault.jpg"
            alt="fds"
            width={300}
        />,
        <img
            src="https://img.youtube.com/vi/QkTnsXUedsw/hqdefault.jpg"
            alt="fds"
            width={300}
        />,
        <img
            src="https://img.youtube.com/vi/QkTnsXUedsw/hqdefault.jpg"
            alt="fds"
            width={300}
        />,
        <img
            src="https://img.youtube.com/vi/QkTnsXUedsw/hqdefault.jpg"
            alt="fds"
            width={300}
        />,
        <img
            src="https://img.youtube.com/vi/QkTnsXUedsw/hqdefault.jpg"
            alt="fds"
            width={300}
        />,
        <img
            src="https://img.youtube.com/vi/QkTnsXUedsw/hqdefault.jpg"
            alt="fds"
            width={300}
        />,
        // <iframe
        //     title="title"
        //     width="300"
        //     src="https://www.youtube.com/embed/QkTnsXUedsw"
        //     allowFullScreen
        // />,
    ]
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
