import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MyRecommendWrapper, RecommendItemType } from './MyRecommend'
import RecommendItem from './RecommendItem'

function MyComment() {
    const [comment, setComment] = useState([])
    useEffect(() => {
        axios
            .get('http://localhost/mypage/comment-list', {
                withCredentials: true,
            })
            .then((response) => {
                setComment(response.data)
            })
    }, [])
    return (
        comment && (
            <MyRecommendWrapper>
                {comment.map((el: RecommendItemType) => {
                    return <RecommendItem key={el.contentDetail.id} item={el} />
                })}
            </MyRecommendWrapper>
        )
    )
}
export default MyComment
