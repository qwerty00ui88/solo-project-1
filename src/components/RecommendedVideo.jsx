import React from 'react'
import { styled } from 'styled-components'
import { titleWeb, mediumWeight, titleTablet, titleMobile } from '../style/font'
import { xlargeRadius } from '../style/border'

const RecommendedVideoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: ${xlargeRadius};
    padding: 4.8vw 6vw;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.534);
    box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 0.36);
`

const Title = styled.h2`
    font-size: ${titleWeb};
    font-weight: ${mediumWeight};
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
    left: -6vw;
    width: calc(320px * 14);
    animation: autoPlay 30s linear infinite;

    @keyframes autoPlay {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(calc(-320px * 7));
        }
    }

    & > li {
        display: flex;
        align-items: center;
        width: 300px;
        height: calc(300px / 16 * 9);
        border-radius: ${xlargeRadius};
        margin: 0 10px;
        font-size: ${titleWeb};
        overflow: hidden;
    }
`

function RecommendedVideo({ videoData }) {
    return (
        <RecommendedVideoWrapper>
            <Title>추천 영상</Title>
            <Detail>관심 있는 영상을 시청해 보세요.</Detail>
            <VideoList>
                {videoData.concat(videoData).map((el, idx) => {
                    return (
                        <li key={el + String(idx)}>
                            <a
                                href={`https://www.youtube.com/watch?v=${el}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src={`https://img.youtube.com/vi/${el}/hqdefault.jpg`}
                                    alt="fds"
                                    width={300}
                                />
                            </a>
                        </li>
                    )
                })}
            </VideoList>
        </RecommendedVideoWrapper>
    )
}

export default RecommendedVideo
