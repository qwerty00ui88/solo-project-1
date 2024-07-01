import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import Outline from '../components/detail/Outline'
import CommentModal from '../components/detail/CommentModal'
import { getData } from '../api/server'
import Cast from '../components/detail/Cast'
import { useAuthContext } from '../context/AuthContext'
import useCommentList from '../hooks/useCommentList'
import Comment from '../components/detail/Comment'
import useBoolean from '../hooks/useBoolean'
import useRecommend from '../hooks/useRecommend'

const DetailWrapper = styled.main`
    display: flex;
    flex-direction: column;
    row-gap: 3rem;
`

export default function Detail() {
    const { mediaType, tmdbId } = useParams()
    const { userId } = useAuthContext()
    const { data: responseData } = useQuery({
        queryKey: ['detail', mediaType, tmdbId, userId],
        queryFn: () => getData(`/detail/${mediaType}/${tmdbId}`),
    })
    const { boolean: isOpen, setTrue: open, setFalse: close } = useBoolean()
    const {
        state: commentList,
        initializeCommentList,
        handleCreate,
        handleUpdate,
        handleDelete,
        commentRecommendUpdate,
    } = useCommentList({ mediaType, tmdbId })
    const { recommend, initializeUserRecommend, updateRecommend } =
        useRecommend({
            mediaType,
            tmdbId,
        })
    const [userComment, setUserComment] = useState()

    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })

    useEffect(() => {
        if (responseData) {
            initializeCommentList(responseData.commentViewList)
            initializeUserRecommend(responseData.recommendStatus)
            setUserComment(responseData.myComment)
        }
    }, [responseData])

    return (
        responseData && (
            <>
                <DetailWrapper>
                    <Outline
                        data={responseData.contentDetail}
                        recommendStatus={recommend}
                        favorite={responseData.favorite}
                        userComment={userComment}
                        open={open}
                        updateRecommend={updateRecommend}
                        commentRecommendUpdate={commentRecommendUpdate}
                    />
                    <Cast credits={responseData.contentDetail.credits} />
                    <Comment commentList={commentList} />
                </DetailWrapper>
                {isOpen && (
                    <CommentModal
                        handleClose={close}
                        userComment={userComment}
                        setUserComment={setUserComment}
                        handleCreate={handleCreate}
                        handleUpdate={handleUpdate}
                        handleDelete={handleDelete}
                        recommend={recommend}
                    />
                )}
            </>
        )
    )
}
