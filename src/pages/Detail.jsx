import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Outline from '../components/detail/Outline'
import CommentModal from '../components/detail/CommentModal'
import Cast from '../components/detail/Cast'
import Comment from '../components/detail/Comment'
import useBoolean from '../hooks/useBoolean'
import useDetail from '../hooks/useDetail'

const DetailWrapper = styled.main`
    display: flex;
    flex-direction: column;
    row-gap: 3rem;
`

export default function Detail() {
    const { mediaType, tmdbId } = useParams()
    const { boolean: isOpen, setTrue: open, setFalse: close } = useBoolean()
    const {
        detailQuery: { data: responseData },
        addComment,
        updateComment,
        deleteComment,
        updateRecommend,
        updateFavorite,
    } = useDetail({ mediaType, tmdbId })

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }, [])

    return (
        responseData && (
            <>
                <DetailWrapper>
                    <Outline
                        data={responseData}
                        updateRecommend={updateRecommend}
                        updateFavorite={updateFavorite}
                        handleOpen={open}
                    />
                    <Cast credits={responseData.contentDetail.credits} />
                    <Comment commentList={responseData.commentViewList} />
                </DetailWrapper>
                {isOpen && (
                    <CommentModal
                        addComment={addComment}
                        updateComment={updateComment}
                        deleteComment={deleteComment}
                        userComment={responseData.myComment}
                        handleClose={close}
                    />
                )}
            </>
        )
    )
}
