import React, { ChangeEvent, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import {
    CategoryGroup,
    Label,
    Title,
    TrendingLeft,
    TrendingRight,
    TrendingWrapper,
} from '../components/Trending'
import MyFavorite from '../components/MyFavorite'
import MyRecommend from '../components/MyRecommend'
import MyComment from '../components/MyComment'
import MyInfo from '../components/MyInfo'

const ContentWrapper = styled.main``

export type Category = 'favoirte' | 'recommend' | 'comment' | 'info'

function Mypage() {
    const [category, setCategory] = useState<Category>('favoirte')
    const navigate = useNavigate()

    const categoryArr = [
        { id: 'favoirte', name: '인생 컨텐츠' },
        { id: 'recommend', name: '평가한 컨텐츠' },
        { id: 'comment', name: '나의 코멘트' },
        { id: 'info', name: '회원정보' },
    ]

    const changeCategory = (e: ChangeEvent<HTMLInputElement>) => {
        setCategory(e.currentTarget.value as Category)
        navigate(`/mypage/${e.currentTarget.value}`)
    }

    let children = null
    if (category === 'favoirte') {
        children = <MyFavorite />
    } else if (category === 'recommend') {
        children = <MyRecommend />
    } else if (category === 'comment') {
        children = <MyComment />
    } else if (category === 'info') {
        children = <MyInfo />
    }

    return (
        <ContentWrapper>
            <TrendingWrapper>
                <TrendingLeft>
                    <Title>마이페이지</Title>
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
                <TrendingRight>{children}</TrendingRight>
            </TrendingWrapper>
        </ContentWrapper>
    )
}

export default Mypage
