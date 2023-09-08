import React, { ChangeEvent, useState } from 'react'
import { styled } from 'styled-components'
import {
    largeSize,
    mediumWeight,
    semiboldWeight,
    titleMobile,
    titleTablet,
    titleWeb,
} from '../style/font'
import useGet from '../utils/useGet'
import { Data } from './Slide'
import Rank from './Rank'

const TrendingWrapper = styled.div`
    display: flex;
    column-gap: 2vw;
    height: 100%;
    padding: 4.8vw 6vw;
    border-radius: 1.8rem;
    border: 1px solid rgba(255, 255, 255, 0.534);
    box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 0.36);

    @media screen and (max-width: 1024px) {
        display: block;
    }
`

const TrendingLeft = styled.div``

const TrendingRight = styled.div`
    flex: 1;
    display: flex;
    & > div {
        width: 100%;
    }
    @media screen and (max-width: 1024px) {
        display: block;
    }
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
    border-radius: 0.5rem;
`

const CategoryGroup = styled.fieldset`
    display: flex;
    flex-direction: column;
    height: fit-content;
    border: none;
    margin-bottom: 1rem;
    @media screen and (max-width: 1024px) {
        flex-direction: row;
    }
`

interface LabelProps {
    $isChecked: boolean
}

const Label = styled.label<LabelProps>`
    display: block;
    padding: 0.8rem;
    min-width: 60px;
    border-radius: 0.7rem;
    font-size: ${largeSize};
    font-weight: ${semiboldWeight};
    background-color: ${(props) => (props.$isChecked ? '#282828' : null)};
    &:hover {
        background-color: #282828;
    }
    @media screen and (max-width: 1024px) {
        text-align: center;
    }
`

function Trending() {
    const [duration, setDuration] = useState('day')
    const [category, setCategory] = useState('movie')
    const data: Data[] = useGet(
        'results',
        `https://api.themoviedb.org/3/trending/${category}/${duration}`,
        {
            language: 'ko-KR',
        }
    )

    const categoryArr = [
        { id: 'movie', name: '영화' },
        { id: 'tv', name: 'TV' },
        { id: 'person', name: '인물' },
    ]

    const dataArr = [
        { id: 0, data: data.slice(0, 5) },
        { id: 1, data: data.slice(5, 10) },
    ]

    const changeDuration = (e: ChangeEvent<HTMLSelectElement>) => {
        setDuration(e.currentTarget.value)
    }

    const changeCategory = (e: ChangeEvent<HTMLInputElement>) => {
        setCategory(e.currentTarget.value)
    }

    return (
        <TrendingWrapper>
            <TrendingLeft>
                <Title>트렌딩</Title>
                <Detail>최신 트렌드를 만나보세요.</Detail>
                <Select name="trending" onChange={changeDuration}>
                    <option value="day">오늘</option>
                    <option value="week">이번 주</option>
                </Select>
                <CategoryGroup>
                    {categoryArr.map((el) => {
                        return (
                            <div key={el.id}>
                                <input
                                    type="radio"
                                    id={el.id}
                                    name="category"
                                    value={el.id}
                                    onChange={changeCategory}
                                />
                                <Label
                                    $isChecked={category === el.id}
                                    htmlFor={el.id}
                                >
                                    {el.name}
                                </Label>
                            </div>
                        )
                    })}
                </CategoryGroup>
            </TrendingLeft>
            <TrendingRight>
                {dataArr.map((el, i) => {
                    return (
                        <Rank
                            key={el.id}
                            category={category}
                            rankingArr={el.data}
                            start={i === 0 ? 1 : 6}
                        />
                    )
                })}
            </TrendingRight>
        </TrendingWrapper>
    )
}
export default Trending
