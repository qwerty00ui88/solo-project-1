import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import RecommendItem from './RecommendItem'
import { getData } from '../../api/server'

export const MyRecommendWrapper = styled.ul`
    width: 100%;
`

const RecommendItemLi = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-color: gray; */
`

export default function MyRecommend() {
    const { data: recommendList } = useQuery({
        queryKey: ['myRecommend'],
        queryFn: () => getData('/mypage/recommend-list'),
    })

    return (
        recommendList && (
            <MyRecommendWrapper>
                {recommendList.map((el) => {
                    return (
                        <RecommendItemLi key={el.contentEntity.tmdbId}>
                            <RecommendItem item={el} />
                        </RecommendItemLi>
                    )
                })}
            </MyRecommendWrapper>
        )
    )
}
