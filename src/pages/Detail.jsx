import React, { useEffect } from 'react'
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
    const {
        state: commentList,
        handleInitialize,
        handleCreate,
        handleUpdate,
        handleDelete,
    } = useCommentList(mediaType, tmdbId, userId)
    const { boolean: isOpen, setTrue: open, setFalse: close } = useBoolean()

    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })

    useEffect(() => {
        if (responseData) handleInitialize(responseData.commentViewList)
    }, [responseData])

    return (
        responseData && (
            <>
                <DetailWrapper>
                    <Outline
                        data={responseData.contentDetail}
                        recommendStatus={responseData.recommendStatus}
                        favorite={responseData.favorite}
                        myComment={responseData.myComment}
                        handleIsClick={open}
                    />
                    <Cast credits={responseData.contentDetail.credits} />
                    <Comment commentList={commentList} />
                </DetailWrapper>
                {isOpen && (
                    <CommentModal
                        handleClose={close}
                        myComment={responseData.myComment}
                        handleCreate={handleCreate}
                        handleUpdate={handleUpdate}
                        handleDelete={handleDelete}
                    />
                )}
            </>
        )
    )
}
