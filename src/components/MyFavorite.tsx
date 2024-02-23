import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from './commons/Button'
import Poster from './commons/Poster'
import { xsmallRadius } from '../style/border'
import { semiboldWeight } from '../style/font'

export interface ContentType {
    id: number
    mediaType: string
    poster_path: string
    backdrop_path?: string
    popularity?: number
    vote_average?: number
    vote_count?: number
}

export interface MovieType extends ContentType {
    title: string
    original_title: string
    release_date?: string
}

export interface TVType extends ContentType {
    name: string
    original_name: string
    first_air_date?: string
}

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

interface FavoriteType {
    id: number | null
    mediaType: string | null
    poster_path: string | null
    contentTitle: string | null
}

function MyFavorite() {
    const [data, setData] = useState<FavoriteType[]>([])

    useEffect(() => {
        axios
            .get('http://localhost/mypage/favorite-list', {
                withCredentials: true,
            })
            .then((response) => {
                const template = [
                    {
                        id: null,
                        mediaType: null,
                        poster_path: null,
                        contentTitle: null,
                    },
                    {
                        id: null,
                        mediaType: null,
                        poster_path: null,
                        contentTitle: null,
                    },
                    {
                        id: null,
                        mediaType: null,
                        poster_path: null,
                        contentTitle: null,
                    },
                ]
                const favoriteList = template.map((el, idx: number) => {
                    const responseData = response.data[idx]
                    return responseData
                        ? {
                              id: responseData.id,
                              mediaType: responseData.mediaType,
                              poster_path: responseData.poster_path,
                              contentTitle:
                                  responseData.title || responseData.name,
                          }
                        : el
                })
                setData(favoriteList)
            })
    }, [])
    return (
        data && (
            <MyFavoriteWrapper>
                {data.map((el: FavoriteType) => {
                    return (
                        <MyFavoriteLi key={el.id}>
                            {el.mediaType ? (
                                <div>
                                    <Poster
                                        mediaType={el.mediaType}
                                        id={el.id}
                                        posterPath={el.poster_path}
                                    />
                                    <Title>{el.contentTitle}</Title>
                                </div>
                            ) : (
                                <Poster
                                    mediaType={null}
                                    id={null}
                                    posterPath={null}
                                />
                            )}

                            {el.mediaType ? (
                                <Button
                                    name="삭제"
                                    onClick={() => {
                                        axios.delete(
                                            'http://localhost/favorite/delete',
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
export default MyFavorite
