import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { MyRecommendWrapper } from './MyRecommend'
import RecommendItem from './RecommendItem'
import { getData } from '../api/server'

export default function MyComment() {
    const { data: commentList } = useQuery({
        queryKey: ['myComment'],
        queryFn: () => getData('/mypage/comment-list'),
    })

    return (
        commentList && (
            <MyRecommendWrapper>
                {commentList.map((el) => {
                    return <RecommendItem key={el.contentEntity.id} item={el} />
                })}
            </MyRecommendWrapper>
        )
    )
}
