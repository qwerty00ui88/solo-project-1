import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import Outline from '../components/detail/Outline'
import { xlargeSize } from '../style/font'
import Comment from '../components/detail/Comment'
import CommentModal from '../components/commons/CommentModal'
import { getData } from '../api/server'
import Cast from '../components/detail/Cast'
import { useAuthContext } from '../context/AuthContext'

const DetailWrapper = styled.main`
    display: flex;
    flex-direction: column;
    row-gap: 3rem;
`

const SubTitle = styled.h3`
    font-size: ${xlargeSize};
`
const CommentUl = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

export default function Detail() {
    const { mediaType, tmdbId } = useParams()
    const { userId } = useAuthContext()
    const { data: responseData } = useQuery({
        queryKey: ['detail', mediaType, tmdbId, userId],
        queryFn: () => getData(`/detail/${mediaType}/${tmdbId}`),
    })
    const [isClick, setIsClick] = useState(false)

    const handleIsClick = () => {
        setIsClick(!isClick)
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })

    return (
        responseData && (
            <>
                <DetailWrapper>
                    <Outline
                        data={responseData.contentDetail}
                        recommendStatus={responseData.recommendStatus}
                        favorite={responseData.favorite}
                        myComment={responseData.myComment}
                        handleIsClick={handleIsClick}
                    />
                    <Cast credits={responseData.contentDetail.credits} />
                    <section>
                        <SubTitle>코멘트</SubTitle>
                        <CommentUl>
                            {responseData?.commentViewList?.map((el) => {
                                return (
                                    <Comment
                                        key={el.comment.id}
                                        id={el.userId}
                                        nickname={el.nickname}
                                        commentText={el.comment.text}
                                        recommendStatus={el.recommendStatus}
                                    />
                                )
                            })}
                        </CommentUl>
                    </section>
                </DetailWrapper>
                {isClick && (
                    <CommentModal
                        handleClose={handleIsClick}
                        mediaType={mediaType}
                        tmdbId={tmdbId}
                        myComment={responseData.myComment}
                    />
                )}
            </>
        )
    )
}
