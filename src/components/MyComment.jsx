import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MyRecommendWrapper } from './MyRecommend'
import RecommendItem from './RecommendItem'

export default function MyComment() {
    const serverUrl = process.env.REACT_APP_SERVER_URL
    const [comment, setComment] = useState([])
    useEffect(() => {
        axios
            .get(`${serverUrl}/mypage/comment-list`, {
                withCredentials: true,
            })
            .then((response) => {
                setComment(response.data)
            })
    }, [])
    return (
        comment && (
            <MyRecommendWrapper>
                {comment.map((el) => {
                    return <RecommendItem key={el.contentEntity.id} item={el} />
                })}
            </MyRecommendWrapper>
        )
    )
}
