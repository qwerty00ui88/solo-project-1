import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Button from '../commons/Button'
import Poster from '../commons/Poster'
import { xlargeRadius, xsmallRadius } from '../../style/border'
import { semiboldWeight } from '../../style/font'
import { deleteData, getData } from '../../api/server'
import { useAuthContext } from '../../context/AuthContext'

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
    const { userId } = useAuthContext()
    const { data } = useQuery({
        queryKey: ['myFavorite', userId],
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
                                    <Poster
                                        data={el}
                                        width="100%"
                                        borderRadius={xlargeRadius}
                                    />
                                    <Title>{el.contentTitle}</Title>
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
                                    <Poster
                                        data={el}
                                        width="100%"
                                        borderRadius={xlargeRadius}
                                    />
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
