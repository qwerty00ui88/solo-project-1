import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import Outline from '../components/detail/Outline'
import { xlargeSize } from '../style/font'
import Comment from '../components/detail/Comment'
import { ReactComponent as Good } from '../assets/good.svg'
import { ReactComponent as Bad } from '../assets/bad.svg'
import { ReactComponent as NotRated } from '../assets/comment.svg'
import CommentModal from '../components/commons/CommentModal'
import { getData } from '../api/server'
import Cast from '../components/detail/Cast'

const DetailWrapper = styled.main`
    display: flex;
    flex-direction: column;
    row-gap: 3rem;
`

const SubTitle = styled.h3`
    font-size: ${xlargeSize};
`

const CommentSection = styled.section``

const GoodBadComment = styled.div`
    display: flex;
    justify-content: space-between;
    > div {
        width: 48.5%;
    }
`

export default function Detail() {
    const { mediaType, tmdbId } = useParams()
    const { userId } = useSelector((state) => state.user)
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
                    <CommentSection>
                        <SubTitle>코멘트</SubTitle>

                        {/* 추천/비추천 리뷰 */}
                        <GoodBadComment>
                            <div>
                                <Good fill="#019e74" />
                                {responseData?.goodCommentViewList?.map(
                                    (el) => {
                                        return (
                                            <li key={el.comment.id}>
                                                <Comment
                                                    id={el.userId}
                                                    nickname={el.nickname}
                                                    commentText={
                                                        el.comment.text
                                                    }
                                                />
                                            </li>
                                        )
                                    }
                                )}
                            </div>
                            <div>
                                <Bad fill="rgb(229, 9, 20)" />
                                {responseData?.badCommentViewList?.map((el) => {
                                    return (
                                        <li key={el.comment.id}>
                                            <Comment
                                                id={el.userId}
                                                nickname={el.nickname}
                                                commentText={el.comment.text}
                                            />
                                        </li>
                                    )
                                })}
                            </div>
                        </GoodBadComment>

                        {/* 미평가 리뷰 */}
                        <div>
                            <NotRated />
                            {responseData?.unratedCommentViewList?.map((el) => {
                                return (
                                    <li key={el.comment.id}>
                                        <Comment
                                            id={el.userId}
                                            nickname={el.nickname}
                                            commentText={el.comment.text}
                                        />
                                    </li>
                                )
                            })}
                        </div>
                    </CommentSection>
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
