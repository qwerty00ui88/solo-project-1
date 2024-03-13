import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import RecommendItem from './RecommendItem'
import { MovieType, TVType } from './MyFavorite'

export interface RecommendItemType {
    contentDetail: MovieType | TVType
    recommend: {
        contentId: number
        userId: number
        status: string
        createdAt: string
        updatedAt: string
    } | null
    comment?: {
        id: number
        contentId: number
        userId: number
        text: string
        createdAt: string
        updatedAt: string
    }
}

export const MyRecommendWrapper = styled.ul`
    width: 100%;
`

const RecommendItemLi = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-color: gray; */
`

function MyRecommend() {
    const serverUrl = process.env.REACT_APP_SERVER_URL
    const [recommend, setRecommend] = useState([])

    useEffect(() => {
        axios
            .get(`${serverUrl}/mypage/recommend-list`, {
                withCredentials: true,
            })
            .then((response) => {
                setRecommend(response.data)
            })
    }, [])
    return (
        recommend && (
            <MyRecommendWrapper>
                {recommend.map((el: RecommendItemType) => {
                    return (
                        <RecommendItemLi key={el.contentDetail.id}>
                            <RecommendItem item={el} />
                        </RecommendItemLi>
                    )
                })}
            </MyRecommendWrapper>
        )
    )
}
export default MyRecommend
