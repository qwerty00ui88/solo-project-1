import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import useGet, { MovieDetail, PersonDetail, TVDetail } from '../utils/useGet'
import Outline from '../components/Outline'
import Cast from '../components/Cast'
import PersonOutline from '../components/PersonOutline'
import Credits from '../components/Credits'
import Biography from '../components/Biography'
import NumberOfWorks from '../components/NumberOfWorks'
import { xlargeSize } from '../style/font'
import Button from '../components/commons/Button'
import Comment from '../components/Comment'
import { ReactComponent as Good } from '../assets/good.svg'
import { ReactComponent as Bad } from '../assets/bad.svg'
import { ReactComponent as NotRated } from '../assets/comment.svg'

interface CommentType {
    userId: number
    nickname: string
    comment: {
        contentId: number
        createdAt: string
        id: number
        text: string
        updatedAt: string
        userId: number
    }
}

const DetailWrapper = styled.main`
    display: flex;
    flex-direction: column;
    row-gap: 3rem;
`

const CreditsList = styled.ul``

const SubTitle = styled.h3`
    font-size: ${xlargeSize};
`

const CommentSection = styled.section``

const CommentTextarea = styled.div`
    display: flex;
    flex-direction: column;

    > textarea {
        color: black;
    }
`

const CommentButton = styled.div`
    display: flex;
    justify-content: end;
`

const GoodBadComment = styled.div`
    display: flex;
    justify-content: space-between;
    > div {
        width: 48.5%;
    }
`

export interface ResponseDataType {
    recommendStatus: null | 'good' | 'bad'
    isFavorite: boolean
    goodCommentViewList: []
    badCommentViewList: []
    unratedCommentViewList: []
}

function Detail() {
    const [comment, setComment] = useState('')
    const [responseData, setResponseData] = useState<null | ResponseDataType>(
        null
    )
    const { media, id } = useParams() as { media: string; id: string }
    const { data } = useGet<MovieDetail | TVDetail | PersonDetail>(
        `https://api.themoviedb.org/3/${media}/${id}`,
        {
            append_to_response:
                media === 'person' ? 'combined_credits' : 'credits',
            language: 'us-EN',
        }
    )

    const creditListEl = (data as PersonDetail)?.combined_credits?.cast
        .slice()
        .sort((a, b) => {
            const dateB = (b.release_date || b.first_air_date) as string
            const dateA = (a.release_date || a.first_air_date) as string

            if (!dateA && dateB) return -1
            if (dateA && !dateB) return 1
            if (!dateA && !dateB) return -1

            return new Date(dateB).getTime() - new Date(dateA).getTime()
        })

    const NumberOfWorksData = {
        movie: (data as PersonDetail)?.combined_credits?.cast.filter((el) => {
            return el.media_type === 'movie'
        }).length,
        tv: (data as PersonDetail)?.combined_credits?.cast.filter((el) => {
            return el.media_type === 'tv'
        }).length,
    }

    const handlePostRequest = async (url: string, postData: unknown) => {
        axios
            .post(url, postData, { withCredentials: true })
            .then((response) => {
                if (response.data.code === 200) {
                    window.location.reload()
                    // eslint-disable-next-line no-console
                    console.log('댓글 생성 성공!')
                } else {
                    // eslint-disable-next-line no-console
                    console.log(response.data.error_message)
                }
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error)
            })
    }

    const handlePutRequest = async (url: string, putData: unknown) => {
        axios
            .put(url, putData, { withCredentials: true })
            .then((response) => {
                if (response.data.code === 200) {
                    window.location.reload()
                    // eslint-disable-next-line no-console
                    console.log('댓글 수정 성공!')
                } else {
                    // eslint-disable-next-line no-console
                    console.log(response.data.error_message)
                }
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error)
            })
    }

    const handleDeleteRequest = async (url: string, deleteData: unknown) => {
        axios
            .delete(url, {
                data: deleteData,
                withCredentials: true,
            })
            .then((response) => {
                if (response.data.code === 200) {
                    window.location.reload()
                    // eslint-disable-next-line no-console
                    console.log('댓글 삭제 성공!')
                }
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error)
            })
    }

    // window.scrollTo({
    //     top: 0,
    //     behavior: 'smooth',
    // })

    useEffect(() => {
        axios
            .get('http://localhost/detail', {
                params: {
                    mediaType: media,
                    tmdbId: Number(id),
                },
                withCredentials: true,
            })
            .then((response) => {
                // eslint-disable-next-line no-console
                console.log(response.data, '댓글 조회 성공!')
                setResponseData(response.data)
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error)
            })
    }, [])

    return (
        data &&
        responseData && (
            <DetailWrapper>
                {media === 'person' ? (
                    <>
                        <PersonOutline data={data as PersonDetail} />
                        <Biography data={(data as PersonDetail).biography} />
                        <div>
                            <SubTitle>출연</SubTitle>
                            <NumberOfWorks data={NumberOfWorksData} />
                            <CreditsList>
                                {creditListEl?.map((el) => {
                                    return (
                                        <Credits
                                            key={`${el.id}${Math.random()}`}
                                            data={el}
                                        />
                                    )
                                })}
                            </CreditsList>
                        </div>
                    </>
                ) : (
                    <>
                        <Outline
                            media={media}
                            data={data as MovieDetail | TVDetail}
                            recommendStatus={responseData.recommendStatus}
                            isFavorite={responseData.isFavorite}
                        />
                        <Cast
                            credits={(data as MovieDetail | TVDetail).credits}
                        />
                    </>
                )}
                <CommentSection>
                    <SubTitle>코멘트</SubTitle>

                    {/* 코멘트 작성/수정/삭제 */}
                    <CommentTextarea>
                        <textarea
                            value={comment}
                            onChange={(e) => {
                                setComment(e.target.value)
                            }}
                        />
                        <CommentButton>
                            <div>
                                <Button
                                    name="저장"
                                    onClick={() => {
                                        handlePostRequest(
                                            'http://localhost/comment/create',
                                            {
                                                mediaType: media,
                                                tmdbId: Number(id),
                                                text: comment,
                                            }
                                        )
                                    }}
                                />
                            </div>
                            <div>
                                <Button
                                    name="수정"
                                    onClick={() => {
                                        handlePutRequest(
                                            'http://localhost/comment/update',
                                            {
                                                commentId: 6,
                                                text: comment,
                                            }
                                        )
                                    }}
                                />
                                <Button
                                    name="삭제"
                                    onClick={() => {
                                        handleDeleteRequest(
                                            'http://localhost/comment/delete',
                                            {
                                                commentId: 6,
                                            }
                                        )
                                    }}
                                />
                            </div>
                        </CommentButton>
                    </CommentTextarea>

                    {/* 추천/비추천 리뷰 */}
                    <GoodBadComment>
                        <div>
                            <Good fill="#019e74" />
                            {responseData?.goodCommentViewList?.map(
                                (el: CommentType) => {
                                    return (
                                        <li key={el.comment.id}>
                                            <Comment
                                                id={el.userId}
                                                nickname={el.nickname}
                                                commentText={el.comment.text}
                                            />
                                        </li>
                                    )
                                }
                            )}
                        </div>
                        <div>
                            <Bad fill="rgb(229, 9, 20)" />
                            {responseData?.badCommentViewList?.map(
                                (el: CommentType) => {
                                    return (
                                        <li key={el.comment.id}>
                                            <Comment
                                                id={el.userId}
                                                nickname={el.nickname}
                                                commentText={el.comment.text}
                                            />
                                        </li>
                                    )
                                }
                            )}
                        </div>
                    </GoodBadComment>

                    {/* 미평가 리뷰 */}
                    <div>
                        <NotRated />
                        {responseData?.unratedCommentViewList?.map(
                            (el: CommentType) => {
                                return (
                                    <li key={el.comment.id}>
                                        <Comment
                                            id={el.userId}
                                            nickname={el.nickname}
                                            commentText={el.comment.text}
                                        />
                                    </li>
                                )
                            }
                        )}
                    </div>
                </CommentSection>
            </DetailWrapper>
        )
    )
}

export default Detail
