import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from './commons/Button'
import Poster from './commons/Poster'
import { xsmallRadius } from '../style/border'
import { semiboldWeight } from '../style/font'

export const MyFavoriteWrapper = styled.ul`
    display: flex;
    gap: 5%;
    justify-content: space-between;
    height: 100%;
`

export const MyFavoriteLi = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 30%;
`

const AddFavorite = styled(Link)`
    display: block;
    width: 4.5rem;
    text-align: center;
    border-radius: ${xsmallRadius};
    background-color: #019e74;
    font-weight: ${semiboldWeight};
`

const Title = styled.div`
    font-weight: ${semiboldWeight};
    text-align: center;
`

export default function MyFavorite() {
    const serverUrl = process.env.REACT_APP_SERVER_URL
    const [data, setData] = useState([])

    useEffect(() => {
        axios
            .get(`${serverUrl}/mypage/favorite-list`, {
                withCredentials: true,
            })
            .then((response) => {
                const template = [
                    {
                        tmdbId: null || 1,
                        mediaType: null,
                        poster_path: null,
                        contentTitle: null,
                    },
                    {
                        tmdbId: null || 2,
                        mediaType: null,
                        poster_path: null,
                        contentTitle: null,
                    },
                    {
                        tmdbId: null || 3,
                        mediaType: null,
                        poster_path: null,
                        contentTitle: null,
                    },
                ]
                const favoriteList = template.map((el, idx) => {
                    const responseData = response.data[idx]
                    return responseData
                        ? {
                              tmdbId: responseData.tmdbId,
                              mediaType: responseData.mediaType,
                              posterPath: responseData.posterPath,
                              contentTitle: responseData.title,
                          }
                        : el
                })
                setData(favoriteList)
            })
    }, [])
    return (
        data && (
            <MyFavoriteWrapper>
                {data.map((el) => {
                    return (
                        <MyFavoriteLi key={el.tmdbId}>
                            {el.mediaType ? (
                                <div>
                                    <Poster data={el} />
                                    <Title>{el.contentTitle}</Title>
                                </div>
                            ) : (
                                <Poster data={el} />
                            )}

                            {el.mediaType ? (
                                <Button
                                    name="삭제"
                                    onClick={() => {
                                        axios.delete(
                                            `${serverUrl}/favorite/delete`,
                                            {
                                                data: {
                                                    mediaType: el.mediaType,
                                                    tmdbId: el.id,
                                                },
                                                withCredentials: true,
                                            }
                                        )
                                    }}
                                />
                            ) : (
                                <AddFavorite to="/">
                                    <span>추가</span>
                                </AddFavorite>
                            )}
                        </MyFavoriteLi>
                    )
                })}
            </MyFavoriteWrapper>
        )
    )
}
