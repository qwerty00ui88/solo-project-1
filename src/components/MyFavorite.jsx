import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Button from './commons/Button'
import Poster from './commons/Poster'
import { xsmallRadius } from '../style/border'
import { semiboldWeight } from '../style/font'
import { deleteData, getData } from '../api/server'

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
    const { data } = useQuery({
        queryKey: ['myFavorite'],
        queryFn: () => getData('/mypage/favorite-list'),
    })

    const handleOnClick = (mediaType, tmdbId) => {
        deleteData('/favorite/delete', {
            data: {
                mediaType,
                tmdbId,
            },
        })
        window.location.reload()
    }

    return (
        data && (
            <MyFavoriteWrapper>
                {data.map((el) => {
                    return (
                        <MyFavoriteLi key={el.tmdbId}>
                            {el.mediaType ? (
                                <>
                                    <div>
                                        <Poster data={el} />
                                        <Title>{el.contentTitle}</Title>
                                    </div>
                                    <Button
                                        name="삭제"
                                        onClick={() =>
                                            handleOnClick(
                                                el.mediaType,
                                                el.tmdbId
                                            )
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <Poster data={el} />
                                    <AddFavorite to="/">
                                        <span>추가</span>
                                    </AddFavorite>
                                </>
                            )}
                        </MyFavoriteLi>
                    )
                })}
            </MyFavoriteWrapper>
        )
    )
}
