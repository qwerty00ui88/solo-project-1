import React from 'react'
import { styled } from 'styled-components'
import {
    largeSize,
    mediumWeight,
    semiboldWeight,
    titleMobile,
    titleTablet,
    titleWeb,
} from '../style/font'
import ContentCard from './ContentCard'

const TrendingWrapper = styled.div`
    display: flex;
    column-gap: 2vw;
    height: 100%;
    padding: 4.8vw 6vw;
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.534);
    box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 0.36);

    & > * {
        border: 1px solid rgba(255, 255, 255, 0.534);
    }

    @media screen and (max-width: 768px) {
        display: block;
    }
`

const TrendingLeft = styled.div``

const TrendingRight = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-between;
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

const Select = styled.select`
    margin-bottom: auto;
    width: 7rem;
    padding: 3px 0 3px 3px;
    font-weight: ${mediumWeight};
    color: black;
    margin-bottom: 2rem;
`

const TabList = styled.ul`
    & > li {
        padding: 0.8rem;
        margin: 0.6rem 0;
        border-radius: 10px;
        font-size: ${largeSize};
        font-weight: ${semiboldWeight};
        &:hover {
            background-color: #282828;
        }
    }
    @media screen and (max-width: 768px) {
        display: none;
    }
`

function Trending() {
    return (
        <TrendingWrapper>
            <TrendingLeft>
                <Title>트렌딩</Title>
                <Detail>최신 트렌드를 만나보세요.</Detail>
                <Select name="trending">
                    <option>오늘</option>
                    <option>이번 주</option>
                </Select>
                <TabList>
                    <li>영화</li>
                    <li>TV</li>
                    <li>인물</li>
                </TabList>
            </TrendingLeft>
            <TrendingRight>
                <ContentCard />
                <ContentCard />
                <ContentCard />
            </TrendingRight>
        </TrendingWrapper>
    )
}
export default Trending
