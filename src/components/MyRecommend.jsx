import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import RecommendItem from './RecommendItem'

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
                {recommend.map((el) => {
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
